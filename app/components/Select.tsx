"use client";
import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AiOutlinePicture } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { MdOutlineOndemandVideo } from "react-icons/md";
import Popover from "./Popover";
import { AppContext } from "../store/AppContext";

export default function Select() {
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);
  const router = useRouter();

  const options = [
    { value: "Photos", label: "Photos", icon: <AiOutlinePicture /> },
    { value: "Videos", label: "Videos", icon: <MdOutlineOndemandVideo /> },
  ];

  const { fetchOption, setFetchOption, setSearchQuery } = useContext(AppContext);

  if (!fetchOption || !setFetchOption) {
    throw new Error("AppContext must be used within an AppProvider");
  }

  function handleOptionClick(value: string) {
    setFetchOption(value);
    setSearchQuery("");
    setIsPopoverOpen(false);

    router.push(value === "Photos" ? "/photos" : "/videos");
  }

  return (
    <div className="relative">
      <div
        className="flex items-center gap-2 bg-background p-3 min-h-full rounded-full cursor-pointer w-26"
        onClick={() => setIsPopoverOpen((prev) => !prev)}
      >
        <div className="flex items-center gap-2">
          <span className="text-secondColor">
            {options.find((option) => option.value === fetchOption)?.icon}
          </span>
          <p className="font-semibold">
            {options.find((option) => option.value === fetchOption)?.value}
          </p>
        </div>
        <IoIosArrowDown
          className={`text-secondColor transition-transform duration-300 ${
            isPopoverOpen ? "rotate-180" : ""
          }`}
        />
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
                <span className="font-semibold">{option.label}</span>
              </div>
            ))}
          </div>
        </Popover>
      )}
    </div>
  );
}
