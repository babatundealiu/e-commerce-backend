"use strict";
// import mongoose from "mongoose"
// interface user{
//     fullname:string,
//     email: string,
//     password: string,
//     profile:{}
// }
// interface iUser extends user, mongoose.Document{ }
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const userSchema = new mongoose.Schema({
//     fullname:{
//         type: String,
//     },
//     email:
//     {
//         type: String,
//         unique:true
//     },
//     password:
//     {
//         type: String,
//     },
//     profile: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "profiles"
//     }
// },{
//     timestamps:true
// })
// export default mongoose.model<iUser>("users", userSchema)
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    fullname: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    verify: {
        type: Boolean,
        default: false,
    },
    profile: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "profiles"
    },
    role: {
        type: String,
        enum: ["user", "admin", "superadmin"],
        default: "user"
    }
}, { timestamps: true });
exports.default = mongoose_1.default.model("users", userSchema);
