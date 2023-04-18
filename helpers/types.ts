import { DOG_BREEDS, PetType, USER_ROLES } from "./constants"

export type PositionType = {
    x: string,
    y: string
}

export type ValueOf<T> = T[keyof T]

export interface IAppData {
    user: null | FEUser
}

export type PetsMeta = {
    page: number
    perPage: number
    totalPages: number
    query: string | null
    owner: string | null
}
export interface IPetsData {
    pets: FEPet[]
    pet: null | FEPet
    meta: PetsMeta
}

export interface FEUser {
    _id: string
    firstName: string
    lastName: string
    email: string
    role: USER_ROLES
    username: string
    password: string
    birthDate: Date
    country: string
    city: string
    position: PositionType
    rating: number
    avatar: string
    name: string
    updatedAt: Date
    createdAt: Date
}

export interface FEPet {
    _id: string
    name: string,
    type: PetType,
    breed: DOG_BREEDS,
    owner: string | FEUser,
    birthDate: Date,
    avatar: string
}