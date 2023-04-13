import mongoose from 'mongoose'
import {  } from '@/helpers/types'
import { FRIENDSHIP_STATUS } from '@/helpers/constants'

export interface IFriendship {
    between: readonly [string?, string?],
    status: FRIENDSHIP_STATUS,
    from: string
}

export interface FriendshipDocument extends IFriendship, mongoose.Document {
    updatedAt: Date,
    createdAt: Date,
}

const friendshipSchema = new mongoose.Schema<IFriendship>({
    between: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
    from: { type: mongoose.Types.ObjectId, ref: 'User' },
    status: { type: String, enum: FRIENDSHIP_STATUS, default: 'pending' }
})

export default mongoose.models && 'Friendship' in mongoose.models ? mongoose.models.Friendship : mongoose.model<FriendshipDocument>('Friendship', friendshipSchema)