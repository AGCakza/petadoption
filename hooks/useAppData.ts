import { useAppDataContext } from "@/context/AppDataContext"
import api from "@/utils/axios"
import { useSession } from "next-auth/react"
import { useCallback, useEffect, useState } from "react"

export default function useAppData() {
    const { data: session, status } = useSession()
    const { appData, setAppData } = useAppDataContext()
    const [userId, setUserId] = useState(session?.user.id)

    const getUserInfo = useCallback(async () => {
        const { data } = await api.get('/me')
        setAppData(prev => ({
            ...prev,
            user: data.user
        }))
    }, [session, setAppData])

    useEffect(() => {
        console.log(!appData.user && status === 'authenticated', appData.user, status)
        if(!appData.user && status === 'authenticated') getUserInfo()
    }, [status, appData.user, getUserInfo])

    useEffect(() => {
        if(session?.user.id && !userId) setUserId(session?.user.id)
    }, [session, setUserId, userId])

    return {
        userId,
        status,
        ...appData,
        getUserInfo

    }
}