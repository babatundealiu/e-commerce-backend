"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path_1.default.join(__dirname, "../uploads"));
    },
    fileName: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, file.fileName + "-" + uniqueSuffix + path_1.default.extname(file.originalname));
    },
});
exports.upload = (0, multer_1.default)({ storage: storage }).single("img");
// type DestinationCallback = (error: Error | null, destination: string)=>void;
// type FileNameCallback = (error: Error | null, fileName: string)=>void;
// const productStorage = multer.diskStorage({
//     destination: function (req: Request, file: any, cb:DestinationCallback){
//         cb(null, path.join(__dirname, "../uploads"));
//     },
//     fileName: function (req: Request, file: any, cb:FileNameCallback){
//         const uniqueSuffix =Date.now()+ "-" + Math.round(Math.random()*1e9);
//         cb(
//             null, 
//             file.fileName + "-" + uniqueSuffix + path.extname(file.originalname)
//         );
//     },
// });
// export const productImg = multer({productStorage: productStorage}).single("img");
