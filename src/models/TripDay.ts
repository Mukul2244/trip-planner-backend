import mongoose, { Schema } from "mongoose"

const tripDaySchema = new Schema({

  tripId: {
    type: Schema.Types.ObjectId,
    ref: "Trip",
    required: true
  },

  date: {
    type: Date,
    required: true
  },

  dayNumber: {
    type: Number,
    required: true
  }

}, { timestamps: true })

tripDaySchema.index({ tripId: 1 })
export default mongoose.model("TripDay", tripDaySchema)