import styles from './NavButton.module.sass'
import Icon from '../Icon/Icon'
import { ROUTES } from "@/helpers/constants"
import Link from 'next/link'

export default function NavButton({
    to,
    position = 'left',
    icon = 'Back'
}: {
    to: ROUTES | string
    position: 'left' | 'right'
    icon: 'Back' | 'Add'
}) {

    return (
        <Link href={to} className={`${styles.root} ${styles[position]}`}>
            {icon === 'Back' ? <Icon.Back /> : icon === 'Add' && <Icon.Add />}
        </Link>
    )
}