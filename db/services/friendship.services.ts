import mongoose from "mongoose"
import { Friendship } from "../models"
import { IFriendship, FriendshipDocument } from '../models/friendship.model'

export async function addFriend(input: IFriendship): FriendshipDocument {
    const check = await Friendship.findOne({ between: { $in: input.between }}) as FriendshipDocument
    if(check) return acceptFriendship(check.id, input.from)
    const res = await Friendship.create(input).catch(err => {
        console.log(err)
    })
    return res
}

export async function acceptFriendship(id: string, from: string): FriendshipDocument {
    const res = await Friendship.findOneAndUpdate({_id: id, from: { $ne: from }}, { status: 'accepted' } as IFriendship).catch(err => err)
    return res
}

export async function getFriends(page: number, perPage: number, me: string): Array<FriendshipDocument> {
    if(!page) page = 1
    if(!perPage) perPage = 100
    const arr = await Friendship.find({ between: { $in: [me] }, status: 'accepted' } as FriendshipDocument).skip((page - 1) * perPage).limit(perPage).populate('between').lean()
    return arr
}

export async function getFriendRequests(page: number, perPage: number, me: string): Array<FriendshipDocument> {
    if(!page) page = 1
    if(!perPage) perPage = 100
    const arr = await Friendship.find({ between: { $in: [me] }, from: { $ne: me }, status: 'pending' } as FriendshipDocument).skip((page - 1) * perPage).limit(perPage).populate('between').lean()
    return arr
}

export async function removeFriendship(id: string) {
    await Friendship.findByIdAndDelete(id).catch(err => err)
}