"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const productController_1 = require("../controller/productController");
const multer_1 = require("../utils/multer");
const verifyToken_1 = require("../utils/verifyToken");
router.route("/create-product/:catId").post(verifyToken_1.verifyToken, multer_1.upload, productController_1.createProduct);
exports.default = router;
