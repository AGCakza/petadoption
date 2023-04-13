import mongoose from "mongoose"
import bcrypt from 'bcrypt'
import { User } from "../models"
import { IUser, UserDocument } from "../models/user.model"

export async function createUser(input: IUser): Promise<UserDocument> {
    const res = await User.create(input).catch(err => err)
    return res as UserDocument
}

export async function getUsers(page?: number, perPage?: number): Promise<UserDocument[]> {
    if(!page) page = 1
    if(!perPage) perPage = 10
    const arr = await User.find({}).skip((page - 1) * perPage).limit(perPage)
    return arr as UserDocument[]
}

export async function getUser(find: string | object): Promise<UserDocument> {
    let user = null
    if(typeof find === 'string') user = await User.findById(find).catch(err => console.log(err))
    else user = await User.findOne(find).catch(err => console.log(err))
    return user as UserDocument
}

export async function updateUser(id: string, input: IUser): Promise<UserDocument> {
    const salt = await bcrypt.genSalt(10)
    const hashed = bcrypt.hashSync(input.password, salt)
    input.password = hashed
    const res = await User.findByIdAndUpdate(id, input).catch(err => err)
    return res as UserDocument
}