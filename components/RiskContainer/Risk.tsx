import { useAppStore } from "@/store/useAppStore";
import { useCallback } from "react";
import { useTranslations } from "next-intl";
import * as Tabs from "@radix-ui/react-tabs";
import RiskScore from "@/components/RiskContainer/RiskScore";
import AboutEhrCat from "@/components/RiskContainer/AboutEhrCat";
import RiskReferences from "@/components/RiskContainer/RiskReferences";

const RiskContainer: React.FC = () => {
  const t = useTranslations("RiskContainer");
  const { currentTabs, setTab } = useAppStore();
  const containerName = "risk";
  const currentTab = currentTabs[containerName];

  const handleTabChange = useCallback(
    (value: string) => setTab(containerName, value),
    [setTab, containerName],
  );

  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <h2 className="text-2xl font-semibold mb-4">{t("mainTitle")}</h2>
      <Tabs.Root
        value={currentTab}
        onValueChange={handleTabChange}
        className="w-full"
      >
        <Tabs.List className="flex space-x-4 border-b">
          <Tabs.Trigger
            value="score"
            className={`pb-2 ${currentTab === "score" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-600 hover:text-gray-900"}`}
          >
            {t("scoreTabTitle")}
          </Tabs.Trigger>
          <Tabs.Trigger
            value="about-ehrcat"
            className={`pb-2 ${currentTab === "about-ehrcat" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-600 hover:text-gray-900"}`}
          >
            {t("aboutTabTitle")}
          </Tabs.Trigger>
          <Tabs.Trigger
            value="references"
            className={`pb-2 ${currentTab === "references" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-600 hover:text-gray-900"}`}
          >
            {t("refTabTitle")}
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="score">
          <RiskScore />
        </Tabs.Content>
        <Tabs.Content value="about-ehrcat" className="mt-4">
          <AboutEhrCat />
        </Tabs.Content>
        <Tabs.Content value="references" className="mt-4">
          <RiskReferences />
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
};

export default RiskContainer;
