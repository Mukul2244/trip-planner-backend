import swaggerJsdoc from "swagger-jsdoc"
import { registerDocs } from "../docs/auth.swagger"

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Trip Planner API",
      version: "1.0.0",
      description: "API documentation for Trip Planner backend"
    },
    servers: [
      {
        url: "http://localhost:5000/api"
      }
    ],
    tags: [
      { name: "Auth", description: "Authentication APIs" },
      { name: "Trips", description: "Trip management APIs" }
    ],
    components: {
      schemas: {
        RegisterUser: {
          type: "object",
          required: ["name", "email", "password"],
          properties: {
            name: { type: "string" },
            email: { type: "string" },
            password: { type: "string" }
          }
        }
      }
    },

    paths: {
      ...registerDocs
    }
  },
  apis: ["./src/routes/*.ts"]
}

export const swaggerSpec = swaggerJsdoc(options)