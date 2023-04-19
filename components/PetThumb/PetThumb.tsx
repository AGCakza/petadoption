import React from 'react'
import styles from './PetThumb.module.sass'
import { FEPet } from '@/helpers/types'

interface IPetThumb {
    style?: 'mini' | 'nobackground' | 'default' | 'big'
    pet: FEPet
}

const PetThumb: React.FC<IPetThumb> = ({
    style = 'default',
    pet
}) => {

    return (
        <div className={`${styles.root} ${styles[style]}`}>
            <div className={styles.avatar}>
                <img src={pet.avatar ? process.env.NEXT_PUBLIC_URL + pet.avatar : '/icons/pet.svg'} alt={pet.name || 'Pet'} />
            </div>
            {style !== 'mini' && <div className={styles.info}>
                <p className={styles.name}>{pet.name}</p>
                <div>
                    <p>Age months</p>
                    <div className={styles.divider} />
                    <p>Type</p>
                </div>
            </div>}
        </div>
    )
}

export default PetThumb