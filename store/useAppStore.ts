import { create } from "zustand";
import { riskCriteria } from "@/lib/riskCriteria";
import { exclusionCriteria } from "@/lib/exclusionCriteria";

interface SelectedValues {
  risk: {
    [scoreName: string]: {
      [criterionId: string]: string;
    };
  };
  exclusion: {
    [criterionId: string]: string;
  };
}

interface DerivedExclusionValues {
  lowscore: string;
  highscore: string;
}

interface ScoreRange {
  min: number;
  max: number;
}

interface AppState {
  selectedValues: SelectedValues;
  currentTabs: Record<string, string>;
  isInitialized: boolean;
  setTab: (container: string, tab: string) => void;
  setSelectedValues: (
    category: "risk" | "exclusion",
    scoreName: string | null,
    criterionId: string,
    buttonId: string,
  ) => void;
  generateShareableLink: (container: string) => string;
  initializeStateFromUrl: (searchParams: URLSearchParams) => void;
  computedScores: {
    [scoreName: string]: number;
  };
  computedScoreRanges: {
    [scoreName: string]: ScoreRange;
  };
  derivedExclusionValues: DerivedExclusionValues;
  exclusionStatus: "yes" | "no" | "unknown";
  vteHistoryValue: string | null;
  acValue: string | null;
}

