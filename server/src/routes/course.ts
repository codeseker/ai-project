import { Router } from "express";
import { create } from "../controllers/course";

const router = Router();


router.route("/create").post(create);


export default router;
