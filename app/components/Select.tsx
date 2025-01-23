"use client";

import { useState } from "react";
import { AiOutlinePicture } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { MdOutlineOndemandVideo } from "react-icons/md";
import Popover from "./Popover";

type Props = {
  value: string;
  onChange: (value: string) => void;
}

export default function Select({ value, onChange }: Props) {
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);

  const options = [
    { value: "Photos", label: "Photos", icon: <AiOutlinePicture /> },
    { value: "Videos", label: "Videos", icon: <MdOutlineOndemandVideo /> },
  ];

  function handleOptionClick(value: string) {
    onChange(value);
    setIsPopoverOpen(false);
  };

  return (
    <div className="relative">
      <div className="flex items-center gap-2 bg-background p-3 min-h-full rounded-xl cursor-pointer w-26" onClick={() => setIsPopoverOpen((prev => !prev))}>
        <div className="flex items-center gap-2">
          <span className="text-secondColor">
            {options.find((option) => option.value === value)?.icon}
          </span>
          <p className="font-semibold text-sm">
            {options.find((option) => option.value === value)?.value}
          </p>
        </div>
        <IoIosArrowDown className="text-secondColor" />
      </div>

      {isPopoverOpen && (
        <Popover onClose={() => setIsPopoverOpen(false)} className="top-14">
            <div>
            {options.map((option) => (
              <div
                key={option.value}
                onClick={() => handleOptionClick(option.value)}
                className="flex items-center gap-2 px-3 py-2 cursor-pointer rounded-xl hover:bg-firstColor"
              >
                <span className="text-secondColor">{option.icon}</span>
                <span className="text-sm font-semibold">{option.label}</span>
              </div>
            ))}
          </div>
        </Popover>
      )}
    </div>
  );
}
