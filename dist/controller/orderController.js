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
exports.checkOut = void 0;
const cartModel_1 = __importDefault(require("../model/cartModel"));
const flutterwave_node_v3_1 = __importDefault(require("flutterwave-node-v3"));
const uuid_1 = require("uuid");
const flw = new flutterwave_node_v3_1.default("FLWPUBK_TEST-19f6df7aa276e1f45f69e0e779a7b921-X", "FLWSECK_TEST-e8f881fc39ac6c79f89f7701e5994f2d-X");
const checkOut = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const findUserCart = yield cartModel_1.default.findOne({ user: userId });
        console.log(findUserCart);
        const { card_number, cvv, expiry_month, expiry_year, amount, fullname } = req.body;
        const payload = {
            // "card_number": "5531886652142950",
            // "cvv": "564",
            // "expiry_month": "09",
            "card_number": card_number,
            "cvv": cvv,
            "expiry_month": expiry_month,
            "expiry_year": expiry_year,
            "currency": "NGN",
            "amount": findUserCart === null || findUserCart === void 0 ? void 0 : findUserCart.bills,
            "redirect_url": "https://www.google.com",
            "fullname": fullname,
            "email": "developers@flutterwavego.com",
            "phone_number": "09000000000",
            "enckey": "FLWSECK_TESTf7418d790540",
            "tx_ref": (0, uuid_1.v4)()
        };
        const response = yield flw.Charge.card(payload);
        console.log(response);
        // if (response.meta.authorization.mode === "pin")
        if (response.meta.authorization.mode === 'pin') {
            let payload2 = payload;
            payload2.authorization = {
                "mode": "pin",
                // "fields": [
                //     "pin"
                // ],
                "pin": 3310
            };
            const reCallCharge = yield flw.Charge.card(payload2);
            const callValidate = yield flw.Charge.validate({
                "otp": "12345",
                "flw_ref": reCallCharge.data.flw_ref
            });
            console.log(callValidate);
            if (callValidate.status === "success") {
                const createOrder = yield cartModel_1.default.create({
                    user: findUserCart === null || findUserCart === void 0 ? void 0 : findUserCart.user,
                    orderItems: findUserCart === null || findUserCart === void 0 ? void 0 : findUserCart.cartItem,
                    bills: findUserCart === null || findUserCart === void 0 ? void 0 : findUserCart.bills
                });
            }
            yield cartModel_1.default.findByIdAndDelete({ _id: findUserCart === null || findUserCart === void 0 ? void 0 : findUserCart._id });
            return res.status(201).json({
                message: "payment sucessful",
                data: "check your order"
            });
        }
        else {
            return res.status(401).json({
                message: "error in making payment",
            });
        }
    }
    catch (error) {
        return res.status(400).json({
            message: "failed",
            error: error.message
        });
    }
});
exports.checkOut = checkOut;
