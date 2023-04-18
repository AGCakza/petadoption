'use client'

import styles from './Profile.module.sass'
import { PetsBlock, UserThumb } from "@/components"
import { useAppData, usePetsData } from "@/hooks"
import Link from "next/link"
import { useEffect } from 'react'

export default function ProfilePage() {
    const { user } = useAppData()
    const { pets, getPets } = usePetsData()

    useEffect(() => {
        getPets(false, {
            page: 1,
            perPage: 5
        })
    }, [])

    useEffect(() => {
        console.log('pets: ', pets)
    }, [pets])

    return (
        <div className={styles.root}>
            <UserThumb user={user} style='big' />
            <div className={styles.list}>
                <Link className={styles.item} href={'/'}>My Info</Link>
                <PetsBlock pets={pets || []} showEdit />
                <Link className={styles.item} href={'/'}>About Us</Link>
                <Link className={styles.item} href={'/'}>Settings</Link>
            </div>
        </div>
    )
}