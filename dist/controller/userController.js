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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyUser = exports.login = exports.getSingleUser = exports.registration = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const userModel_1 = __importDefault(require("../model/userModel"));
const userProfile_1 = __importDefault(require("../model/userProfile"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const transporter = nodemailer_1.default.createTransport({
    host: "smtp.forwardemail.net",
    service: "gmail",
    port: 587,
    secure: true,
    auth: {
        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
        user: "jamiubaba16@gmail.com",
        pass: "aquw dgsq rart hkst",
    },
});
const registration = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fullname, email, password, role } = req.body;
        if (!fullname || !email || !password) {
            return res.status(401).json({
                message: "All fields are required"
            });
        }
        const checkEmail = yield userModel_1.default.findOne({ email: email });
        console.log(checkEmail);
        if (checkEmail) {
            return res.status(401).json({
                message: "email already exists"
            });
        }
        const salt = yield bcrypt_1.default.genSalt(10);
        const hashedpassword = yield bcrypt_1.default.hash(password, salt);
        const createData = yield userModel_1.default.create({
            fullname,
            email,
            password: hashedpassword,
            role
        });
        const createProfile = yield userProfile_1.default.create({
            _id: createData._id,
            firstname: "",
            lastname: "",
            gender: "",
            avatar: ""
        });
        createData.profile = createProfile._id;
        createData.save();
        createProfile.user = createData._id;
        createProfile.save();
        let mailOption = {
            from: '"SpicyStore 👻" <foo@example.com>',
            to: email,
            subject: "welcome to SpicyStore ✔",
            text: "Hello world?",
            html: `<b>Hello Azolar please click this link its from yor friend? <a href="http://localhost:8978/api/v1/verify-account/${createData._id}">link </a> to verify your account</b>`, // html body
        };
        yield transporter.sendMail(mailOption, (error, info) => {
            if (error) {
                console.log("error sending mail", error);
            }
            else {
                console.log("email sent ", info.response);
            }
        });
        return res.status(201).json({
            message: "user created successfully",
            result: createData
        });
    }
    catch (error) {
        return res.status(401).json({
            message: "failed to register user",
            error: error.message
        });
    }
});
exports.registration = registration;
const getSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const getsing = await userModel.findById(req.params.id)
    try {
        const getsing = yield userModel_1.default.findById(req.params.id).populate({
            path: "profile",
            select: "firstname lastname gender avatar"
        });
        return res.status(201).json({
            message: "successful",
            data: getsing
        });
    }
    catch (error) {
        return res.status(401).json({
            message: "failed to get user",
            error: error.message
        });
    }
});
exports.getSingleUser = getSingleUser;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(401).json({
                message: "All fields are required"
            });
        }
        const checkEmail = yield userModel_1.default.findOne({ email: email });
        if (checkEmail) {
            const checkPassword = yield bcrypt_1.default.compare(password, checkEmail.password);
            if (checkPassword) {
                if (checkEmail.verify) {
                }
                const token = jsonwebtoken_1.default.sign({ _id: checkEmail._id, fullname: checkEmail.fullname }, "secretkey", { expiresIn: "3d" });
                const _a = checkEmail._doc, { Password, isActive } = _a, info = __rest(_a, ["Password", "isActive"]);
                const options = { expiresIn: "3d" };
                res.cookie("sessionId", token, options);
                return res.status(201).json({
                    message: "log in successfully",
                    data: { token, options }
                });
            }
            else {
                let mailOption = {
                    from: '"SpicyStore 👻" <foo@example.com>',
                    to: email,
                    subject: "welcome to SpicyStore ✔",
                    text: "Hello world?",
                    html: `<b>Hello Azolar please click this link its from yor friend? <a href="http://localhost:8978/api/v1/verify-account/${checkEmail._id}">link </a> to verify your account</b>`, // html body
                };
                yield transporter.sendMail(mailOption, (error, info) => {
                    if (error) {
                        console.log("error sending mail", error);
                    }
                    else {
                        console.log("email sent ", info.response);
                    }
                });
            }
        }
        else {
            return res.status(401).json({
                message: " incorrect password"
            });
        }
    }
    catch (error) {
        return res.status(401).json({
            message: "internet or server error"
        });
    }
});
exports.login = login;
const verifyUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel_1.default.findById(req.params.id);
        console.log(user);
        const verifyData = yield userModel_1.default.findByIdAndUpdate(req.params.id, {
            verify: true
        }, { new: true });
        return res.status(201).json({
            message: "account has been verified, process to login"
        });
    }
    catch (error) {
        return res.status(401).json({
            message: error.message
        });
    }
});
exports.verifyUser = verifyUser;
