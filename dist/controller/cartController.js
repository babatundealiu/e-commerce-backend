"use strict";
// import express, {Application, Request, Response, NextFunction, application} from "express";
// import userModel from "../model/userModel";
// import userProfile from "../model/userProfile";
// import catemodel from "../model/category"
// import cloudinary from "../utils/cloudinary";
// import slugify from "slugify";
// import cartModel from "../model/cartModel";
// import productModel from "../model/productModel";
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
exports.removeFromCart = exports.addToCart = void 0;
const userModel_1 = __importDefault(require("../model/userModel"));
const cartModel_1 = __importDefault(require("../model/cartModel"));
const productModel_1 = __importDefault(require("../model/productModel"));
const addToCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const { userId } = req.params;
        const getUser = yield userModel_1.default.findOne({ _id: userId });
        // console.log(getUser)
        const getProduct = yield productModel_1.default.findOne({ _id: productId });
        // console.log(getProduct)
        const checkUserCart = yield cartModel_1.default.findOne({ user: userId });
        if (checkUserCart) {
            const findIndexProduct = checkUserCart.cartItem.findIndex((item) => { var _a; return (_a = item === null || item === void 0 ? void 0 : item.product) === null || _a === void 0 ? void 0 : _a.equals(productId); });
            console.log("kjfnkj", findIndexProduct);
            if (findIndexProduct > -1) {
                const userSelectPr = checkUserCart.cartItem[findIndexProduct];
                console.log(userSelectPr);
                userSelectPr.quantity += 1;
                checkUserCart.bill = checkUserCart.cartItem.reduce((acc, cur) => {
                    console.log(cur);
                    return acc + cur.quantity * cur.price;
                }, 0);
                checkUserCart.cartItem[findIndexProduct] = userSelectPr;
                yield checkUserCart.save();
                return res.status(201).json({
                    message: 'you have ordered before',
                    result: checkUserCart
                });
            }
            else {
                checkUserCart.cartItem.push({ product: getProduct === null || getProduct === void 0 ? void 0 : getProduct._id, quantity: 1, price: getProduct === null || getProduct === void 0 ? void 0 : getProduct.price });
                checkUserCart.bill = checkUserCart.cartItem.reduce((acc, cur) => {
                    console.log(cur);
                    return acc + cur.quantity * cur.price;
                }, 0);
                yield checkUserCart.save();
                return res.status(201).json({
                    message: "new product added",
                    result: checkUserCart
                });
            }
        }
        else {
            const dataCart = yield cartModel_1.default.create({
                user: getUser === null || getUser === void 0 ? void 0 : getUser._id,
                cartItem: [{ product: getProduct === null || getProduct === void 0 ? void 0 : getProduct._id, quantity: 1, price: getProduct === null || getProduct === void 0 ? void 0 : getProduct.price }],
                bill: 1 * getProduct.price
            });
            return res.status(201).json({
                message: "successfully added to cart",
                result: dataCart
            });
        }
    }
    catch (error) {
        return res.status(401).json({
            message: "a server error has occured",
            error: error.message
        });
    }
});
exports.addToCart = addToCart;
const removeFromCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const productId = req.query.productId;
        console.log(productId);
        // const a = "world"
        // console.log(`hello ${a}`)
        const checkUserCart = yield cartModel_1.default.findOne({ user: userId });
        console.log(checkUserCart);
        const position = checkUserCart === null || checkUserCart === void 0 ? void 0 : checkUserCart.cartItem.findIndex((item) => item.product == productId);
        console.log(position);
        // if (checkUserCart)
        if (position > -1) {
            const item = checkUserCart === null || checkUserCart === void 0 ? void 0 : checkUserCart.cartItem[position];
            if (item.quantity > 1) {
                item.quantity -= 1;
                checkUserCart.bill -= item.price;
            }
            else {
                checkUserCart.bill -= item.quantity * item.price;
                if (checkUserCart.bill < 0) {
                    checkUserCart.bill = 0;
                }
                checkUserCart === null || checkUserCart === void 0 ? void 0 : checkUserCart.cartItem.splice(position, 1);
            }
            checkUserCart.bill = checkUserCart.cartItem.reduce((acc, cur) => {
                console.log(cur);
                return acc + cur.quantity * cur.price;
            }, 0);
            yield checkUserCart.save();
            return res.status(201).json({
                message: "succesfully removed from cart",
                //  result:dataCart
            });
        }
        else {
            return res.status(401).json({
                message: "you dont have any items",
            });
        }
    }
    catch (error) {
        return res.status(400).json({
            message: error.message,
            error: error.message
        });
    }
});
exports.removeFromCart = removeFromCart;
