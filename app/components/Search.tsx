"use client";
import { IoSearchSharp } from "react-icons/io5";
import Select from "./Select";
import { useContext, useState } from "react";
import Button from "./Button";
import Popover from "./Popover";
import { AppContext } from "../store/AppContext";
import { IoIosClose } from "react-icons/io";

export default function Search() {
  const [query, setQuery] = useState<string>("");
  const { fetchOption, setFetchOption, setSearchQuery } = useContext(AppContext);
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);

  function handleSearch() {
    setSearchQuery(query);
    setQuery("");
    setIsPopoverOpen(false);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      handleSearch();
    }
  }

  return (
    <div>
      {/* web */}
      <div className="hidden sm:flex p-2 rounded-full items-center bg-firstColor">
        <Select />
        <input
          type="text"
          placeholder="What are you looking for?"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="outline-none px-3 text-foreground bg-firstColor"
        />
        <Button
          action={handleSearch}
          className="bg-accentColor text-background hover:brightness-95 transition-all duration-200 p-3 rounded-full text-xl"
        >
          <IoSearchSharp />
        </Button>
      </div>

      {/* mobile */}
      <div className="flex sm:hidden">
        <Button
          action={() => setIsPopoverOpen(true)}
          className="bg-accentColor text-background hover:brightness-95 transition-all duration-200 p-3 rounded-full text-xl"
        >
          <IoSearchSharp />
        </Button>

        {isPopoverOpen && (
          <Popover onClose={() => setIsPopoverOpen(false)} className="absolute top-0 left-0 w-full rounded-none shadow-none">
            <div className="flex items-center bg-firstColor rounded-full p-2">
              <input
                type="text"
                placeholder="What are you looking for?"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 outline-none px-3 text-foreground bg-firstColor"
              />
              <Button action={() => setIsPopoverOpen(prev => !prev)} className="px-3">
                <IoIosClose className="text-3xl" />
              </Button>
              <Button
                action={handleSearch}
                className="bg-accentColor text-background hover:brightness-95 p-3 rounded-full text-xl"
              >
                <IoSearchSharp />
              </Button>
            </div>
          </Popover>
        )}
      </div>
    </div>
  );
}
