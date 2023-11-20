"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = require("../utils/multer");
const profileControler_1 = require("../controller/profileControler");
const router = express_1.default.Router();
router.route("/edit-product/:productId").put(profileControler_1.editProfile);
router.route("/edit-image/:productId").put(multer_1.upload, profileControler_1.editImage);
exports.default = router;
