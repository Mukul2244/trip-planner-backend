export const registerDocs = {
  "/auth/register": {
    post: {
      tags: ["Auth"],
      summary: "Register user",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/RegisterUser"
            }
          }
        }
      },
      responses: {
        201: {
          description: "User registered successfully"
        }
      }
    }
  }
}