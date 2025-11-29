import { Router } from "express";
import { getProfile, login, register } from "../controllers/auth";
import { loginValidation, registerValidation } from "../validations/auth";
import { authMiddleware } from "../middlewares/auth";
const router = Router();


router.route("/register").post(registerValidation, register);
router.route("/login").post(loginValidation ,login);
router.route("/profile").get(authMiddleware, getProfile);

export default router;
