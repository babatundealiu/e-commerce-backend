"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controller/userController");
const router = express_1.default.Router();
router.route("/reg-user").post(userController_1.registration);
router.route("/login-user").post(userController_1.login);
// router.route("/logout-user").post(logout)
router.route("/verify-account/:id").get(userController_1.verifyUser);
router.route("/single-user/:id").get(userController_1.getSingleUser);
exports.default = router;
