'use client'

import { NavButton } from '@/components'
import styles from './ProfilePetsLayout.module.sass'
import React from 'react'
import { ROUTES } from '@/helpers/constants'

const ProfilePetsLayout = ({
    children
}: {
    children: React.ReactNode
}) => {

    return (
        <div className={styles.root}>
            <NavButton to={ROUTES.PROFILE} />
            <NavButton to={ROUTES.PROFILE_PETS_ADD} icon='Add' position='right' />
            <h2 className={styles.title}>Pets</h2>
            <div className={styles.content}>
                {children}
            </div>
        </div>
    )
}

export default ProfilePetsLayout