import { mapObjectToQuery } from "@/helpers/funcs"
import { PetsMeta } from "@/helpers/types"
import api from "@/utils/axios"
import { useCallback, useEffect } from "react"
import useAppData from "./useAppData"
import { usePetsDataContext } from "@/context/PetsDataContext"

export default function usePetsData() {
    const { petsData, setPetsData } = usePetsDataContext()
    const { userId } = useAppData()

    const getPets = useCallback(async (toggleLoading: boolean | null, {
        page = 1,
        perPage = 5,
        owner = userId,
        query = null
    }: Partial<PetsMeta>) => {
        console.log(userId)
        try {
            if(toggleLoading) setPetsData(prev => ({...prev, isLoading: true}))
            const res = await api.get(`/pets${mapObjectToQuery({page, perPage, owner, query}, true)}`)
            setPetsData(prev => ({...prev, pets: res.data.data.pets, meta: res.data.data.meta, isLoading: false}))
        } catch(err) {
            console.log(err)
        }
    }, [setPetsData, userId])

    useEffect(() => {
        console.log(petsData)
    }, [petsData])

    return {
        ...petsData,
        getPets
    }
}