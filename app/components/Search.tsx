"use client"
import { IoSearchSharp } from "react-icons/io5";
import Select from "./Select";
import { useContext, useState } from "react";
import Button from "./Button";
import { AppContext } from "../store/AppContext";

export default function Search() {
    const { fetchOption, setFetchOption } = useContext(AppContext)

    function search() {
        alert(`Searching for ${fetchOption}`);
    }

    return <div className="p-2 rounded-2xl flex items-center bg-firstColor">
        <Select value={fetchOption} onChange={setFetchOption} />
        <input type="text" placeholder="Search pictures" className="text-sm font-semibold outline-none px-2 text-foreground bg-firstColor" />
        <Button action={search} content={<IoSearchSharp />} className="hover:bg-background hover:text-foreground transition-all duration-200 p-3 rounded-xl text-xl" />
    </div>
}