"use client";

import React from "react";
import ExclusionContent from "@/components/ExclusionContainer/ExclusionContent";

const ExclusionContainer: React.FC = () => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Exclusion Criteria</h2>
        <ExclusionContent />
    </div>
  );
};

export default ExclusionContainer;
