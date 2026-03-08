import bcrypt from "bcrypt"
import User from "../models/User"
import { generateToken } from "../utils/jwt"

export const registerUser = async (username: string, email: string, password: string) => {

    const existingUser = await User.findOne({ email })

    if (existingUser) {
        throw new Error("User already exists")
    }
    const user = await User.create({
        username,
        email,
        password
    });

    const token = generateToken(user._id.toString())

    return { user, token }
}

export const loginUser = async (email: string, password: string) => {

    const user = await User.findOne({ email })

    if (!user) {
        throw new Error("Invalid credentials")
    }

    const isMatch = await bcrypt.compare(
        password,
        user.password
    )
    if (!isMatch) {
        throw new Error("Invalid credentials")
    }

    const token = generateToken(user._id.toString())

    return { user, token }
}