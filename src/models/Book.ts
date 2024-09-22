import { Schema, model, Document } from "mongoose";

interface IRating {
  userId: Schema.Types.ObjectId;
  grade: number;
}

export interface IBook extends Document {
  title: string;
  author: string;
  imageUrl: string;
  year: number;
  genre: string;
  ratings: IRating[];
  averageRating: number;
  UserId: Schema.Types.ObjectId;
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

const BookSchema = new Schema<IBook>(
  {
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
    year: { type: Number, required: true },
    genre: {
      type: String,
      required: true,
    },
    ratings: [ratingSchema],
    averageRating: {
      type: Number,
      required: false,
    },
    UserId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default model<IBook>("Book", BookSchema);
