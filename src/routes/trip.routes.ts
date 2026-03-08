import express from "express"
import { createTrip, getUserTrips } from "../controllers/trip.controller"
import { authMiddleware } from "../middleware/auth.middleware"

const router = express.Router()

/**
 * @swagger
 * /trips:
 *   post:
 *     summary: Create a new trip
 *     tags: [Trips]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               startDate:
 *                 type: string
 *               endDate:
 *                 type: string
 *     responses:
 *       201:
 *         description: Trip created successfully
 */
router.post("/", authMiddleware, createTrip)
router.get("/", authMiddleware, getUserTrips)

export default router