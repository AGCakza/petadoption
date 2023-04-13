import mongoose from "mongoose"
import { Friendship } from "../models"
import { IFriendship, FriendshipDocument } from '../models/friendship.model'
import { UserDocument } from "../models/user.model"

export async function addFriend(input: any): Promise<FriendshipDocument> {
    const check = await Friendship.findOne({ between: input.between })
    if(check) return acceptFriendship(check.id, input.from)
    const res = await Friendship.create(input).catch(err => {
        console.log(err)
    })
    return res as FriendshipDocument
}

export async function acceptFriendship(id: string, from: string): Promise<FriendshipDocument> {
    const res = await Friendship.findOneAndUpdate({_id: id, from: { $ne: from }}, { status: 'accepted' }).catch(err => err)
    return res
}

export async function getFriends(page: number, perPage: number, me: string): Promise<FriendshipDocument[]> {
    if(!page) page = 1
    if(!perPage) perPage = 100
    const arr = await Friendship.find({ between: { $in: [me] }, status: 'accepted' }).skip((page - 1) * perPage).limit(perPage).populate('between').lean()
    return arr
}

export async function getFriendRequests(page: number, perPage: number, me: string): Promise<FriendshipDocument[]> {
    if(!page) page = 1
    if(!perPage) perPage = 100
    const arr = await Friendship.find({ between: { $in: [me] }, from: { $ne: me }, status: 'pending' }).skip((page - 1) * perPage).limit(perPage).populate('between').lean()
    return arr
}

export async function removeFriendship(id: string) {
    await Friendship.findByIdAndDelete(id).catch(err => err)
}