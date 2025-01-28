"use client"
import { createContext, ReactNode, useState } from "react";

type AppCtx = {
    fetchOption: string;
    setFetchOption: (value: string) => void;
}

type Props = {
    children: ReactNode;
}

export const AppContext = createContext<AppCtx>({} as AppCtx);

export default function AppProvider({ children }: Props) {
    const [fetchOption, setFetchOption] = useState<string>("Photos")

    return (
        <AppContext.Provider value={{fetchOption, setFetchOption}}>
            {children}
        </AppContext.Provider>
    )
}