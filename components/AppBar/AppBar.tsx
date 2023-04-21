
import { usePathname } from 'next/navigation'
import Icon from '../Icon/Icon'
import styles from './AppBar.module.sass'
import Link from 'next/link'
import { ROUTES } from '@/helpers/constants'

export default function AppBar({
    mini
}: {
    mini?: boolean
}) {
    const pathname = usePathname()
    return <div className={`${styles.root} ${pathname === ROUTES.PLAYDATE ? styles.mini : ''}`}>
        <div className={styles.menu}>
            <Link href={ROUTES.HOME} className={`${pathname === ROUTES.HOME ? styles.active : ''}`}><Icon.Dashboard active={pathname === ROUTES.HOME} /></Link>
            <Link href={ROUTES.SEARCH} className={`${pathname === ROUTES.SEARCH ? styles.active : ''}`}><Icon.Search active={pathname === ROUTES.SEARCH} /></Link>
            <Link href={ROUTES.PLAYDATE} className={`${styles.main} ${pathname === ROUTES.PLAYDATE ? styles.active : ''}`}><Icon.Paw size={48} /></Link>
            <Link href={ROUTES.FRIENDS} className={`${pathname === ROUTES.FRIENDS ? styles.active : ''}`}><Icon.Friends active={pathname === ROUTES.FRIENDS} /></Link>
            <Link href={ROUTES.PROFILE} className={`${pathname === ROUTES.PROFILE ? styles.active : ''}`}><Icon.Profile active={pathname === ROUTES.PROFILE} /></Link>
        </div>
    </div>
}