import { Request, Response } from "express";

export const getBooks = (req: Request, res: Response) => {
  console.log("ok");
  try {
    res.status(200).json({ message: "ok" });
  } catch (error) {
    res.status(500).json({ error: "error" });
  }
};
