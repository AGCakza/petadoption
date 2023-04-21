'use client'

import { IAppData } from "@/helpers/types"
import React, { Dispatch, SetStateAction, createContext, useContext, useState } from "react"

const AppDataContext = createContext({appData: { user: null }, setAppData: () => {}} as { appData: IAppData, setAppData: Dispatch<SetStateAction<IAppData>> })

export const AppDataContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [appData, setAppData] = useState({
        user: null
    } as IAppData)

    return (
        <AppDataContext.Provider value={{ appData, setAppData }}>
            {children}
        </AppDataContext.Provider>
    )
}

export const useAppDataContext = () => useContext(AppDataContext)