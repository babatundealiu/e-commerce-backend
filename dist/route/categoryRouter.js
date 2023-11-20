"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const categoryController_1 = require("../controller/categoryController");
const router = express_1.default.Router();
router.route("/reg-createCat/:userId").post(categoryController_1.createCat);
router.route("/all-cat").get(categoryController_1.getAllCat);
router.route("/getone/:Id").get(categoryController_1.getOneCat);
router.route("/delete-category/:id").delete(categoryController_1.deleteAcategory);
exports.default = router;
