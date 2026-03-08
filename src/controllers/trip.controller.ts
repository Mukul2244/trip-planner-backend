import type { Request, Response } from "express"
import * as tripService from "../services/trip.service"

export const createTrip = async (req: Request, res: Response) => {
  debugger;
  const userId = req.user.userId

  const trip = await tripService.createTrip(userId, req.body)

  res.status(201).json(trip)

}

export const getUserTrips = async (req: Request, res: Response) => {

  const userId = req.user.userId

  const trips = await tripService.getUserTrips(userId)

  res.json(trips)

}

export const getTrip = async (req: Request, res: Response) => {

  const { tripId } = req.params

  const trip = await tripService.getTrip(tripId)

  res.json(trip)

}