"use client";

import { useAppStore } from "@/store/useAppStore";
import { exclusionCriteria } from "@/lib/exclusionCriteria";
import ButtonGroup from "@/components/ButtonGroup";
import { useTranslations } from "next-intl";

const ExclusionContent: React.FC = () => {
  const t = useTranslations("ExclusionContainer");
  const {
    selectedValues,
    derivedExclusionValues,
    setSelectedValues,
    exclusionStatus,
  } = useAppStore();

  const handleButtonClick = (criterionId: string, buttonId: string) => {
    if (criterionId === "lowscore" || criterionId === "highscore") return;
    setSelectedValues("exclusion", null, criterionId, buttonId);
  };

  const localizedCriteria = exclusionCriteria.map((criterion) => ({
    ...criterion,
    buttons: criterion.buttons.map((b) => {
      let translatedName = b.name;
      if (b.name.toLowerCase() === "unknown") translatedName = t("unknown");
      else if (b.name.toLowerCase() === "no") translatedName = t("no");
      else if (b.name.toLowerCase() === "yes") translatedName = t("yes");
      return { ...b, name: translatedName };
    }),
  }));

  const { text: exclusionText, className: exclusionClass } =
    exclusionStatus === "yes"
      ? { text: "Excluded", className: "text-red-500" }
      : exclusionStatus === "unknown"
        ? { text: "Unknown Exclusion", className: "text-gray-500" }
        : { text: "Not Excluded", className: "text-black" };

  return (
    <div>
      <table className="min-w-full table-fixed text-center">
        <thead className="border-b border-gray-200">
          <tr>
            <th className="w-1/2"></th>
            <th className="w-1/2 px-4 py-2">
              <span className={exclusionClass}>{exclusionText}</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {localizedCriteria.map((criterion) => {
            const selectedButtonId =
              criterion.id === "lowscore"
                ? derivedExclusionValues.lowscore
                : criterion.id === "highscore"
                  ? derivedExclusionValues.highscore
                  : selectedValues.exclusion[criterion.id];

            return (
              <tr key={criterion.id}>
                <td
                  className="w-1/2 py-2 text-left align-middle"
                  dangerouslySetInnerHTML={{ __html: criterion.name }}
                />
                <td className="w-1/2 px-4 py-2 align-top">
                  <ButtonGroup
                    criterionId={criterion.id}
                    buttons={criterion.buttons}
                    buttonsOrientation={criterion.buttonsOrientation}
                    selectedButtonId={selectedButtonId}
                    onButtonClick={handleButtonClick}
                    showValues={true}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ExclusionContent;