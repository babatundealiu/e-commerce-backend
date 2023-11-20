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
exports.editProductImage = exports.createProduct = void 0;
const userModel_1 = __importDefault(require("../model/userModel"));
const userProfile_1 = __importDefault(require("../model/userProfile"));
const category_1 = __importDefault(require("../model/category"));
const cloudinary_1 = __importDefault(require("../utils/cloudinary"));
const productModel_1 = __importDefault(require("../model/productModel"));
const mongoose_1 = __importDefault(require("mongoose"));
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, desc, qty, price, category } = req.body;
        // if (!name || !desc || !qty || !price || !category)
        // {
        //     return res.status(401).json({
        //         message:"field cannot be empty"
        //     })
        // }
        const { catId } = req.params;
        // console.log(catId)
        const getCat = yield category_1.default.findOne({ _id: catId });
        // console.log(getCat)
        const { userId } = req.params;
        // console.log(userId)
        const getUser = yield userModel_1.default.findOne({ _id: userId });
        console.log(getUser);
        const imageUrl = yield cloudinary_1.default.uploader.upload(req.file.path);
        if (req.user.role === "admin") {
            const dataProduct = yield productModel_1.default.create({
                name,
                desc,
                price,
                category,
                qty,
                img: imageUrl.secure_url
            });
            getCat.product.push(new mongoose_1.default.Types.ObjectId(dataProduct._id));
            getCat.save();
            dataProduct.createdBy = getUser;
            dataProduct.save();
            return res.status(201).json({
                message: "product successfully created",
                data: dataProduct
            });
        }
        else {
            return res.status(201).json({
                message: "only admin can post"
            });
        }
    }
    catch (error) {
        return res.status(401).json({
            message: "failed to create product"
        });
    }
});
exports.createProduct = createProduct;
const editProductImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { prodId } = req.params;
        console.log(req.file);
        const imageUrl = yield cloudinary_1.default.uploader.upload(req.file.path);
        console.log("nkfjkl", imageUrl);
        const updateImage = yield userProfile_1.default.findByIdAndUpdate(prodId, {
            img: imageUrl.secure_url
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
exports.editProductImage = editProductImage;
// import slugify from "slugify";
