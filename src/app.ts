import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import book from "./routes/book";
import user from "./routes/user";
import path from "path";

dotenv.config();
const MONGODB_URI = process.env.MONGODB_URI;

mongoose
  .connect(`${MONGODB_URI}`)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

const app = express();
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});
app.use(express.json());
app.use(bodyParser.json());
app.use("/api/books", book);
app.use("/api/auth", user);
app.use("/images", express.static(path.join(__dirname, "../images")));

export default app;