export const useAppStore = create<AppState>((set, get) => ({
  selectedValues: {
    risk: {},
    exclusion: {},
  },
  computedScores: {},
  computedScoreRanges: {},
  derivedExclusionValues: {
    lowscore: "unknown",
    highscore: "unknown",
  },
  exclusionStatus: "unknown",
  vteHistoryValue: null,
  acValue: null,
  currentTabs: {
    risk: "score",
  },
  isInitialized: false,

  setTab: (container, tab) =>
    set((state) => ({
      currentTabs: {
        ...state.currentTabs,
        [container]: tab,
      },
    })),

  setSelectedValues: (category, scoreName, criterionId, buttonId) =>
    set((state) => {
      const newSelectedValues: SelectedValues = {
        risk: { ...state.selectedValues.risk },
        exclusion: { ...state.selectedValues.exclusion },
      };

      if (category === "risk" && scoreName) {
        if (!newSelectedValues.risk[scoreName]) {
          newSelectedValues.risk[scoreName] = {};
        }

        newSelectedValues.risk[scoreName] = {
          ...newSelectedValues.risk[scoreName],
          [criterionId]: buttonId,
        };

        // Sync identical buttons across scores for the same criterion
        const criterion = riskCriteria.find((c) => c.id === criterionId);
        if (criterion) {
          const otherScores = Object.keys(criterion.scores).filter(
            (s) => s !== scoreName,
          );

          otherScores.forEach((otherScore) => {
            const buttonsCurrentScore = criterion.scores[scoreName].buttons;
            const buttonsOtherScore = criterion.scores[otherScore].buttons;

            const areButtonsIdentical =
              JSON.stringify(buttonsCurrentScore) ===
              JSON.stringify(buttonsOtherScore);

            if (areButtonsIdentical) {
              if (!newSelectedValues.risk[otherScore]) {
                newSelectedValues.risk[otherScore] = {};
              }

              newSelectedValues.risk[otherScore] = {
                ...newSelectedValues.risk[otherScore],
                [criterionId]: buttonId,
              };
            }
          });
        }

        const totalKhorana = computeForScore(
          newSelectedValues.risk["khorana"] || {},
          "khorana",
        );

        const totalEhrcat = computeForScore(
          newSelectedValues.risk["ehrcat"] || {},
          "ehrcat",
        );

        const khoranaRange = computeScoreRange(
          newSelectedValues.risk["khorana"] || {},
          "khorana",
        );

        const ehrcatRange = computeScoreRange(
          newSelectedValues.risk["ehrcat"] || {},
          "ehrcat",
        );

        let vteHistoryValue = state.vteHistoryValue;
        if (criterionId === "vte_history") {
          vteHistoryValue = getButtonParamValue(
            "risk",
            scoreName,
            criterionId,
            buttonId,
          );
        }

        const derivedExclusionValues = getDerivedScoreExclusions({
          khoranaRange,
          ehrcatRange,
          isNA: vteHistoryValue === "1" && state.acValue === "1",
        });

        const exclusionStatus = getExclusionStatus(
          newSelectedValues.exclusion,
          derivedExclusionValues,
        );

        return {
          selectedValues: newSelectedValues,
          computedScores: {
            ...state.computedScores,
            khorana: totalKhorana,
            ehrcat: totalEhrcat,
          },
          computedScoreRanges: {
            ...state.computedScoreRanges,
            khorana: khoranaRange,
            ehrcat: ehrcatRange,
          },
          vteHistoryValue,
          derivedExclusionValues,
          exclusionStatus,
        };
      }

      if (category === "exclusion") {
        if (criterionId !== "lowscore" && criterionId !== "highscore") {
          newSelectedValues.exclusion[criterionId] = buttonId;
        }

        let acValue = state.acValue;

        if (criterionId === "ac") {
          acValue = getButtonParamValue(
            "exclusion",
            scoreName,
            criterionId,
            buttonId,
          );
        }

        const derivedExclusionValues = getDerivedScoreExclusions({
          khoranaRange: state.computedScoreRanges["khorana"],
          ehrcatRange: state.computedScoreRanges["ehrcat"],
          isNA: state.vteHistoryValue === "1" && acValue === "1",
        });

        const exclusionStatus = getExclusionStatus(
          newSelectedValues.exclusion,
          derivedExclusionValues,
        );

        return {
          selectedValues: newSelectedValues,
          exclusionStatus,
          acValue,
          derivedExclusionValues,
        };
      }

      return { selectedValues: newSelectedValues };
    }),

  generateShareableLink: (_container: string) => {
    const { currentTabs, selectedValues } = get();
    const params = new URLSearchParams();

    Object.entries(currentTabs).forEach(([container, tab]) => {
      params.set(`${container}Tab`, tab);
    });

    // Handle Risk Criteria
    riskCriteria.forEach((criterion) => {
      Object.entries(criterion.scores).forEach(([scoreName, score]) => {
        const selectedButtonId = selectedValues.risk[scoreName]?.[criterion.id];
        if (selectedButtonId) {
          const button = score.buttons.find((b) => b.id === selectedButtonId);
          if (button && score.paramName) {
            params.set(score.paramName, button.paramValue);
          }
        }
      });
    });

    // Handle Exclusion Criteria
    exclusionCriteria.forEach((criterion) => {
      if (!criterion.paramName) return;

      const selectedButtonId = selectedValues.exclusion[criterion.id];
      if (selectedButtonId) {
        const button = criterion.buttons.find((b) => b.id === selectedButtonId);
        if (button) {
          params.set(criterion.paramName, button.paramValue);
        }
      }
    });

    return `${window.location.origin}${window.location.pathname}?${params.toString()}`;
  },

  initializeStateFromUrl: (searchParams: URLSearchParams) => {
    if (get().isInitialized) return;

    const selectedValues: SelectedValues = {
      risk: {},
      exclusion: {},
    };

    const currentTabs: Record<string, string> = {
      risk: searchParams.get("riskTab") || "score",
    };

    let vteHistoryValue: string | null = null;
    let acValue: string | null = null;

    riskCriteria.forEach((criterion) => {
      Object.entries(criterion.scores).forEach(([scoreName, score]) => {
        const paramValue = searchParams.get(score.paramName);
        let matchedButton = score.buttons.find(
          (b) => b.paramValue === paramValue,
        );

        if (!matchedButton) {
          matchedButton = score.buttons.find((b) => b.paramValue === "99");
        }

        if (matchedButton) {
          if (!selectedValues.risk[scoreName]) {
            selectedValues.risk[scoreName] = {};
          }

          selectedValues.risk[scoreName][criterion.id] = matchedButton.id;

          if (criterion.id === "vte_history") {
            vteHistoryValue = matchedButton.paramValue;
          }
        }
      });
    });

    exclusionCriteria.forEach((criterion) => {
      if (!criterion.paramName) return;

      const paramValue = searchParams.get(criterion.paramName);
      let matchedButton = criterion.buttons.find(
        (b) => b.paramValue === paramValue,
      );

      if (!matchedButton) {
        matchedButton = criterion.buttons.find((b) => b.paramValue === "99");
      }

      if (matchedButton) {
        selectedValues.exclusion[criterion.id] = matchedButton.id;

        if (criterion.id === "ac") {
          acValue = matchedButton.paramValue;
        }
      }
    });

    const computedScores: { [scoreName: string]: number } = {};
    const computedScoreRanges: { [scoreName: string]: ScoreRange } = {};

    Object.keys(selectedValues.risk).forEach((scoreName) => {
      computedScores[scoreName] = computeForScore(
        selectedValues.risk[scoreName],
        scoreName,
      );

      computedScoreRanges[scoreName] = computeScoreRange(
        selectedValues.risk[scoreName],
        scoreName,
      );
    });

    const derivedExclusionValues = getDerivedScoreExclusions({
      khoranaRange: computedScoreRanges["khorana"],
      ehrcatRange: computedScoreRanges["ehrcat"],
      isNA: vteHistoryValue === "1" && acValue === "1",
    });

    const exclusionStatus = getExclusionStatus(
      selectedValues.exclusion,
      derivedExclusionValues,
    );

    set({
      selectedValues,
      computedScores,
      computedScoreRanges,
      derivedExclusionValues,
      exclusionStatus,
      vteHistoryValue,
      acValue,
      currentTabs,
      isInitialized: true,
    });
  },
}));

