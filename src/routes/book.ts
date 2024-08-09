import { Router } from "express";
import { getBooks, createBook, updateBook } from "../controller/book";
import { auth } from "../middleware/auth";
import { uploadImg } from "../middleware/multer-config";

const router = Router();

router.get("/", getBooks);
router.post("/", auth, uploadImg, createBook);
router.put("/:id", auth, uploadImg, updateBook);

export default router;
