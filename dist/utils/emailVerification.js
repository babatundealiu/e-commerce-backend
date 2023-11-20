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
exports.verifyUser = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const googleapis_1 = require("googleapis");
// const oAuth = new google.auth.OAuth2()
const GOOGLE_ID = "264723916771-558s08bcptmm1ns5a1rpi6lqc0b2c9f2.apps.googleusercontent.com";
const GOOGLE_SECRET = "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";
const GOOGLE_REDIRECT = "https://developers.google.com/oauthplayground";
const GOOGLE_REFRESH = "1//04nv2NGvSgwdQCgYIARAAGAQSNwF-L9Ir8N0Er6eY5Rak8Y7xQkM5-LXSdBqG6VDL0h7dunAhuQ8FedcZ_ApXv7pz8eB3-glH4Xw";
const oAuth = new googleapis_1.google.Auth.OAuth2(GOOGLE_ID, GOOGLE_SECRET, GOOGLE_REDIRECT);
oAuth.setCredentials({ refresh_token: GOOGLE_REFRESH });
const verifyUser = (name) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accessToken = yield oAuth.getAccessToken();
        const transporter = nodemailer_1.default.createTransporter({
            service: "gmail",
            port: 587,
            auth: {
                // TODO: replace `user` and `pass` values from <https://forwardemail.net>
                user: "jamiubaba16@gmail.com",
                pass: "aquw dgsq rart hkst",
            },
        });
    }
    catch (error) {
    }
    console.log("nnffhjfh");
    console.log(Error);
});
exports.verifyUser = verifyUser;
