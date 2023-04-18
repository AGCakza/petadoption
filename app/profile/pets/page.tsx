'use client'

import { useEffect, useState } from 'react'
import styles from './ProfilePets.module.sass'
import { FEPet } from '@/helpers/types'
import { usePetsData } from '@/hooks'
import { PetThumb } from '@/components'

const ProfilePets = () => {
    const { getPets, pets } = usePetsData()

    useEffect(() => {
        (async () => {
            await getPets(!!!pets.length)
        })
    }, [])

    return (
        <div className={styles.root}>
            {pets.map(pet => <PetThumb key={pet._id} pet={pet} />)}
        </div>
    )
}

export default ProfilePets