"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = __importDefault(require("cloudinary"));
const cloudinary = cloudinary_1.default.v2;
cloudinary.config({
    cloud_name: "dclm7orqe",
    api_key: "463325467385432",
    api_secret: "wDjh9RzQaAEWx4JgXiu46a9coi0"
});
exports.default = cloudinary;
