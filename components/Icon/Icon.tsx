import { ValueOf } from "@/helpers/types"
import styles from './Icon.module.sass'
import Image from "next/image"
import React from "react"

interface IIcon extends React.FC<IconType> {
    Paw: React.FC<IconChosenType>
    Profile: React.FC<IconChosenType>
    Friends: React.FC<IconChosenType>
    Dashboard: React.FC<IconChosenType>
    Search: React.FC<IconChosenType>
    Back: React.FC<IconChosenType>
    Add: React.FC<IconChosenType>
}

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
    SEARCH_ACTIVE: '/icons/search-active.svg',
    BACK: '/icons/back.svg',
    BACK_ACTIVE: '/icons/back-active.svg',
    ADD: '/icons/add.svg'
} as const
type ICONS_LIBRARY = ValueOf<typeof ICONS_LIBRARY>

interface IconType extends Image {
    src: ICONS_LIBRARY | string,
    alt?: string,
    width?: number,
    height?: number,
    className?: string,
    active?: boolean
}

type IconChosenType = Omit<IconType, 'src'> & { size: number }

function IconComponent({
    src,
    alt = 'icon',
    width = 32,
    height = 32,
    className,
    active
}: IconType) {
    return (
        <div className={`${styles.root} ${className}`} style={{ width, height }}>
            <Image
                src={src}
                alt={alt}
                width={width}
                height={height}
            />
        </div>
    )
}

const Icon: IIcon = props => <IconComponent {...props} />

const Paw: IIcon['Paw'] = (props) => <IconComponent src={ICONS_LIBRARY[`PAW${props.active ? '_ACTIVE': ''}`]} width={(props.size || 32) * 1} height={(props.size || 32) * 1} {...props} />
const Profile: IIcon['Profile'] = (props) => <IconComponent src={ICONS_LIBRARY[`PROFILE${props.active ? '_ACTIVE': ''}`]} width={(props.size || 32) * 1} height={(props.size || 32) * 1} {...props} />
const Friends: IIcon['Friends'] = (props) => <IconComponent src={ICONS_LIBRARY[`FRIENDS${props.active ? '_ACTIVE': ''}`]} width={(props.size || 32) * 1} height={(props.size || 32) * 1} {...props} />
const Dashboard: IIcon['Dashboard'] = (props) => <IconComponent src={ICONS_LIBRARY[`DASHBOARD${props.active ? '_ACTIVE': ''}`]} width={(props.size || 32) * 1} height={(props.size || 32) * 1} {...props} />
const Search: IIcon['Search'] = (props) => <IconComponent src={ICONS_LIBRARY[`SEARCH${props.active ? '_ACTIVE': ''}`]} width={(props.size || 32) * 1} height={(props.size || 32) * 1} {...props} />
const Back: IIcon['Back'] = (props) => <IconComponent src={ICONS_LIBRARY[`BACK${props.active ? '_ACTIVE': ''}`]} width={(props.size || 24) * 1} height={(props.size || 24) * 1.5} fill {...props} />
const Add: IIcon['Add'] = (props) => <IconComponent src={ICONS_LIBRARY[`ADD${props.active ? '_ACTIVE': ''}`]} width={(props.size || 24) * 1} height={(props.size || 24) * 1} fill {...props} />

Icon.Paw = Paw
Icon.Profile = Profile
Icon.Friends = Friends
Icon.Dashboard = Dashboard
Icon.Search = Search
Icon.Back = Back
Icon.Add = Add

export default Icon