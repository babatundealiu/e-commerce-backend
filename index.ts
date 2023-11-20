import express, { Application } from "express";
const port:Number=8978; 

import "./database/database";
import {mainApp} from "./mainApp";

const app:Application=express()
mainApp(app)

app.set("view engine", "ejs")


const server=app.listen(port,()=>{
    console.log("app is listening on", port)

})
process.on("uncaughtException", (error:Error)=>{
    console.log("an error just occured")
    console.log(error)
    process.exit(1)
})
process.on("unhandledRejection", (reason:any)=>{
    console.log("an unhandledRejection happened")
    server.close(()=>{
        process.exit(1)
    })
    
})

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