import { ValueOf } from "@/helpers/types"
import styles from './Icon.module.sass'
import Image from "next/image"
import React from "react"

const ICONS_LIBRARY = {
    PAW: '/icons/paw.svg',
    PAW_ACTIVE: '/icons/paw-active.svg',
    PROFILE: '/icons/account.svg',
    PROFILE_ACTIVE: '/icons/account-active.svg',
    FRIENDS: '/icons/friends.svg',
    FRIENDS_ACTIVE: '/icons/friends-active.svg',
    DASHBOARD: '/icons/dashboard.svg',
    DASHBOARD_ACTIVE: '/icons/dashboard-active.svg',
    SEARCH: '/icons/search.svg',
    SEARCH_ACTIVE: '/icons/search-active.svg'
} as const
type ICONS_LIBRARY = ValueOf<typeof ICONS_LIBRARY>

interface IconType {
    src: ICONS_LIBRARY | string,
    alt?: string,
    width?: number,
    height?: number,
    className?: string,
    active?: boolean
}

type IconChosenType = Omit<IconType, 'src'>

function IconComponent({
    src,
    alt = 'icon',
    width = 32,
    height = 32,
    className,
    active
}: IconType) {
    return (
        <div className={`${styles.root} ${className}`}>
            <Image
                src={src}
                alt={alt}
                width={width}
                height={height}
            />
        </div>
    )
}

const Icon: React.FC<IconType> & {
    Paw: React.FC<IconChosenType>,
    Profile: React.FC<IconChosenType>,
    Friends: React.FC<IconChosenType>,
    Dashboard: React.FC<IconChosenType>,
    Search: React.FC<IconChosenType>
} = props => <IconComponent {...props} />

const Paw: React.FC<IconChosenType> = (props) => <IconComponent src={ICONS_LIBRARY[`PAW${props.active ? '_ACTIVE': ''}`]} {...props} />
const Profile: React.FC<IconChosenType> = (props) => <IconComponent src={ICONS_LIBRARY[`PROFILE${props.active ? '_ACTIVE': ''}`]} {...props} />
const Friends: React.FC<IconChosenType> = (props) => <IconComponent src={ICONS_LIBRARY[`FRIENDS${props.active ? '_ACTIVE': ''}`]} {...props} />
const Dashboard: React.FC<IconChosenType> = (props) => <IconComponent src={ICONS_LIBRARY[`DASHBOARD${props.active ? '_ACTIVE': ''}`]} {...props} />
const Search: React.FC<IconChosenType> = (props) => <IconComponent src={ICONS_LIBRARY[`SEARCH${props.active ? '_ACTIVE': ''}`]} {...props} />

Icon.Paw = Paw
Icon.Profile = Profile
Icon.Friends = Friends
Icon.Dashboard = Dashboard
Icon.Search = Search

export default Icon