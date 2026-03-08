import mongoose, { Schema, Document } from "mongoose"

export interface ITrip extends Document {
    title: string
    startDate: Date
    endDate: Date
    owner: mongoose.Types.ObjectId
}

const tripSchema = new Schema<ITrip>(
    {
        title: {
            type: String,
            required: [true, "Trip title is required"],
            trim: true,
            maxlength: [100, "Title cannot exceed 100 characters"],
        },
        startDate: {
            type: Date,
            required: [true, "Start date is required"],
        },
        endDate: {
            type: Date,
            required: [true, "End date is required"],
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }

)
tripSchema.virtual("members", {
    ref: "TripMember",
    localField: "_id",
    foreignField: "tripId",
})
export default mongoose.model<ITrip>("Trip", tripSchema)