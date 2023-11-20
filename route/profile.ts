import express from "express";
import {upload} from "../utils/multer";
import {editProfile, editImage } from "../controller/profileControler";

const router = express.Router()

router.route("/edit-product/:productId").put(editProfile)
router.route("/edit-image/:productId").put(upload, editImage)

export default router;