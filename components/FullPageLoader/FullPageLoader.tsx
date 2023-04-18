import Icon from '../Icon/Icon'
import styles from './FullPageLoader.module.sass'

export default function FullPageLoader({
    active
}: {
    active: boolean
}) {

    return (
        <div className={`${styles.root} ${active ? styles.active : ''}`}>
            <Icon.Paw active width={72} height={72} className={styles.img} />
        </div>
    )
}