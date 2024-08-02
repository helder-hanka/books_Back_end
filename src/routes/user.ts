import { Router } from "express";
import { signup, login } from "../controller/user";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);

export default router;
