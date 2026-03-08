import type { ITrip } from "../models/Trip"
import TripDay from "../models/TripDay"

export const generateTripDays = async (trip: ITrip) => {

    const start = new Date(trip.startDate)
    const end = new Date(trip.endDate)

    const days = []

    let current = new Date(start)
    let dayNumber = 1

    while (current <= end) {

        days.push({
            tripId: trip._id,
            date: new Date(current),
            dayNumber
        })

        current.setDate(current.getDate() + 1)
        dayNumber++
    }

    await TripDay.insertMany(days)
}