import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/User";

export const signup = async (req: Request, res: Response) => {
  try {
    const passwordHash = await bcrypt.hash(req.body.password, 10);

    const user = new User({ ...req.body, password: passwordHash });
    user.save();

    res.status(201).json({ message: "User created" });
  } catch (error) {
    res.status(500).json({ error });
  }
};
