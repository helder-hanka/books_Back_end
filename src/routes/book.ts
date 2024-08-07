import { Router } from "express";
import { getBooks } from "../controller/book";
import { createBook } from "../controller/book";
import { auth } from "../middleware/auth";
import { uploadImg } from "../middleware/multer-config";

const router = Router();

router.get("/", getBooks);
router.post("/", auth, uploadImg, createBook);

export default router;
