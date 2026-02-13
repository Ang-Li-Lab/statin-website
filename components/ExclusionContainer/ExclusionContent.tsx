"use client";

import React, { useMemo } from "react";
import { useAppStore } from "@/store/useAppStore";
import { exclusionCriteria } from "@/lib/exclusionCriteria";
import ButtonGroup from "@/components/ButtonGroup";
import { useTranslations } from "next-intl";

const ExclusionContent: React.FC = () => {
  const t = useTranslations("RiskContainer");
  const { selectedValues, setSelectedValues } = useAppStore();

  const handleButtonClick = (criterionId: string, buttonId: string) => {
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

  const computeExclusionStatus = useMemo(() => {
    const paramValues = exclusionCriteria.map((criterion) => {
      const selectedButtonId = selectedValues["exclusion"]?.[criterion.id];
      const selectedButton = criterion.buttons.find(
        (button) => button.id === selectedButtonId,
      );

      return selectedButton?.paramValue || null;
    });

    if (paramValues.includes("1")) {
      return { text: "Excluded", className: "text-red-500" };
    } else if (paramValues.includes("9")) {
      return { text: "Unknown Exclusion", className: "text-gray-500" };
    } else {
      return { text: "Not Excluded", className: "text-black" };
    }
  }, [selectedValues]);

  const { text: exclusionText, className: exclusionClass } =
    computeExclusionStatus;

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
          {localizedCriteria.map((criterion) => (
            <tr key={criterion.id}>
              <td
                className="py-2 text-left align-middle"
                dangerouslySetInnerHTML={{ __html: criterion.name }}
              ></td>
              <td className="px-4 py-2 align-top">
                <ButtonGroup
                  criterionId={criterion.id}
                  buttons={criterion.buttons}
                  selectedButtonId={selectedValues["exclusion"]?.[criterion.id]}
                  onButtonClick={handleButtonClick}
                  showValues={false}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExclusionContent;
