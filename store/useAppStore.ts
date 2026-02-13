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

interface AppState {
  selectedValues: SelectedValues;
  currentContainer: string;
  currentTabs: Record<string, string>;
  isInitialized: boolean;
  setContainer: (container: string) => void;
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
  hasExclusions: boolean;
  vteHistoryValue: string | null;
  acValue: string | null;
}

export const useAppStore = create<AppState>((set, get) => ({
  selectedValues: {
    risk: {},
    exclusion: {},
  },
  computedScores: {},
  hasExclusions: false,
  vteHistoryValue: null,
  acValue: null,
  currentContainer: "risk",
  currentTabs: {
    risk: "score",
  },
  isInitialized: false,

  setContainer: (container) => set({ currentContainer: container }),

  setTab: (container, tab) =>
    set((state) => ({
      currentTabs: {
        ...state.currentTabs,
        [container]: tab,
      },
    })),

  setSelectedValues: (category, scoreName, criterionId, buttonId) =>
    set((state) => {
      const newSelectedValues = { ...state.selectedValues };

      if (category === "risk" && scoreName) {
        if (!newSelectedValues.risk[scoreName]) {
          newSelectedValues.risk[scoreName] = {};
        }
        newSelectedValues.risk[scoreName][criterionId] = buttonId;

        // Sync buttons
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
              newSelectedValues.risk[otherScore][criterionId] = buttonId;
            }
          });
        }

        const totalKhorana = computeForScore(
          newSelectedValues.risk["khorana"],
          "khorana",
        );

        const totalEhrcat = computeForScore(
          newSelectedValues.risk["ehrcat"],
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

        return {
          selectedValues: newSelectedValues,
          computedScores: {
            ...state.computedScores,
            ["khorana"]: totalKhorana,
            ["ehrcat"]: totalEhrcat,
          },
          vteHistoryValue,
        };
      } else if (category === "exclusion") {
        newSelectedValues.exclusion[criterionId] = buttonId;
        let acValue = state.acValue;

        const hasExclusions = checkForExclusions(
          newSelectedValues.exclusion,
        );

        if (criterionId === "ac") {
          acValue = getButtonParamValue(
            "exclusion",
            scoreName,
            criterionId,
            buttonId,
          );
        }

        return {
          selectedValues: newSelectedValues,
          hasExclusions,
          acValue,
        };
      }

      return { selectedValues: newSelectedValues };
    }),

  generateShareableLink: (container: string) => {
    const { currentTabs, selectedValues } = get();
    const params = new URLSearchParams();

    params.set("container", container);

    Object.entries(currentTabs).forEach(([container, tab]) => {
      params.set(`${container}Tab`, tab);
    });

    // Handle Risk Criteria
    riskCriteria.forEach((criterion) => {
      Object.entries(criterion.scores).forEach(([scoreName, score]) => {
        const selectedButtonId = selectedValues.risk[scoreName]?.[criterion.id];
        if (selectedButtonId) {
          const button = score.buttons.find((b) => b.id === selectedButtonId);
          if (button) {
            params.set(score.paramName, button.paramValue);
          }
        }
      });
    });

    // Handle Exclusion Criteria
    exclusionCriteria.forEach((criterion) => {
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

    const containerParam = searchParams.get("container");
    const currentContainer = containerParam || "risk";
    const currentTabs: Record<string, string> = {
      risk: searchParams.get("riskTab") || "score",
      exclusion: searchParams.get("exclusionTab") || "exclusion",
    };

    let vteHistoryValue = null;
    let acValue = null;

    riskCriteria.forEach((criterion) => {
      Object.entries(criterion.scores).forEach(([scoreName, score]) => {
        const paramValue = searchParams.get(score.paramName);
        let matchedButton = score.buttons.find(
          (b) => b.paramValue === paramValue,
        );

        if (!matchedButton) {
          matchedButton = score.buttons.find((b) => b.paramValue === "9");
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
      const paramValue = searchParams.get(criterion.paramName);
      let matchedButton = criterion.buttons.find(
        (b) => b.paramValue === paramValue,
      );

      if (!matchedButton) {
        matchedButton = criterion.buttons.find((b) => b.paramValue === "9");
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

    const hasExclusions = checkForExclusions(
      selectedValues.exclusion,
    );

    set({
      selectedValues,
      computedScores,
      hasExclusions,
      vteHistoryValue,
      acValue,
      currentContainer,
      currentTabs,
      isInitialized: true,
    });

    set({
      selectedValues,
      currentContainer,
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

const checkForExclusions = (exclusionSelections: {
  [criterionId: string]: string;
}): boolean => {
  for (const criterionId in exclusionSelections) {
    const selectedButtonId = exclusionSelections[criterionId];
    const criterion = exclusionCriteria.find((c) => c.id === criterionId);
    const selectedButton = criterion?.buttons.find(
      (b) => b.id === selectedButtonId,
    );
    if (selectedButton?.paramValue === "1") {
      return true;
    }
  }
  return false;
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
  } else if (category === "exclusion") {
    const criterion = exclusionCriteria.find((c) => c.id === criterionId);
    const button = criterion?.buttons.find((b) => b.id === buttonId);
    return button?.paramValue || null;
  }

  return null;
};
