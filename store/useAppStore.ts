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

        let vteHistoryValue = state.vteHistoryValue;
        if (criterionId === "vte_history") {
          vteHistoryValue = getButtonParamValue(
            "risk",
            scoreName,
            criterionId,
            buttonId,
          );
        }

        const khoranaUnknown = isScoreUnknown(
          newSelectedValues.risk["khorana"],
          "khorana",
        );

        const ehrcatUnknown = isScoreUnknown(
          newSelectedValues.risk["ehrcat"],
          "ehrcat",
        );

        const derivedExclusionValues = getDerivedScoreExclusions({
          khorana: totalKhorana,
          ehrcat: totalEhrcat,
          khoranaUnknown,
          ehrcatUnknown,
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
          khorana: state.computedScores["khorana"],
          ehrcat: state.computedScores["ehrcat"],
          khoranaUnknown: isScoreUnknown(state.selectedValues.risk["khorana"], "khorana"),
          ehrcatUnknown: isScoreUnknown(state.selectedValues.risk["ehrcat"], "ehrcat"),
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
    Object.keys(selectedValues.risk).forEach((scoreName) => {
      computedScores[scoreName] = computeForScore(
        selectedValues.risk[scoreName],
        scoreName,
      );
    });

    const derivedExclusionValues = getDerivedScoreExclusions({
      khorana: computedScores["khorana"],
      ehrcat: computedScores["ehrcat"],
      khoranaUnknown: isScoreUnknown(selectedValues.risk["khorana"], "khorana"),
      ehrcatUnknown: isScoreUnknown(selectedValues.risk["ehrcat"], "ehrcat"),
      isNA: vteHistoryValue === "1" && acValue === "1",
    });

    const exclusionStatus = getExclusionStatus(
      selectedValues.exclusion,
      derivedExclusionValues,
    );

    set({
      selectedValues,
      computedScores,
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
  const rawScore = riskCriteria.reduce((total, criterion) => {
    const criterionScore = criterion.scores[scoreName];
    if (criterionScore) {
      const selectedButtonId = selectedCriteria[criterion.id];
      const selectedButton = criterionScore.buttons.find(
        (b) => b.id === selectedButtonId,
      );
      return total + (selectedButton?.value || 0);
    }
    return total;
  }, 0);

  return rawScore;
};

const getDerivedScoreExclusions = ({
  khorana,
  ehrcat,
  khoranaUnknown,
  ehrcatUnknown,
  isNA,
}: {
  khorana: number | undefined;
  ehrcat: number | undefined;
  khoranaUnknown: boolean;
  ehrcatUnknown: boolean;
  isNA: boolean;
}): DerivedExclusionValues => {
  if (isNA || khoranaUnknown || ehrcatUnknown) {
    return { lowscore: "unknown", highscore: "unknown" };
  }

  if (typeof khorana !== "number" || typeof ehrcat !== "number") {
    return { lowscore: "unknown", highscore: "unknown" };
  }

  return {
    lowscore: khorana < 2 && ehrcat < 2 ? "yes" : "no",
    highscore: khorana > 4 || ehrcat > 5 ? "yes" : "no",
  };
};

const isScoreUnknown = (
  selectedCriteria: { [criterionId: string]: string } | undefined,
  scoreName: string,
): boolean => {
  if (!selectedCriteria) return true;

  return riskCriteria.some((criterion) => {
    const criterionScore = criterion.scores[scoreName];
    if (!criterionScore) return false;

    const selectedButtonId = selectedCriteria[criterion.id];
    if (!selectedButtonId) return true;

    const selectedButton = criterionScore.buttons.find(
      (b) => b.id === selectedButtonId,
    );

    return selectedButton?.paramValue === "99";
  });
};

const getExclusionStatus = (
  exclusionSelections: { [criterionId: string]: string },
  derivedExclusionValues: DerivedExclusionValues,
): "yes" | "no" | "unknown" => {
  let hasUnknown = false;

  for (const criterion of exclusionCriteria) {
    if (!criterion.paramName) continue; // skip derived rows here

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
