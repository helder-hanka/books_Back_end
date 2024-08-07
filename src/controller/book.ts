import { Request, Response } from "express";
import Book from "../models/Book";
import { get } from "http";

export const getBooks = (req: Request, res: Response) => {
  console.log("ok");
  try {
    res.status(200).json({ message: "ok" });
  } catch (error) {
    res.status(500).json({ error: "error" });
  }
};

export const createBook = async (req: Request, res: Response) => {
  const imgFile = req.file;
  try {
    if (!imgFile) {
      throw new Error("No image provided");
    }
    const book = new Book({
      ...req.body,
      UserId: req.userId,
      imageUrl: `${req.protocol}://${req.get("host")}/images/${
        req.file?.filename
      }`,
    });
    await book.save();
    res.status(201).json({ message: "Product created successfully!" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