const computeForScore = (
  selectedCriteria: { [criterionId: string]: string },
  scoreName: string,
): number => {
  return riskCriteria.reduce((total, criterion) => {
    const criterionScore = criterion.scores[scoreName];
    if (!criterionScore) return total;

    const selectedButtonId = selectedCriteria[criterion.id];
    const selectedButton = criterionScore.buttons.find(
      (b) => b.id === selectedButtonId,
    );

    return total + (selectedButton?.value || 0);
  }, 0);
};

const computeScoreRange = (
  selectedCriteria: { [criterionId: string]: string } | undefined,
  scoreName: string,
): ScoreRange => {
  let min = 0;
  let max = 0;

  riskCriteria.forEach((criterion) => {
    const criterionScore = criterion.scores[scoreName];
    if (!criterionScore) return;

    const selectedButtonId = selectedCriteria?.[criterion.id];
    const selectedButton = criterionScore.buttons.find(
      (b) => b.id === selectedButtonId,
    );

    const isUnknownSelection =
      !selectedButton || selectedButton.paramValue === "99";

    if (!isUnknownSelection) {
      const value = selectedButton.value || 0;
      min += value;
      max += value;
      return;
    }

    const knownButtons = criterionScore.buttons.filter(
      (b) => b.paramValue !== "99",
    );

    if (knownButtons.length === 0) {
      const fallbackValue = selectedButton?.value || 0;
      min += fallbackValue;
      max += fallbackValue;
      return;
    }

    const knownValues = knownButtons.map((b) => b.value || 0);
    min += Math.min(...knownValues);
    max += Math.max(...knownValues);
  });

  return { min, max };
};

const getDerivedScoreExclusions = ({
  khoranaRange,
  ehrcatRange,
  isNA,
}: {
  khoranaRange: ScoreRange | undefined;
  ehrcatRange: ScoreRange | undefined;
  isNA: boolean;
}): DerivedExclusionValues => {
  if (isNA || !khoranaRange || !ehrcatRange) {
    return { lowscore: "unknown", highscore: "unknown" };
  }

  const lowscore =
    khoranaRange.max < 2 && ehrcatRange.max < 2
      ? "yes"
      : khoranaRange.min >= 2 || ehrcatRange.min >= 2
        ? "no"
        : "unknown";

  const highscore =
    khoranaRange.min > 4 || ehrcatRange.min > 5
      ? "yes"
      : khoranaRange.max <= 4 && ehrcatRange.max <= 5
        ? "no"
        : "unknown";

  return { lowscore, highscore };
};

const getExclusionStatus = (
  exclusionSelections: { [criterionId: string]: string },
  derivedExclusionValues: DerivedExclusionValues,
): "yes" | "no" | "unknown" => {
  let hasUnknown = false;

  for (const criterion of exclusionCriteria) {
    if (!criterion.paramName) continue;

    const selectedButtonId = exclusionSelections[criterion.id];
    const selectedButton = criterion.buttons.find((b) => b.id === selectedButtonId);

    if (!selectedButton || selectedButton.paramValue === "99") {
      hasUnknown = true;
      continue;
    }

    if (selectedButton.paramValue === "1") {
      return "yes";
    }
  }

  if (
    derivedExclusionValues.lowscore === "yes" ||
    derivedExclusionValues.highscore === "yes"
  ) {
    return "yes";
  }

  if (
    derivedExclusionValues.lowscore === "unknown" ||
    derivedExclusionValues.highscore === "unknown"
  ) {
    hasUnknown = true;
  }

  return hasUnknown ? "unknown" : "no";
};

const getButtonParamValue = (
  category: "risk" | "exclusion",
  scoreName: string | null,
  criterionId: string,
  buttonId: string,
): string | null => {
  if (category === "risk" && scoreName) {
    const criterion = riskCriteria.find((c) => c.id === criterionId);
    const score = criterion?.scores[scoreName];
    const button = score?.buttons.find((b) => b.id === buttonId);
    return button?.paramValue || null;
  }

  if (category === "exclusion") {
    const criterion = exclusionCriteria.find((c) => c.id === criterionId);
    const button = criterion?.buttons.find((b) => b.id === buttonId);
    return button?.paramValue || null;
  }

  return null;
};
