import { Router } from "express";
import { getBooks } from "../controller/book";
import { createBook } from "../controller/book";
import { auth } from "../middleware/auth";

const router = Router();

router.get("/", getBooks);
router.post("/", auth, createBook);

export default router;
