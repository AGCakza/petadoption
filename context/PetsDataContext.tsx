'use client'

import { IPetsData } from "@/helpers/types"
import React, { Dispatch, SetStateAction, createContext, useContext, useState } from "react"

const PetsDataContext = createContext({petsData: { pets: [], pet: null }, setPetsData: () => {}} as { petsData: IPetsData, setPetsData: Dispatch<SetStateAction<IPetsData>> })

export const PetsDataContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [petsData, setPetsData] = useState({
      pets: [],
      pet: null
    } as IPetsData)

    return (
        <PetsDataContext.Provider value={{ petsData, setPetsData }}>
            {children}
        </PetsDataContext.Provider>
    )
}

export const usePetsDataContext = () => useContext(PetsDataContext)