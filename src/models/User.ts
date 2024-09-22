import { Schema, model } from "mongoose";
import uV from "mongoose-unique-validator";

interface IUser {
  email: string;
  password: string;
}

const UserSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/\S+@\S+\.\S+/, "Email is invalid"],
    index: true,
  },
  password: { type: String, required: true },
});

UserSchema.plugin(uV, { message: "Error, expected {PATH} to be unique." });

export default model<IUser>("User", UserSchema);
