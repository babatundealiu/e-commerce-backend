import {Request} from "express";
import multer from "multer";
import path from "path";


type destinationCallback = (error: Error | null, destination: string)=>void;
type fileNameCallback = (error: Error | null, fileName: string)=>void;

const storage = multer.diskStorage({

    destination: function (req: Request, file: any, cb:destinationCallback){
        cb(null, path.join(__dirname, "../uploads"));
    },
    fileName: function (req: Request, file: any, cb:fileNameCallback){
        const uniqueSuffix =Date.now()+ "-" + Math.round(Math.random()*1e9);
        cb(
            null, 
            file.fileName + "-" + uniqueSuffix + path.extname(file.originalname)
        );
    },
});

export const upload = multer({storage: storage}).single("img");

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
