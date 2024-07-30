import { Router } from "express";
import { getBooks } from "../controller/book";

const router = Router();

router.get("/books", getBooks);

export default router;
