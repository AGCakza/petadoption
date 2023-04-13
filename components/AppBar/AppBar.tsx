
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
            <Link href={ROUTES.HOME}><Icon.Dashboard active={pathname === ROUTES.HOME} /></Link>
            <Link href={ROUTES.SEARCH}><Icon.Search active={pathname === ROUTES.SEARCH} /></Link>
            <Link href={ROUTES.PLAYDATE}><Icon.Paw className={`${styles.main} ${pathname === ROUTES.PLAYDATE ? styles.active : ''}`} active={pathname !== ROUTES.PLAYDATE} width={48} height={48} /></Link>
            <Link href={ROUTES.FRIENDS}><Icon.Friends active={pathname === ROUTES.FRIENDS} /></Link>
            <Link href={ROUTES.PROFILE}><Icon.Profile active={pathname === ROUTES.PROFILE} /></Link>
        </div>
    </div>
}