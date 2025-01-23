"use client"
import { IoSearchSharp } from "react-icons/io5";
import Select from "./Select";
import { useState } from "react";
import Button from "./Button";

export default function Search() {
    const [option, setOption] = useState<string>("Photos")

    function search() {
        alert("click test")
    }

    return <div className="p-2 rounded-2xl flex items-center bg-firstColor">
        <Select value={option} onChange={(value) => setOption(value)} />
        <input type="text" placeholder="Search pictures" className="text-sm font-semibold outline-none px-2 text-foreground bg-firstColor" />
        <Button action={search} content={<IoSearchSharp />} className="hover:bg-background hover:text-foreground transition-all duration-200 p-3 rounded-xl text-xl" />
    </div>
}