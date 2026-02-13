import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { useTranslations } from "next-intl";

export default function HeaderComp() {
  const t = useTranslations("Header");

  return (
    <header className="fixed top-0 left-0 right-0 h-16 border-b-4 border-customBlue border-solid z-50 bg-gray-200">
      <div className="h-full w-full px-3 grid grid-cols-2 items-center gap-3">
        <div className="min-w-0">
          <p className="text-2xl font-bold leading-tight truncate">
            Statin Clinical Trial
          </p>
          <p className="text-xl leading-tight truncate">
            {t("title")} <span className="opacity-70">(1.0.1)</span>
          </p>
        </div>

        <div className="text-sm text-gray-700 text-right leading-tight min-w-0">
          <p className="flex items-center justify-end">
            <ExclamationTriangleIcon className="w-5 h-5 text-yellow-600 mr-1" />
            {t("disclaimerLine1")}
          </p>
          <p>
            <span className="text-red-700 font-semibold">
              {t("disclaimerLine2")}
            </span>{" "}
            {t("disclaimerLine3")}
          </p>
        </div>
      </div>
    </header>
  );
}
