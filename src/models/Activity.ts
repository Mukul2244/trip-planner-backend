import mongoose, { Schema, Document } from "mongoose"
export interface IActivity extends Document {
    tripId: mongoose.Types.ObjectId
    dayId: mongoose.Types.ObjectId
    title: string
    time?: string
    note?: string
    order: number
    createdBy: mongoose.Types.ObjectId
}

const activitySchema = new Schema<IActivity>(
    {
        tripId: {
            type: Schema.Types.ObjectId,
            ref: "Trip",
            required: true,
            index: true,
        },
        dayId: {
            type: Schema.Types.ObjectId,
            ref: "TripDay",
            required: true,
            index: true,
        },
        title: {
            type: String,
            required: [true, "Activity title is required"],
            trim: true,
            maxlength: [200, "Title cannot exceed 200 characters"],
        },
        time: {
            type: String,
            match: [/^\d{2}:\d{2}$/, "Time must be in HH:MM format"],
        },
        note: {
            type: String,
            trim: true,
            maxlength: [1000, "Note cannot exceed 1000 characters"],
        },
        order: {
            type: Number,
            required: true,
            default: 0,
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
)

activitySchema.index({ dayId: 1, order: 1 })

export default mongoose.model<IActivity>("Activity", activitySchema)