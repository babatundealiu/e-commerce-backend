"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cartController_1 = require("../controller/cartController");
const router = express_1.default.Router();
router.route("/cart-items:userId/:productId").post(cartController_1.addToCart);
router.route("/delete-item/:userId").delete(cartController_1.removeFromCart);
exports.default = router;
