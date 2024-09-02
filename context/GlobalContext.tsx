"use client"
import { GlobalContextProviderType, InitialValue } from "@/types/global";
import { ActiveTabStates } from "@/types/sidebar";
import { createContext, ReactNode, useState } from "react";


export const GlobalContext = createContext<GlobalContextProviderType>(InitialValue)

const GlobalContextProvider = ({ children }: { children: ReactNode }) => {

    const [activeTab, setActiveTab] = useState<ActiveTabStates>('overview');

    return (
        <GlobalContext.Provider value={{
            activeTab,
            setActiveTab,
        }}>
            {children}
        </GlobalContext.Provider>
    )
}


export { GlobalContextProvider };