import { Schema, model, Document } from "mongoose";

<<<<<<< HEAD
// interface IRating {
//   userId: Schema.Types.ObjectId;
//   grade: number;
// }
=======
interface IRating {
  userId: Schema.Types.ObjectId;
  grade: number;
}
>>>>>>> b4869e9 (Define Book modéle with TS)

export interface IBook extends Document {
  title: string;
  author: string;
  imageUrl: string;
<<<<<<< HEAD
  year: number;
  genre: string;
  // ratings: IRating[];
  averageRating: number;
  UserId: Schema.Types.ObjectId;
}

// const ratingSchema = new Schema<IRating>({
//   userId: {
//     type: Schema.Types.ObjectId,
//     required: true,
//   },
//   grade: {
//     type: Number,
//     required: true,
//   },
// });

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
    // ratings: [ratingSchema],
    averageRating: {
      type: Number,
      required: true,
    },
    UserId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);
=======
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
>>>>>>> b4869e9 (Define Book modéle with TS)

export default model<IBook>("Book", BookSchema);
