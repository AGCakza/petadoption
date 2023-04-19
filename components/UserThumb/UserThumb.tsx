import React from 'react'
import styles from './UserThumb.module.sass'
import { FEUser } from '@/helpers/types'

interface IUserThumb {
    style: 'mini' | 'nobackground' | 'default' | 'big'
    user: FEUser | null
}

const UserThumb: React.FC<IUserThumb> = ({
    style = 'default',
    user
}) => {

    return (
        <div className={`${styles.root} ${styles[style]}`}>
            <div className={styles.avatar}>
                <img src={user?.avatar || '/icons/face.svg'} alt={user?.name || 'User'} />
            </div>
            {style !== 'mini' && <div className={styles.info}>
                <p className={styles.name}>{user?.name}</p>
            </div>}
        </div>
    )
}

export default UserThumb