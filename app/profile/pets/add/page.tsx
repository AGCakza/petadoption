'use client'

import { PetForm } from '@/components'
import styles from './ProfilePetsAdd.module.sass'

const ProfilePetsAdd: React.FC<> = () => {


    return (
        <div classNmae={styles.root}>
            <PetForm />
        </div>
    )
}

export default ProfilePetsAdd