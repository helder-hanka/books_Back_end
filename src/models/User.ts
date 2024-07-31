import { Schema, model } from "mongoose";

interface IUser {
  email: string;
  password: string;
}

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

export default model("User", UserSchema);
