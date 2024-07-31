import { Router } from "express";
import { getBooks } from "../controller/book";
import { createBook } from "../controller/book";

const router = Router();

router.get("/", getBooks);
router.post("/", createBook);

export default router;
