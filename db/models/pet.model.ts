import { DOG_BREEDS } from "@/helpers/constants"
import { ValueOf } from "@/helpers/types"
import moment from "moment"
import mongoose from "mongoose"

const PetType = {
    DOG: 'dog'
} as const
type PetType = ValueOf<typeof PetType>

export interface IPet {
    name: string,
    type: PetType,
    breed: DOG_BREEDS,
    owner: string,
    birthDate: Date,
    avatar: string
}

export interface PetDocument extends IPet, mongoose.Document {
    updatedAt: Date,
    createdAt: Date,
    age: number
}

const petSchema = new mongoose.Schema<IPet>({
    name: { type: String, required: [ true, 'Please give a name to your pet!' ] },
    type: { type: String, enum: PetType, required: true },
    breed: { type: String, enum: DOG_BREEDS, required: [ true, "Please choose you pet's breed." ] },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    birthDate: { type: Date, required: [ true, "Please provide your pet's birthday!"] },
    avatar: { type: String }
})

petSchema.virtual('age').get(function(this: IPet) {
    return moment().diff(moment(this.birthDate), 'months')
})

export default mongoose.models && 'Pet' in mongoose.models ? mongoose.models.Pet : mongoose.model<PetDocument>('Pet', petSchema)