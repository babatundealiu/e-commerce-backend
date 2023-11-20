"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const port = 8978;
require("./database/database");
const mainApp_1 = require("./mainApp");
const app = (0, express_1.default)();
(0, mainApp_1.mainApp)(app);
app.set("view engine", "ejs");
const server = app.listen(port, () => {
    console.log("app is listening on", port);
});
process.on("uncaughtException", (error) => {
    console.log("an error just occured");
    console.log(error);
    process.exit(1);
});
process.on("unhandledRejection", (reason) => {
    console.log("an unhandledRejection happened");
    server.close(() => {
        process.exit(1);
    });
});
// import express, {Application, Request, Response} from "express"
// const port:Number= 9090
// import {mainApp} from "./mainApp"
// const app:Application= express()
// const server= app.listen(port, ()=>{
//     console.log("app is listening", port)
// })
// process.on("uncaughtException", (error:any)=>{
//     console.log("an error has occured")
//     console.log(error)
//     process.exit(1)
// })
// process.on("unhandledRejection", (reason:any)=>{
//     console.log("an unhandled rejection has happened")
//     console.log(reason)
//     server.close(()=>{
//         process.exit(1)
//     })
// })
