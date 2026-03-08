import mongoose, { Schema, Document } from "mongoose"

export type TripMemberRole = "owner" | "editor" | "viewer"

export interface ITripMember extends Document {
    tripId: mongoose.Types.ObjectId
    userId: mongoose.Types.ObjectId
    role: TripMemberRole
    joinedAt: Date
}

const tripMemberSchema = new Schema<ITripMember>(
    {
        tripId: {
            type: Schema.Types.ObjectId,
            ref: "Trip",
            required: true
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        role: {
            type: String,
            enum: ["owner", "editor", "viewer"],
            default: "viewer",
        },
        joinedAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
)
// ✅ one membership per user per trip — prevents duplicates
tripMemberSchema.index({ tripId: 1, userId: 1 }, { unique: true })

// ✅ export a model, not the schema
export default mongoose.model<ITripMember>("TripMember", tripMemberSchema)