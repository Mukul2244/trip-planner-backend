import mongoose, { Schema, Document } from "mongoose"

export interface IMember {
    userId: mongoose.Types.ObjectId
    role: "owner" | "editor" | "viewer"
}

export interface ITrip extends Document {
    title: string
    startDate: Date
    endDate: Date
    owner: mongoose.Types.ObjectId
    coverImage?: string
    members: IMember[]
}

const memberSchema = new Schema<IMember>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    role: {
        type: String,
        enum: ["owner", "editor", "viewer"],
        default: "viewer",
    },
})

const tripSchema = new Schema<ITrip>(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        startDate: {
            type: Date,
            required: true,
        },
        endDate: {
            type: Date,
            required: true,
            validate: {
                validator: function (value: Date) {
                    return value > (this as any).startDate
                },
                message: "endDate must be after startDate",
            },
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        coverImage: {
            type: String,          // ✅ was in interface but missing from schema entirely
        },
        members: [memberSchema],
    },
    { timestamps: true }
)

export default mongoose.model<ITrip>("Trip", tripSchema)