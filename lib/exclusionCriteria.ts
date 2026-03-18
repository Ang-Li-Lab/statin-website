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
    id: "lowscore",
    name: "Low Khorana and EHR-CAT scores (&lt;2) - Derived from above",
    buttonsOrientation: "horizontal",
    paramName: "",
    buttons: [
      { id: "unknown", name: "Unknown", color: "gray-500", paramValue: "99" },
      { id: "no", name: "No", color: "blue-500", paramValue: "0" },
      { id: "yes", name: "Yes", color: "red-500", paramValue: "1" },
    ],
  },
  {
    id: "highscore",
    name: "High Khorana (&gt;4) or EHR-CAT (&gt;5) score - Derived from above",
    buttonsOrientation: "horizontal",
    paramName: "",
    buttons: [
      { id: "unknown", name: "Unknown", color: "gray-500", paramValue: "99" },
      { id: "no", name: "No", color: "blue-500", paramValue: "0" },
      { id: "yes", name: "Yes", color: "red-500", paramValue: "1" },
    ],
  },
  {
    id: "statin",
    name: "Current statin prescription",
    buttonsOrientation: "horizontal",
    paramName: "xstatin",
    buttons: [
      { id: "unknown", name: "Unknown", color: "gray-500", paramValue: "99" },
      { id: "no", name: "No", color: "blue-500", paramValue: "0" },
      { id: "yes", name: "Yes", color: "red-500", paramValue: "1" },
    ],
  },
  {
    id: "ac",
    name: "Current anticoagulant prescription",
    buttonsOrientation: "horizontal",
    paramName: "xac",
    buttons: [
      { id: "unknown", name: "Unknown", color: "gray-500", paramValue: "99" },
      { id: "no", name: "No", color: "blue-500", paramValue: "0" },
      { id: "yes", name: "Yes", color: "red-500", paramValue: "1" },
    ],
  },
  {
    id: "ineligible_cancer",
    name: "Ineligible cancer type/treatment:<br />non-melanomatous skin, acute leukemia, MPN, MDS, primary brain, transplant or CART",
    buttonsOrientation: "horizontal",
    paramName: "xcancer",
    buttons: [
      { id: "unknown", name: "Unknown", color: "gray-500", paramValue: "99" },
      { id: "no", name: "No", color: "blue-500", paramValue: "0" },
      { id: "yes", name: "Yes", color: "red-500", paramValue: "1" },
    ],
  },
  {
    id: "egfr",
    name: "eGFR &lt;30 mL/min",
    buttonsOrientation: "horizontal",
    paramName: "xegfr",
    buttons: [
      { id: "unknown", name: "Unknown", color: "gray-500", paramValue: "99" },
      { id: "no", name: "No", color: "blue-500", paramValue: "0" },
      { id: "yes", name: "Yes", color: "red-500", paramValue: "1" },
    ],
  },
  {
    id: "altast",
    name: "ALT &gt;3x or AST &gt;3x ULN",
    buttonsOrientation: "horizontal",
    paramName: "xaltast",
    buttons: [
      { id: "unknown", name: "Unknown", color: "gray-500", paramValue: "99" },
      { id: "no", name: "No", color: "blue-500", paramValue: "0" },
      { id: "yes", name: "Yes", color: "red-500", paramValue: "1" },
    ],
  },
  {
    id: "hivhcv",
    name: "Diagnosis of HIV or HCV",
    buttonsOrientation: "horizontal",
    paramName: "xhivhcv",
    buttons: [
      { id: "unknown", name: "Unknown", color: "gray-500", paramValue: "99" },
      { id: "no", name: "No", color: "blue-500", paramValue: "0" },
      { id: "yes", name: "Yes", color: "red-500", paramValue: "1" },
    ],
  },
  {
    id: "statin_allergy",
    name: "Known statin allergy",
    buttonsOrientation: "horizontal",
    paramName: "xallergy",
    buttons: [
      { id: "unknown", name: "Unknown", color: "gray-500", paramValue: "99" },
      { id: "no", name: "No", color: "blue-500", paramValue: "0" },
      { id: "yes", name: "Yes", color: "red-500", paramValue: "1" },
    ],
  },
  {
    id: "contraind",
    name: "Drug-drug interaction:<br />daralutemide, regorafenib, cabozantinib, sofosbuvir, velpatasvir, voxilaprevir",
    buttonsOrientation: "horizontal",
    paramName: "xcontraind",
    buttons: [
      { id: "unknown", name: "Unknown", color: "gray-500", paramValue: "99" },
      { id: "no", name: "No", color: "blue-500", paramValue: "0" },
      { id: "yes", name: "Yes", color: "red-500", paramValue: "1" },
    ],
  },
  {
    id: "pughliver",
    name: "Child Pugh Class B or C liver disease",
    buttonsOrientation: "horizontal",
    paramName: "xpughliver",
    buttons: [
      { id: "unknown", name: "Unknown", color: "gray-500", paramValue: "99" },
      { id: "no", name: "No", color: "blue-500", paramValue: "0" },
      { id: "yes", name: "Yes", color: "red-500", paramValue: "1" },
    ],
  },
  {
    id: "ecog",
    name: "ECOG PS &gt;3",
    buttonsOrientation: "horizontal",
    paramName: "xecog",
    buttons: [
      { id: "unknown", name: "Unknown", color: "gray-500", paramValue: "99" },
      { id: "no", name: "No", color: "blue-500", paramValue: "0" },
      { id: "yes", name: "Yes", color: "red-500", paramValue: "1" },
    ],
  },
  {
    id: "life",
    name: "Life expectancy &lt;6 months",
    buttonsOrientation: "horizontal",
    paramName: "xlife",
    buttons: [
      { id: "unknown", name: "Unknown", color: "gray-500", paramValue: "99" },
      { id: "no", name: "No", color: "blue-500", paramValue: "0" },
      { id: "yes", name: "Yes", color: "red-500", paramValue: "1" },
    ],
  },
  {
    id: "suitable",
    name: "Not suitable per study PI",
    buttonsOrientation: "horizontal",
    paramName: "xsuitable",
    buttons: [
      { id: "unknown", name: "Unknown", color: "gray-500", paramValue: "99" },
      { id: "no", name: "No", color: "blue-500", paramValue: "0" },
      { id: "yes", name: "Yes", color: "red-500", paramValue: "1" },
    ],
  },
];
