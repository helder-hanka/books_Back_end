import { Request, Response } from "express";
import Book from "../models/Book";

export const getBooks = (req: Request, res: Response) => {
  console.log("ok");
  try {
    res.status(200).json({ message: "ok" });
  } catch (error) {
    res.status(500).json({ error: "error" });
  }
};

export const createBook = async (req: Request, res: Response) => {
  const Uid = "66aa5fcfbb18321a4e028fcd";
  try {
    const book = new Book({ ...req.body, UserId: Uid });
    const a = await book.save();
    res.status(201).json(a);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
