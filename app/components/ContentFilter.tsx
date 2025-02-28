"use client";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import { AppContext } from "../store/AppContext";
import Button from "./Button";

export default function ContentFilter() {
  const { fetchOption, setFetchOption, setSearchQuery } =
    useContext(AppContext);
  const router = useRouter();

  function handleFilterChange(option: "Photos" | "Videos") {
    setFetchOption(option);
    setSearchQuery("");
    router.push(option === "Photos" ? "/photos" : "/videos");
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex gap-2">
        <Button
          action={() => handleFilterChange("Photos")}
          className={`py-1 px-4 rounded-full transition-all duration-200 ${
            fetchOption === "Photos" ? "bg-foreground text-background" : "bg-background hover:bg-firstColor"
          }`}
        >
          Photos
        </Button>
        <Button
          action={() => handleFilterChange("Videos")}
          className={`py-1 px-4 rounded-full transition-all duration-200 ${
            fetchOption === "Videos" ? "bg-foreground text-background" : "bg-background hover:bg-firstColor"
          }`}
        >
          Videos
        </Button>
      </div>
    </div>
  );
}
