import { Router } from "express";
import { getProfile, uploadAvatar } from "../controllers/user";
const router = Router();

router.route("/profile").get(getProfile);
router.route("/upload-avatar").post(uploadAvatar);

export default router;
