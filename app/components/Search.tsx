"use client"
import { IoSearchSharp } from "react-icons/io5";
import Select from "./Select";
import { useContext, useState } from "react";
import Button from "./Button";
import { AppContext } from "../store/AppContext";

export default function Search() {
    const [query, setQuery] = useState<string>("");

    const { fetchOption, setFetchOption, setSearchQuery } = useContext(AppContext);

    function handleSearch() {
        setSearchQuery(query);
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter") {
            handleSearch();
        }
    }

    return <div className="p-2 rounded-2xl flex items-center bg-firstColor">
        <Select />
        <input
            type="text"
            placeholder="Search pictures"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="text-sm font-semibold outline-none px-2 text-foreground bg-firstColor"
        />
        <Button action={handleSearch} content={<IoSearchSharp />} className="hover:bg-background hover:text-foreground transition-all duration-200 p-3 rounded-xl text-xl" />
    </div>
}