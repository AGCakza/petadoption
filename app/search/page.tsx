'use client'

import { UserDocument } from "@/db/models/user.model"
import api from "@/utils/axios"
import { useEffect, useState } from "react"

export default function Search() {
    const [people, setPeople] = useState([]) as UserDocument[]

    const addFriend = async (id: string) => {
        await api.post(`/friends/${id}`)
    }

    useEffect(() => {
        (async () => {
            const res = await api.get('/users')
            setPeople(res.data.users)
        })()
    }, [])
    return (
        <div>
            {people.map((item: UserDocument, index) => <div key={index} onClick={() => addFriend(item._id)}>{item.name}</div>)}
        </div>
    )
}