import express, {Application, application} from "express";
import cors from "cors";
import userRoute from "./route/userRouter";
import profileRouter from "./route/profile";
import productRouter from "./route/productRouter"
import cartcatRouter from './route/cartcatRouter'
import categoryRouter from "./route/categoryRouter";
import checkOut from "./route/orderRouter"
import { verifyUser } from "./controller/userController";

export const mainApp = (app:Application)=>{

    app.use(cors()).use(express.json())
    .use("/api/v1", userRoute)
    .use("/api/v1", profileRouter)
    .use("/api/v1", productRouter)
    .use('/api/v1', cartcatRouter)
    .use("/api/v1", categoryRouter)
    .use("/api/v1", checkOut)
    .use("api/v1", verifyUser)
    .get("/page/data/", (req:any, res:any)=>{
        const id  = req.params.id
        const userName = "kome"
        res.render("verifyAccounts", {userName, id})
    })
    .get("/api", (req:any, res:any)=>{
        res.status(200).json({
            message: "app is ready"
        })
    })
}
