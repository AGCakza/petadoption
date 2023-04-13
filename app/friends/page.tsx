'use client'

import { useEffect, useState } from 'react'
import styles from './Friends.module.sass'
import api from '@/utils/axios'

// async function getFriends() {
//     try {
//         const friends = await api.get('/friends')
//         return friends
//     } catch(err) {
//         console.log(err)
//     }
// }

export default function Friends() {
    const [friends, setFriends] = useState([])
    const [requests, setRequests] = useState([])

    useEffect(() => {
        (async () => {
            const res = await api.get('/friends')
            const res2 = await api.get('/friends/requests')
            setRequests(res2.data.friends)
            setFriends(res.data.friends)
        })()
    }, [])

    // console.log(friends)

    const handleAccept = async (id: string) => {
        const res = await api.post(`/friends/${id}`)
    }
    const handleDelete = async (id: string) => {
        const res = await api.delete(`/friends/${id}`)
    }

    return (
        <div className={styles.root}>
            {requests.map((item, index) => <div key={index}>
                <p>{item.friend.name}</p>
                <p onClick={() => handleAccept(item._id)}>Accept</p>
                <p onClick={() => handleDelete(item._id)}>Delete</p>
            </div>)}
            Friends
            {friends.map((item, index) => <div key={index}>
                <p>{item.friend.name}</p>
                <p onClick={() => handleDelete(item._id)}>Delete Friend</p>
            </div>)}
        </div>
    )
}