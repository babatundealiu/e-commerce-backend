"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProfile = exports.editImage = exports.editProfile = void 0;
const userProfile_1 = __importDefault(require("../model/userProfile"));
const cloudinary_1 = __importDefault(require("../utils/cloudinary"));
const editProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, gender } = req.body;
        const { userId } = req.params;
        const getUpdate = yield userProfile_1.default.findByIdAndUpdate(userId, { firstName, lastName, gender }, { new: true });
        return res.status(200).json({
            message: "updated successfully",
            data: getUpdate
        });
    }
    catch (error) {
        return res.status(402).json({
            message: "failed to update profile",
            error: error.message
        });
    }
});
exports.editProfile = editProfile;
const editImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        console.log(req.file);
        const imageUrl = yield cloudinary_1.default.uploader.upload(req.file.path);
        console.log("nkfjkl", imageUrl);
        const updateImage = yield userProfile_1.default.findByIdAndUpdate(userId, {
            avatar: imageUrl.secure_url
        }, { new: true });
        return res.status(201).json({
            message: "image updated successfuly",
            data: updateImage
        });
    }
    catch (error) {
        return res.status(400).json({
            message: "an error occurred"
        });
    }
});
exports.editImage = editImage;
const deleteProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const deleted = yield userProfile_1.default.findByIdAndDelete(userId);
        return res.status(401).json({
            message: "deleted successfully"
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "deleted successfully"
        });
    }
});
exports.deleteProfile = deleteProfile;
