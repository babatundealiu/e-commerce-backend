"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const catSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
    },
    slug: {
        type: String,
    },
    parent: {
        type: String,
    },
    products: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "products"
    },
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "users"
    }, createdAt: {
        type: String || Number,
        default: new Date
    }
});
exports.default = mongoose_1.default.model("category", catSchema);
