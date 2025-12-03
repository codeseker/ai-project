import { Router } from "express";
import { create, index, remove, show } from "../controllers/course";
import { createValidation, indexValidation } from "../validations/course";

const router = Router();

router.route("/all").get(indexValidation, index);
router.route("/create").post( create);
router.route("/:courseId/view").get(show);
router.route("/:courseId/delete").delete(remove);

export default router;
