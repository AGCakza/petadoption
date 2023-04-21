import { FEPet } from '@/helpers/types'
import PetThumb from '../PetThumb/PetThumb'
import styles from './PetsBlock.module.sass'
import Link from 'next/link'
import { ROUTES } from '@/helpers/constants'

interface IPetsBlock {
    pets: FEPet[]
    showEdit: boolean | null
}

const PetsBlock: React.FC<IPetsBlock> = ({
    pets,
    showEdit
}) => {
    return (
        <div className={styles.root}>
            <div className={styles.header}>
                <p className={styles.title}>Pet{pets.length !== 1 && 's'}<strong>{pets.length > 1 ? ' ' + pets.length : ''}</strong></p>
                {showEdit && <Link href={ROUTES.PROFILE_PETS}>Edit</Link>}
            </div>
            <div className={styles.content}>
                {pets.map(pet => <PetThumb key={pet._id} pet={pet} style={pets.length === 1 ? 'big' : 'default'}/>)}
                {!pets.length && <p className={styles.empty}>There are no pets :(</p>}
            </div>
        </div>
    )
}

export default PetsBlock