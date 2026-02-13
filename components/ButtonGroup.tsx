"use client";

import React from "react";
import * as ToggleGroup from "@radix-ui/react-toggle-group";

const COLOR = {
  "gray-500": {
    border: "border-gray-500",
    bg: "bg-gray-500",
    text: "text-gray-500",
  },
  "red-500": {
    border: "border-red-500",
    bg: "bg-red-500",
    text: "text-red-500",
  },
  "green-500": {
    border: "border-green-500",
    bg: "bg-green-500",
    text: "text-green-500",
  },
  "blue-500": {
    border: "border-blue-500",
    bg: "bg-blue-500",
    text: "text-blue-500",
  },
  "red-700": {
    border: "border-red-700",
    bg: "bg-red-700",
    text: "text-red-700",
  },
  "red-900": {
    border: "border-red-900",
    bg: "bg-red-900",
    text: "text-red-900",
  },
} as const;

type ColorKey = keyof typeof COLOR;

interface Button {
  id: string;
  name: string;
  value?: number;
  color: string;
}

interface ButtonGroupProps {
  criterionId: string;
  buttons: Button[];
  buttonsOrientation?: "horizontal" | "vertical";
  selectedButtonId: string;
  onButtonClick: (criterionId: string, buttonId: string) => void;
  showValues?: boolean;
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({
  criterionId,
  buttons,
  buttonsOrientation = "horizontal",
  selectedButtonId = "",
  onButtonClick,
  showValues = false,
}) => {
  const isHorizontal = buttonsOrientation === "horizontal";

  return (
    <ToggleGroup.Root
      type="single"
      className={`inline-flex ${isHorizontal ? "" : "flex-col"}`}
      value={selectedButtonId}
      onValueChange={(value) => {
        if (value) onButtonClick(criterionId, value);
      }}
    >
      {buttons.map((button, index) => {
        const c = COLOR[button.color as ColorKey] ?? COLOR["gray-500"];
        const isFirst = index === 0;
        const isLast = index === buttons.length - 1;

        const baseClasses = `px-2 py-2 border ${c.border} focus:z-10 text-sm flex justify-between items-center`;
        const selectedClasses = `${c.bg} text-white`;
        const unselectedClasses = `bg-white ${c.text}`;

        const borderRadiusClasses = isHorizontal
          ? isFirst
            ? "rounded-l-md"
            : isLast
              ? "rounded-r-md -ml-px"
              : "-ml-px"
          : isFirst
            ? "rounded-t-md"
            : isLast
              ? "rounded-b-md -mt-px"
              : "-mt-px";

        const classes = `${baseClasses} ${borderRadiusClasses} ${
          selectedButtonId === button.id ? selectedClasses : unselectedClasses
        }`;

        const formattedValue =
          showValues && button.value !== undefined
            ? button.value > 0
              ? `+${button.value}`
              : `${button.value}`
            : null;

        return (
          <ToggleGroup.Item
            key={button.id}
            value={button.id}
            className={classes}
          >
            <span className="text-left">{button.name}</span>
            {formattedValue !== null && (
              <span className="text-right ml-2">{formattedValue}</span>
            )}
          </ToggleGroup.Item>
        );
      })}
    </ToggleGroup.Root>
  );
};

export default ButtonGroup;
