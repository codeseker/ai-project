import { Router } from "express";
import { register } from "../controllers/auth";
import { registerValidation } from "../validations/auth";
const router = Router();


router.route("/register").post(registerValidation, register);

export default router;
