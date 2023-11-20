import express from "express";
const router = express.Router()

import {createProduct} from "../controller/productController";
import {upload} from "../utils/multer"
import {verifyToken} from '../utils/verifyToken'

router.route("/create-product/:catId").post(verifyToken, upload, createProduct)
export default router