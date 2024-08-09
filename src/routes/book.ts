import { Router } from "express";
import {
  getBooks,
  createBook,
  updateBook,
  deleteBook,
  getBooksById,
} from "../controller/book";
import { auth } from "../middleware/auth";
import { uploadImg } from "../middleware/multer-config";

const router = Router();

router.get("/", getBooks);
router.get("/:id", getBooksById);
router.post("/", auth, uploadImg, createBook);
router.put("/:id", auth, uploadImg, updateBook);
router.delete("/:id", auth, deleteBook);

export default router;
