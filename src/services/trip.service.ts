import mongoose from "mongoose"
import Trip, { type ITrip } from "../models/Trip"
import TripMember from "../models/TripMember"
import { generateTripDays } from "../utils/tripDaysBuilder"

type CreateTripInput = Pick<ITrip, "title" | "startDate" | "endDate">

export const createTrip = async (userId: string, data: CreateTripInput) => {
  debugger;
  const session = await mongoose.startSession()

  try {
    session.startTransaction()

    const [trip] = await Trip.create([{ ...data, owner: userId }], { session })

    await TripMember.create([{ tripId: trip!._id, userId, role: "owner" }], { session })

    await generateTripDays(trip!);
    
    await session.commitTransaction()
    return trip

  } catch (err) {
    await session.abortTransaction()
    throw err
  } finally {
    session.endSession()
  }
}

export const getUserTrips = async (userId: string) => {

  const memberships = await TripMember
    .find({ userId })
    .populate("tripId")

  return memberships.map(m => m.tripId)

}

export const getTrip = async (tripId: string) => {

  return Trip.findById(tripId)

}