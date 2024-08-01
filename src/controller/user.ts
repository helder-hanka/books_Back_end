import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/User";

export const signup = async (req: Request, res: Response) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });

    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const passwordHash = await bcrypt.hash(req.body.password, 10);

    const user = new User({ ...req.body, password: passwordHash });
    await user.save();

    res.status(201).json({ message: "User created" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const err = "Incorrect email or password !";
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(401).json({ message: err });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};
