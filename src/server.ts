import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { connectDB } from "./config/db"
import swaggerUi from "swagger-ui-express"
import { swaggerSpec } from "./config/swagger"
import authRoutes from "./routes/auth.routes"
import tripRouter from "./routes/trip.routes"

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))
app.use("/api/auth", authRoutes)
app.use("/api/trips", tripRouter)

connectDB()

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})