export interface Button {
  id: string;
  name: string;
  value?: number;
  color: string;
  paramValue: string;
}

export interface Score {
  paramName: string;
  buttonsOrientation: "horizontal" | "vertical";
  buttons: Button[];
}

export interface Criterion {
  id: string;
  name: string;
  scores: {
    [scoreName: string]: Score;
  };
}

export const riskCriteria: Criterion[] = [
  {
    id: "cancer_site",
    name: "Cancer site/histology",
    scores: {
      khorana: {
        paramName: "r1",
        buttonsOrientation: "vertical",
        buttons: [
          {
            id: "unknown",
            name: "Unknown",
            value: 0,
            color: "gray-500",
            paramValue: "9",
          },
          {
            id: "zero",
            name: "Other",
            value: 0,
            color: "blue-500",
            paramValue: "0",
          },
          {
            id: "one",
            name: "Lung, kidney, bladder, testicular, ovarian, uterine, aggresive lymphoma, cervical",
            value: 1,
            color: "red-900",
            paramValue: "1",
          },
          {
            id: "two",
            name: "Pancreas, stomach",
            value: 2,
            color: "red-500",
            paramValue: "2",
          },
        ],
      },
      ehrcat: {
        paramName: "r2",
        buttonsOrientation: "vertical",
        buttons: [
          {
            id: "unknown",
            name: "Unknown",
            value: 0,
            color: "gray-500",
            paramValue: "9",
          },
          {
            id: "zero",
            name: "Other",
            value: 0,
            color: "blue-500",
            paramValue: "0",
          },
          {
            id: "one",
            name: "Colorectal",
            value: 1,
            color: "red-900",
            paramValue: "1",
          },
          {
            id: "two",
            name: "Lung, kidney, bladder, testicular, ovarian, uterine, aggresive lymphoma, sarcoma, brain, myeloma, acute lymphocytic leukemia",
            value: 2,
            color: "red-700",
            paramValue: "2",
          },
          {
            id: "three",
            name: "Pancreas, stomach, esophageal, biliary, gallbladder",
            value: 3,
            color: "red-500",
            paramValue: "3",
          },
        ],
      },
    },
  },
  {
    id: "bmi",
    name: "Pretherapy BMI ≥35 kg/m<sup>2</sup>",
    scores: {
      khorana: {
        paramName: "r3",
        buttonsOrientation: "horizontal",
        buttons: [
          {
            id: "unknown",
            name: "Unknown",
            value: 0,
            color: "gray-500",
            paramValue: "9",
          },
          {
            id: "no",
            name: "No",
            value: 0,
            color: "blue-500",
            paramValue: "0",
          },
          {
            id: "yes",
            name: "Yes",
            value: 1,
            color: "red-500",
            paramValue: "1",
          },
        ],
      },
      ehrcat: {
        paramName: "r4",
        buttonsOrientation: "horizontal",
        buttons: [
          {
            id: "unknown",
            name: "Unknown",
            value: 0,
            color: "gray-500",
            paramValue: "9",
          },
          {
            id: "no",
            name: "No",
            value: 0,
            color: "blue-500",
            paramValue: "0",
          },
          {
            id: "yes",
            name: "Yes",
            value: 1,
            color: "red-500",
            paramValue: "1",
          },
        ],
      },
    },
  },
  {
    id: "wbc",
    name: "Pretherapy WBC >11 x 10<sup>9</sup>/L",
    scores: {
      khorana: {
        paramName: "r5",
        buttonsOrientation: "horizontal",
        buttons: [
          {
            id: "unknown",
            name: "Unknown",
            value: 0,
            color: "gray-500",
            paramValue: "9",
          },
          {
            id: "no",
            name: "No",
            value: 0,
            color: "blue-500",
            paramValue: "0",
          },
          {
            id: "yes",
            name: "Yes",
            value: 1,
            color: "red-500",
            paramValue: "1",
          },
        ],
      },
      ehrcat: {
        paramName: "r6",
        buttonsOrientation: "horizontal",
        buttons: [
          {
            id: "unknown",
            name: "Unknown",
            value: 0,
            color: "gray-500",
            paramValue: "9",
          },
          {
            id: "no",
            name: "No",
            value: 0,
            color: "blue-500",
            paramValue: "0",
          },
          {
            id: "yes",
            name: "Yes",
            value: 1,
            color: "red-500",
            paramValue: "1",
          },
        ],
      },
    },
  },
  {
    id: "hgb",
    name: "Pretherapy Hgb &lt;10 g/dL",
    scores: {
      khorana: {
        paramName: "r7",
        buttonsOrientation: "horizontal",
        buttons: [
          {
            id: "unknown",
            name: "Unknown",
            value: 0,
            color: "gray-500",
            paramValue: "9",
          },
          {
            id: "no",
            name: "No",
            value: 0,
            color: "blue-500",
            paramValue: "0",
          },
          {
            id: "yes",
            name: "Yes",
            value: 1,
            color: "red-500",
            paramValue: "1",
          },
        ],
      },
      ehrcat: {
        paramName: "r8",
        buttonsOrientation: "horizontal",
        buttons: [
          {
            id: "unknown",
            name: "Unknown",
            value: 0,
            color: "gray-500",
            paramValue: "9",
          },
          {
            id: "no",
            name: "No",
            value: 0,
            color: "blue-500",
            paramValue: "0",
          },
          {
            id: "yes",
            name: "Yes",
            value: 1,
            color: "red-500",
            paramValue: "1",
          },
        ],
      },
    },
  },
  {
    id: "plt",
    name: "Pretherapy Plt ≥350 x 10<sup>9</sup>/L",
    scores: {
      khorana: {
        paramName: "r9",
        buttonsOrientation: "horizontal",
        buttons: [
          {
            id: "unknown",
            name: "Unknown",
            value: 0,
            color: "gray-500",
            paramValue: "9",
          },
          {
            id: "no",
            name: "No",
            value: 0,
            color: "blue-500",
            paramValue: "0",
          },
          {
            id: "yes",
            name: "Yes",
            value: 1,
            color: "red-500",
            paramValue: "1",
          },
        ],
      },
      ehrcat: {
        paramName: "r10",
        buttonsOrientation: "horizontal",
        buttons: [
          {
            id: "unknown",
            name: "Unknown",
            value: 0,
            color: "gray-500",
            paramValue: "9",
          },
          {
            id: "no",
            name: "No",
            value: 0,
            color: "blue-500",
            paramValue: "0",
          },
          {
            id: "yes",
            name: "Yes",
            value: 1,
            color: "red-500",
            paramValue: "1",
          },
        ],
      },
    },
  },
  {
    id: "stage",
    name: "Advanced cancer stage (IV)",
    scores: {
      ehrcat: {
        paramName: "r11",
        buttonsOrientation: "horizontal",
        buttons: [
          {
            id: "unknown",
            name: "Unknown",
            value: 0,
            color: "gray-500",
            paramValue: "9",
          },
          {
            id: "no",
            name: "No",
            value: 0,
            color: "blue-500",
            paramValue: "0",
          },
          {
            id: "yes",
            name: "Yes",
            value: 1,
            color: "red-500",
            paramValue: "1",
          },
        ],
      },
    },
  },
  {
    id: "vte_history",
    name: "History of VTE lifetime",
    scores: {
      ehrcat: {
        paramName: "r12",
        buttonsOrientation: "horizontal",
        buttons: [
          {
            id: "unknown",
            name: "Unknown",
            value: 0,
            color: "gray-500",
            paramValue: "9",
          },
          {
            id: "no",
            name: "No",
            value: 0,
            color: "blue-500",
            paramValue: "0",
          },
          {
            id: "yes",
            name: "Yes",
            value: 1,
            color: "red-500",
            paramValue: "1",
          },
        ],
      },
    },
  },
  {
    id: "paralysis_history",
    name: "History of paralysis/immobility last 12 months",
    scores: {
      ehrcat: {
        paramName: "r13",
        buttonsOrientation: "horizontal",
        buttons: [
          {
            id: "unknown",
            name: "Unknown",
            value: 0,
            color: "gray-500",
            paramValue: "9",
          },
          {
            id: "no",
            name: "No",
            value: 0,
            color: "blue-500",
            paramValue: "0",
          },
          {
            id: "yes",
            name: "Yes",
            value: 1,
            color: "red-500",
            paramValue: "1",
          },
        ],
      },
    },
  },
  {
    id: "hospitalization_history",
    name: "Recent/current hospitalization >3 days last 3 months",
    scores: {
      ehrcat: {
        paramName: "r14",
        buttonsOrientation: "horizontal",
        buttons: [
          {
            id: "unknown",
            name: "Unknown",
            value: 0,
            color: "gray-500",
            paramValue: "9",
          },
          {
            id: "no",
            name: "No",
            value: 0,
            color: "blue-500",
            paramValue: "0",
          },
          {
            id: "yes",
            name: "Yes",
            value: 1,
            color: "red-500",
            paramValue: "1",
          },
        ],
      },
    },
  },
  {
    id: "endocrine",
    name: "Endocrine monotherapy (no cytotoxic chemo or checkpoint inhibitor or targeted therapy)",
    scores: {
      ehrcat: {
        paramName: "r15",
        buttonsOrientation: "horizontal",
        buttons: [
          {
            id: "unknown",
            name: "Unknown",
            value: 0,
            color: "gray-500",
            paramValue: "9",
          },
          {
            id: "no",
            name: "No",
            value: 0,
            color: "blue-500",
            paramValue: "0",
          },
          {
            id: "yes",
            name: "Yes",
            value: -1,
            color: "green-500",
            paramValue: "1",
          },
        ],
      },
    },
  },
  {
    id: "asian",
    name: "East/South Asian or Pacific Islander",
    scores: {
      ehrcat: {
        paramName: "r16",
        buttonsOrientation: "horizontal",
        buttons: [
          {
            id: "unknown",
            name: "Unknown",
            value: 0,
            color: "gray-500",
            paramValue: "9",
          },
          {
            id: "no",
            name: "No",
            value: 0,
            color: "blue-500",
            paramValue: "0",
          },
          {
            id: "yes",
            name: "Yes",
            value: -1,
            color: "green-500",
            paramValue: "1",
          },
        ],
      },
    },
  },
];
