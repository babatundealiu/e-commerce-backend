"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const cartSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "users"
    },
    cartItem: [{
            products: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "products", required: true },
            quantity: { type: Number, default: 1, min: 1 },
            price: { type: Number }
        }],
    bills: {
        type: Number,
        required: true,
        default: 0
    },
    createdAt: {
        type: String || Number,
        default: new Date
    }
});
exports.default = mongoose_1.default.model("orders", cartSchema);
