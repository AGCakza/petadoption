import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import { PositionType } from '@/helpers/types'
import { USER_ROLES } from '@/helpers/constants'

export interface IUser {
    firstName: string,
    lastName: string,
    email: string,
    role: USER_ROLES,
    username: string,
    password: string,
    birthDate: Date,
    country: string,
    city: string,
    position: PositionType,
    rating: number,
    avatar: string
}

export interface UserDocument extends IUser, mongoose.Document {
    name: string,
    updatedAt: Date,
    createdAt: Date,
    comparePassword(checkPassword: string): Promise<boolean>
}

const userSchema = new mongoose.Schema<IUser>({
    firstName: {
        type: String,
        required: [ true, 'Please provide your first name.' ],
        maxLength: [ 60, 'First name cannot be more than 60 characters.' ]
    },
    lastName: {
        type: String,
        required: [ true, 'Please provide your last name.' ],
        maxLength: [ 60, 'Last name cannot be more than 60 characters.' ]
    },
    email: {
        type: String,
        required: [ true, 'Please provide your email.' ],
        validate: [ /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Wrong email!' ],
        unique: true
    },
    role: {
        type: String, enum: USER_ROLES, required: true, default: USER_ROLES.USER
    },
    username: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: [ true, 'Please enter your password.' ]
    },
    avatar: {
        type: String
    },
    birthDate: {
        type: Date,
        required: [ true, 'Please provide the date of your birth.']
    },
    country: {
        type: String
    },
    city: {
        type: String
    },
    position: {
        x: { type: String },
        y: { type: String }
    },
    rating: {
        type: Number, default: 0
    }
})

userSchema.virtual('name').get(function(this: UserDocument) {
    return `${this.firstName} ${this.lastName}`
})

userSchema.pre('save', async function(this: UserDocument, next: mongoose.HookNextFunction) {
    if(!this.isModified('password')) return next()
    if(!this.username) this.username = this.email
    const salt = await bcrypt.genSalt(10)
    const hashed = bcrypt.hashSync(this.password, salt)
    this.password = hashed
    next()
})

userSchema.methods.comparePassword = async function(checkPassword: string): Promise<boolean> {
    const user = this as UserDocument
    return await bcrypt.compare(checkPassword, user.password).catch(() => false)
}

export default mongoose.models && 'User' in mongoose.models ? mongoose.models.User : mongoose.model<UserDocument>('User', userSchema)