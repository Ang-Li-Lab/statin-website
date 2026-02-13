"use client";

import { useAppStore } from "@/store/useAppStore";
import { riskCriteria } from "@/lib/riskCriteria";
import ButtonGroup from "@/components/ButtonGroup";
import { useTranslations } from "next-intl";

const RiskScore: React.FC = () => {
  const t = useTranslations("RiskContainer");
  const {
    selectedValues,
    setSelectedValues,
    computedScores,
    vteHistoryValue,
    acValue,
  } = useAppStore();

  const handleButtonClick = (
    scoreName: string,
    criterionId: string,
    buttonId: string,
  ) => {
    setSelectedValues("risk", scoreName, criterionId, buttonId);
  };

  const localizedCriteria = riskCriteria.map((c) => ({
    ...c,
    scores: Object.fromEntries(
      Object.entries(c.scores).map(([scoreName, score]) => [
        scoreName,
        {
          ...score,
          buttons: score.buttons.map((b) => {
            let translatedName = b.name;
            if (b.name.toLowerCase() === "unknown") translatedName = t("unknown");
            else if (b.name.toLowerCase() === "no") translatedName = t("no");
            else if (b.name.toLowerCase() === "yes") translatedName = t("yes");
            return { ...b, name: translatedName };
          }),
        },
      ])
    ),
  }));

  const khoranaTotal =
    vteHistoryValue === "1" && acValue === "1"
      ? "N/A"
      : computedScores["khorana"];
  const ehrCatTotal =
    vteHistoryValue === "1" && acValue === "1"
      ? "N/A"
      : computedScores["ehrcat"];

  return (
    <div>
      <table className="min-w-full table-fixed text-center">
        <thead className="border-b border-gray-200">
          <tr>
            <th className="w-1/3"></th>
            <th className="w-1/3 px-4 py-2">
              Khorana Score:{" "}
              <span className="text-red-500">{khoranaTotal}</span>
            </th>
            <th className="w-1/3 px-4 py-2">
              EHR-CAT Score: <span className="text-red-500">{ehrCatTotal}</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {localizedCriteria.map((criterion) => (
            <tr key={criterion.id}>
              <td
                className="py-2 text-left align-middle"
                dangerouslySetInnerHTML={{ __html: criterion.name }}
              ></td>
              <td className="px-4 py-2 align-top">
                {criterion.scores["khorana"] && (
                  <ButtonGroup
                    criterionId={criterion.id}
                    buttons={criterion.scores["khorana"].buttons}
                    buttonsOrientation={
                      criterion.scores["khorana"].buttonsOrientation
                    }
                    selectedButtonId={
                      selectedValues.risk["khorana"]?.[criterion.id]
                    }
                    onButtonClick={(criterionId, buttonId) =>
                      handleButtonClick("khorana", criterionId, buttonId)
                    }
                    showValues={true}
                  />
                )}
              </td>
              <td className="px-4 py-2 align-top">
                {criterion.scores["ehrcat"] && (
                  <ButtonGroup
                    criterionId={criterion.id}
                    buttons={criterion.scores["ehrcat"].buttons}
                    buttonsOrientation={
                      criterion.scores["ehrcat"].buttonsOrientation
                    }
                    selectedButtonId={
                      selectedValues.risk["ehrcat"]?.[criterion.id]
                    }
                    onButtonClick={(criterionId, buttonId) =>
                      handleButtonClick("ehrcat", criterionId, buttonId)
                    }
                    showValues={true}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RiskScore;
