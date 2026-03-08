import mongoose, { Schema, Document } from "mongoose"
import bcrypt from "bcrypt"

export interface IUser extends Document {
  username: string
  email: string
  password: string
  refreshToken?: string
  isValidPassword(password: string): Promise<boolean>
}

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
)

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return
  this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.isValidPassword = async function (password: string): Promise<boolean> {
  return bcrypt.compare(password, this.password)
}

export default mongoose.model<IUser>("User", userSchema)