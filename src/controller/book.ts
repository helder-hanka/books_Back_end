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

export const getBooksById = async (req: Request, res: Response) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      throw new Error("Product not found");
    }

    res.status(200).json({ book: book });
  } catch (error) {
    res.status(500).json(error);
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

export const deleteBook = async (req: Request, res: Response) => {
  const uid = req.userId;
  const productId = req.params.id;
  try {
    const product = await Book.findOne({ _id: productId });

    if (!product) {
      console.log("Product not found");
      throw new Error("Product not found");
    }
    if (uid !== product?.UserId.toString()) {
      console.log("Not authorized");
      throw new Error("Not authorized");
    }
    await Book.deleteOne({ _id: productId });
    res.status(200).json({ message: "Book deleted" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
