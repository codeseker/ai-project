import { Router } from "express";
import { create, updateLesson } from "../controllers/lesson";

const router = Router();

router.route("/create").post(create);
router.route("/update").put(updateLesson);

export default router;
