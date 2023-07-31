import { Schema, models, model } from 'mongoose'

interface IUser {
	email: string
	password: string
}

const userSchema = new Schema<IUser>({
	email: { type: String, required: true },
	password: { type: String, required: true }
})

export default models.User || model('User', userSchema)
