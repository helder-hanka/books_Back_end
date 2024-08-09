import { Request, Response } from "express";
import Book from "../models/Book";
import { clearImg } from "../util/fs";

export const getBooks = async (req: Request, res: Response) => {
  try {
    const books = await Book.find();
    res.status(200).json({ books: books });
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

export const updateBook = async (req: Request, res: Response) => {
  const { params } = req.body;
  const paramId = req.params.id;
  const uid = req.userId;
  const imgFile = req.file?.filename;
  let imageUrl = req.body.imageUrl;
  try {
    if (imgFile) {
      imageUrl = `${req.protocol}://${req.get("host")}/images/${imgFile}`;
    }
    if (!imageUrl) {
      throw new Error("No image provided");
    }

    const book = await Book.findById(paramId);

    if (book?.UserId != uid) {
      throw new Error("Not authorized");
    }

    if (!book) {
      throw new Error("Product not found");
    }

    if (imgFile) {
      clearImg(`images/${book.imageUrl.split("/images/")[1]}`);
    }

    await Book.findByIdAndUpdate(paramId, {
      ...req.body,
      imageUrl: imageUrl,
    });
    res.status(200).json({ message: "Product updated" });
  } catch (error) {
    res.status(500).json(error);
  }
};
