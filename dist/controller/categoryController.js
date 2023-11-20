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
exports.deleteAcategory = exports.getOneCat = exports.getAllCat = exports.createCat = void 0;
const userModel_1 = __importDefault(require("../model/userModel"));
const category_1 = __importDefault(require("../model/category"));
const slugify_1 = __importDefault(require("slugify"));
// import { getSingleUser } from "./userController";
function generateCategoryId() {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const length = 6;
    let randomId = "";
    for (let i = 0; i < length; i++) {
        randomId += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return randomId;
}
const createCat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, parent } = req.body;
        if (!name) {
            return res.status(401).json({
                message: "name cannot be empty"
            });
        }
        const { userId } = req.params;
        console.log(userId);
        const getUserDetails = yield userModel_1.default.findOne({ _id: userId });
        console.log(getUserDetails);
        const dataCate = yield category_1.default.create({
            name,
            parent,
            slug: ` ${(0, slugify_1.default)(name)} - ${generateCategoryId()}`
        });
        dataCate.user = getUserDetails;
        dataCate.save;
        return res.status(201).json({
            message: dataCate
        });
    }
    catch (error) {
        return res.status(404).json({
            message: error.message,
            error: error.message
        });
    }
});
exports.createCat = createCat;
const getAllCat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getSingle = yield category_1.default.find();
        return res.status(201).json({
            message: "All categories",
            data: getSingle
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "a server or inetrnet error"
        });
    }
});
exports.getAllCat = getAllCat;
const getOneCat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Id } = req.params;
        const getOne = yield category_1.default.findById(Id);
        return res.status(201).json({
            message: "single category",
            result: getOne
        });
    }
    catch (error) {
        return res.status(401).json({
            message: error.message
        });
    }
});
exports.getOneCat = getOneCat;
const deleteAcategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { deleteId } = req.params;
        const delet = yield category_1.default.findByIdAndDelete(deleteId);
        return res.status(401).json({
            message: "deleted successfuly"
        });
    }
    catch (error) {
        return res.status(401).json({
            message: "Internet or server error"
        });
    }
});
exports.deleteAcategory = deleteAcategory;
