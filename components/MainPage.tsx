"use client";

import { useRef, useEffect, useCallback } from "react";
import { useAppStore } from "@/store/useAppStore";
import RiskContainer from "@/components/RiskContainer/Risk";
import ExclusionContainer from "@/components/ExclusionContainer/Exclusion";
import { useSearchParams } from "next/navigation";

const MainPage = () => {
  const {
    currentContainer,
    isInitialized,
    setContainer,
    initializeStateFromUrl,
    generateShareableLink,
  } = useAppStore();

  const riskRef = useRef<HTMLDivElement>(null);
  const exclusionRef = useRef<HTMLDivElement>(null);

  const searchParams = useSearchParams();
  const hasAutoScrolled = useRef(false);

  useEffect(() => {
    if (searchParams) {
      initializeStateFromUrl(searchParams);
    }
  }, [searchParams, initializeStateFromUrl]);

  useEffect(() => {
    if (isInitialized && currentContainer && !hasAutoScrolled.current) {
      hasAutoScrolled.current = true;
      const refs: Record<string, React.RefObject<HTMLDivElement | null>> = {
        risk: riskRef,
        exclusion: exclusionRef,
      };
      refs[currentContainer]?.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [isInitialized, currentContainer]);

  const copyLink = useCallback(() => {
    const shareLink = generateShareableLink("consider");
    navigator.clipboard.writeText(shareLink);
    alert("Link copied to clipboard!");
  }, [generateShareableLink]);

  return (
    <div className="container mx-auto space-y-8">
      <div ref={riskRef} id="risk" className="scroll-mt-20">
        <RiskContainer />
      </div>
      <div ref={exclusionRef} id="exclusion" className="scroll-mt-20">
        <ExclusionContainer />
      </div>
      <div className="flex justify-center items-center">
        <button
          onClick={copyLink}
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-400"
        >
          Share
        </button>
      </div>
    </div>
  );
};

export default MainPage;
