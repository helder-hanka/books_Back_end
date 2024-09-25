import { Request, Response } from "express";
import Book from "../models/Book";
import { clearImg } from "../util/fs";

export const getBooks = async (req: Request, res: Response) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
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

    res.status(200).json(book);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const createBook = async (req: Request, res: Response) => {
  const body = JSON.parse(req.body.book);
  const imgFile = req.file;
  try {
    if (!imgFile) {
      throw new Error("No image provided");
    }
    const book = new Book({
      ...body,
      userId: req.userId,
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

    if (book?.userId != uid) {
      throw new Error("Not authorized");
    }

    if (!book) {
      throw new Error("Product not found");
    }

    await Book.findByIdAndUpdate(paramId, {
      ...req.body,
      imageUrl: imageUrl,
    });

    if (imgFile) {
      clearImg(`images/${book.imageUrl.split("/images/")[1]}`);
    }

    res.status(200).json({ message: "Product updated" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  const uid = req.userId;
  const bookId = req.params.id;
  try {
    const book = await Book.findOne({ _id: bookId });
    const imgBook = book?.imageUrl;
    if (!book) {
      throw new Error("book not found");
    }
    if (uid !== book?.userId.toString()) {
      throw new Error("Not authorized");
    }
    await Book.deleteOne({ _id: bookId });
    clearImg(`images/${imgBook?.split("/images/")[1]}`);
    res.status(200).json({ message: "Book deleted" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const averageRating = async (req: Request, res: Response) => {
  const uid = req.userId;
  const bookId = req.params.id;
  const { grade } = req.body;
  try {
    if (grade < 1 || grade > 5) {
      throw new Error("The grade must be between 1 and 5");
    }
    const book = await Book.findById(bookId);
    if (!book) {
      throw new Error("Book not found");
    }

    const isUserInRating = book.ratings.some(
      (rating) => rating.userId.toString() === uid
    );
    if (isUserInRating) {
      throw new Error("Not authorized");
    }

    await Book.findByIdAndUpdate(bookId, {
      $push: { ratings: { userId: uid, grade } },
    });

    const bookAverageRating = await Book.findByIdAndUpdate(
      bookId,
      [
        {
          $set: {
            averageRating: { $avg: "$ratings.grade" },
          },
        },
      ],
      { new: true }
    );

    res.status(201).json({
      message: "Rating added and average updated successfully",
      book: bookAverageRating,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const bestrating = async (req: Request, res: Response) => {
  try {
    const books = await Book.find().sort({ averageRating: -1 }).limit(3);
    res.status(201).json(books);
  } catch (error) {
    res.status(500).json(error);
  }
};
