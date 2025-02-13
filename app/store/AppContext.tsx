"use client"
import { createContext, ReactNode, useState, useEffect } from "react";
import { usePathname } from "next/navigation";

type AppCtx = {
    fetchOption: string;
    setFetchOption: (value: string) => void;
    searchQuery: string;
    setSearchQuery: (value: string) => void;
}

type Props = {
    children: ReactNode;
}

export const AppContext = createContext<AppCtx>({} as AppCtx);

export default function AppProvider({ children }: Props) {
    const [fetchOption, setFetchOption] = useState<string>("Photos");
    const [searchQuery, setSearchQuery] = useState<string>("");
    const pathname = usePathname();

    useEffect(() => {
        if (pathname.includes("photos")) {
            setFetchOption("Photos");
        } else if (pathname.includes("videos")) {
            setFetchOption("Videos");
        }
    }, [pathname]);

    return (
        <AppContext.Provider value={{fetchOption, setFetchOption, searchQuery, setSearchQuery}}>
            {children}
        </AppContext.Provider>
    )
}
