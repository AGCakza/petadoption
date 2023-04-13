import mongoose from 'mongoose'
import {  } from '@/helpers/types'
import { FRIENDSHIP_STATUS } from '@/helpers/constants'
import { UserDocument } from './user.model'

export interface IFriendship {
    between: UserDocument['_id'][],
    from: UserDocument['_id'],
    status: FRIENDSHIP_STATUS
}

export interface FriendshipDocument extends IFriendship, mongoose.Document<mongoose.Types.ObjectId> {
    updatedAt: Date,
    createdAt: Date,
    friend?: UserDocument
}

const friendshipSchema = new mongoose.Schema<IFriendship>({
    between: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    from: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, enum: FRIENDSHIP_STATUS, default: 'pending' }
})

export default mongoose.models && 'Friendship' in mongoose.models ? mongoose.models.Friendship as mongoose.Model<FriendshipDocument> : mongoose.model<FriendshipDocument>('Friendship', friendshipSchema)