"use client";

import { useState } from "react";
import { AiOutlinePicture } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { MdOutlineOndemandVideo } from "react-icons/md";

export default function Select() {
  const [selectOption, setSelectOption] = useState("Photos");

  const options = [
    { value: "Photos", label: "Photos", icon: <AiOutlinePicture /> },
    { value: "Videos", label: "Videos", icon: <MdOutlineOndemandVideo /> },
  ];
  return (
    <div className="flex items-center gap-2 bg-background p-3 min-h-full rounded-xl cursor-pointer ">
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
  );
}
