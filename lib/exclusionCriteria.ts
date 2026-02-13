export interface Button {
  id: string;
  name: string;
  color: string;
  paramValue: string;
}

export interface Criterion {
  id: string;
  name: string;
  buttonsOrientation: "horizontal" | "vertical";
  buttons: Button[];
  paramName: string;
}

export const exclusionCriteria: Criterion[] = [
  {
    id: "statin",
    name: "Current use of statin therapy",
    buttonsOrientation: "horizontal",
    paramName: "x1",
    buttons: [
      { id: "unknown", name: "Unknown", color: "gray-500", paramValue: "9" },
      { id: "no", name: "No", color: "blue-500", paramValue: "0" },
      { id: "yes", name: "Yes", color: "red-500", paramValue: "1" },
    ],
  },
  {
    id: "statin_intolerance",
    name: "Known statin intolerance",
    buttonsOrientation: "horizontal",
    paramName: "x2",
    buttons: [
      { id: "unknown", name: "Unknown", color: "gray-500", paramValue: "9" },
      { id: "no", name: "No", color: "blue-500", paramValue: "0" },
      { id: "yes", name: "Yes", color: "red-500", paramValue: "1" },
    ],
  },
  {
    id: "ac",
    name: "Current use of systemic anticoagulation",
    buttonsOrientation: "horizontal",
    paramName: "x3",
    buttons: [
      { id: "unknown", name: "Unknown", color: "gray-500", paramValue: "9" },
      { id: "no", name: "No", color: "blue-500", paramValue: "0" },
      { id: "yes", name: "Yes", color: "red-500", paramValue: "1" },
    ],
  },
  {
    id: "low_vte_risk",
    name: "Low VTE risk",
    buttonsOrientation: "horizontal",
    paramName: "x4",
    buttons: [
      { id: "unknown", name: "Unknown", color: "gray-500", paramValue: "9" },
      { id: "no", name: "No", color: "blue-500", paramValue: "0" },
      { id: "yes", name: "Yes", color: "red-500", paramValue: "1" },
    ],
  },
  {
    id: "high_vte_risk",
    name: "High VTE risk",
    buttonsOrientation: "horizontal",
    paramName: "x5",
    buttons: [
      { id: "unknown", name: "Unknown", color: "gray-500", paramValue: "9" },
      { id: "no", name: "No", color: "blue-500", paramValue: "0" },
      { id: "yes", name: "Yes", color: "red-500", paramValue: "1" },
    ],
  },
  {
    id: "leukemia",
    name: "Acute leukemia, myelodysplastic syndrome, or myeloproliferative neoplasm",
    buttonsOrientation: "horizontal",
    paramName: "x6",
    buttons: [
      { id: "unknown", name: "Unknown", color: "gray-500", paramValue: "9" },
      { id: "no", name: "No", color: "blue-500", paramValue: "0" },
      { id: "yes", name: "Yes", color: "red-500", paramValue: "1" },
    ],
  },
  {
    id: "metas_brain_tumor",
    name: "Metastatic brain tumor",
    buttonsOrientation: "horizontal",
    paramName: "x7",
    buttons: [
      { id: "unknown", name: "Unknown", color: "gray-500", paramValue: "9" },
      { id: "no", name: "No", color: "blue-500", paramValue: "0" },
      { id: "yes", name: "Yes", color: "red-500", paramValue: "1" },
    ],
  },
  {
    id: "primary_brain_tumor",
    name: "Primary brain tumor",
    buttonsOrientation: "horizontal",
    paramName: "x8",
    buttons: [
      { id: "unknown", name: "Unknown", color: "gray-500", paramValue: "9" },
      { id: "no", name: "No", color: "blue-500", paramValue: "0" },
      { id: "yes", name: "Yes", color: "red-500", paramValue: "1" },
    ],
  },
  {
    id: "plt",
    name: "Plt &lt;50 x 10<sup>9</sup>/L",
    buttonsOrientation: "horizontal",
    paramName: "x9",
    buttons: [
      { id: "unknown", name: "Unknown", color: "gray-500", paramValue: "9" },
      { id: "no", name: "No", color: "blue-500", paramValue: "0" },
      { id: "yes", name: "Yes", color: "red-500", paramValue: "1" },
    ],
  },
  {
    id: "alt",
    name: "ALT >5x or Bili >2x ULN",
    buttonsOrientation: "horizontal",
    paramName: "x10",
    buttons: [
      { id: "unknown", name: "Unknown", color: "gray-500", paramValue: "9" },
      { id: "no", name: "No", color: "blue-500", paramValue: "0" },
      { id: "yes", name: "Yes", color: "red-500", paramValue: "1" },
    ],
  },
  {
    id: "egfr",
    name: "eGFR &lt;30 mL/min/1.73 m<sup>2</sup>",
    buttonsOrientation: "horizontal",
    paramName: "x11",
    buttons: [
      { id: "unknown", name: "Unknown", color: "gray-500", paramValue: "9" },
      { id: "no", name: "No", color: "blue-500", paramValue: "0" },
      { id: "yes", name: "Yes", color: "red-500", paramValue: "1" },
    ],
  },
];
