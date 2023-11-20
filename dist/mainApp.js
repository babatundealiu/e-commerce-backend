"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainApp = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const userRouter_1 = __importDefault(require("./route/userRouter"));
const profile_1 = __importDefault(require("./route/profile"));
const productRouter_1 = __importDefault(require("./route/productRouter"));
const cartcatRouter_1 = __importDefault(require("./route/cartcatRouter"));
const categoryRouter_1 = __importDefault(require("./route/categoryRouter"));
const orderRouter_1 = __importDefault(require("./route/orderRouter"));
const userController_1 = require("./controller/userController");
const mainApp = (app) => {
    app.use((0, cors_1.default)()).use(express_1.default.json())
        .use("/api/v1", userRouter_1.default)
        .use("/api/v1", profile_1.default)
        .use("/api/v1", productRouter_1.default)
        .use('/api/v1', cartcatRouter_1.default)
        .use("/api/v1", categoryRouter_1.default)
        .use("/api/v1", orderRouter_1.default)
        .use("api/v1", userController_1.verifyUser)
        .get("/page/data/", (req, res) => {
        const id = req.params.id;
        const userName = "kome";
        res.render("verifyAccounts", { userName, id });
    })
        .get("/api", (req, res) => {
        res.status(200).json({
            message: "app is ready"
        });
    });
};
exports.mainApp = mainApp;
