import type { Request, Response } from "express"
import * as authService from "../services/auth.service"

export const register = async (req: Request, res: Response) => {
  try {
    debugger;
    const { username, email, password } = req.body
    if (!username || !email || !password) {
      return res.status(400).json({
        message: "All fields are required"
      })
    }
    const result = await authService.registerUser(
      username,
      email,
      password
    )

    res.status(201).json(result)

  } catch (error: any) {

    res.status(400).json({
      message: error.message
    })

  }
}

export const login = async (req: Request, res: Response) => {

  try {

    const { email, password } = req.body

    const result = await authService.loginUser(
      email,
      password
    )

    res.json(result)

  } catch (error: any) {

    res.status(401).json({
      message: error.message
    })

  }
}