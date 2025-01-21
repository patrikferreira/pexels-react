"use client";

import { useState } from "react";
import { AiOutlinePicture } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { MdOutlineOndemandVideo } from "react-icons/md";
import Popover from "./Popover";

export default function Select() {
  const [selectOption, setSelectOption] = useState<string>("Photos");
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);

  const options = [
    { value: "Photos", label: "Photos", icon: <AiOutlinePicture /> },
    { value: "Videos", label: "Videos", icon: <MdOutlineOndemandVideo /> },
  ];

  const handleOptionClick = (value: string) => {
    setSelectOption(value);
    setIsPopoverOpen(false);
  };

  return (
    <div className="relative">
      <div className="flex items-center gap-2 bg-background p-3 min-h-full rounded-xl cursor-pointer " onClick={() => setIsPopoverOpen((prev => !prev))}>
        <div className="flex items-center gap-2">
          <span className="text-secondColor">
            {options.find((option) => option.value === selectOption)?.icon}
          </span>
          <p className="font-semibold text-sm">
            {options.find((option) => option.value === selectOption)?.value}
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
