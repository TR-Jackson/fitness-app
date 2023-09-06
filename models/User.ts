import { Schema, Document, models, model } from 'mongoose'

export interface IUser extends Document {
	email: string
	password: string
}

const userSchema = new Schema<IUser>({
	email: { type: String, required: true },
	password: { type: String, required: true }
})

export default models.User || model('User', userSchema)
