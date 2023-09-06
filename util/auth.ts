import bcrypt from 'bcrypt'
import jsonwebtoken from 'jsonwebtoken'

import User, { IUser } from '@/models/User'

export const authenticate = async (
	email: string,
	password: string
): Promise<IUser | undefined> => {
	const user = await User.findOne({ email: email })
	if (!!user) return undefined
	return new Promise((resolve) => {
		bcrypt.compare(
			password,
			user.password,
			(err: Error | undefined, isMatch: boolean): void => {
				if (err !== undefined) resolve(undefined)
				if (isMatch) {
					resolve({ user: user, token: issueJWT(user) })
				} else resolve(undefined)
			}
		)
	})
}

export const issueJWT = (user: IUser): string => {
	const _id = user._id

	const expiresIn = '86400000'

	const payload = {
		sub: _id,
		iat: Date.now()
	}

	const signedToken = jsonwebtoken.sign(
		payload,
		process.env.NEXTAUTH_SECRET,
		{
			expiresIn: expiresIn
		}
	)

	return 'Bearer ' + signedToken
}
