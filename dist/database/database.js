"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const onlineUrl = "mongodb+srv://babjamiu:Dz6BQSUjsR5u7333@cluster0.brpp1g9.mongodb.net/e-commerce";
const LocalUrl = "mongodb://0.0.0.0:27017/e-commerce";
mongoose_1.default.connect(onlineUrl).then(() => {
    console.log("server connected successfully");
}).catch((error) => {
    console.log("an error occured", error);
});
exports.default = mongoose_1.default;
