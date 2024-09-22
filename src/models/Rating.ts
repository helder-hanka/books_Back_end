import { Schema, model, Document } from "mongoose";

interface IRating {
  userId: Schema.Types.ObjectId;
  grade: number;
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

export default model<IRating>("Rating", ratingSchema);
