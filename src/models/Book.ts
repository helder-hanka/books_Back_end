import { Schema, model, Document } from "mongoose";

interface IRating {
  userId: Schema.Types.ObjectId;
  grade: number;
}

export interface IBook extends Document {
  title: string;
  author: string;
  imageUrl: string;
  genre: string;
  ratings: IRating[];
  averageRating: number;
  User: Schema.Types.ObjectId;
}

const ratingSchema = new Schema<IRating>({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  grade: {
    type: Number,
    required: true,
  },
});

const BookSchema = new Schema<IBook>({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  ratings: {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    grade: {
      type: Number,
      required: true,
    },
  },
  averageRating: {
    type: Number,
    required: true,
  },
  User: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

export default model<IBook>("Book", BookSchema);
