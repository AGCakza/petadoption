'use client'

import { PetForm } from '@/components'
import styles from './ProfilePetsAdd.module.sass'

interface IProfilePetsAdd {

}

const ProfilePetsAdd: React.FC<IProfilePetsAdd> = () => {


    return (
        <div className={styles.root}>
            <PetForm />
        </div>
    )
}

export default ProfilePetsAdd