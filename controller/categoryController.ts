import express, {Application, Request, Response, NextFunction, application} from "express";
import userModel from "../model/userModel";
import userProfile from "../model/userProfile";
import catemodel from "../model/category"
import cloudinary from "../utils/cloudinary";
import slugify from "slugify";
// import { getSingleUser } from "./userController";


function generateCategoryId(){
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const length = 6;
	let randomId = "";
	for (let i = 0; i < length; i++) {
		randomId += characters.charAt(
			Math.floor(Math.random() * characters.length),
		);
	}
	return randomId;
}
export const createCat = async (req:Request, res:Response)=>{
    try {
        const {name, parent}=req.body
        if (!name)
        {
            return res.status(401).json({
                message: "name cannot be empty"
            })
        }
        const {userId} = req.params
        console.log(userId)
        const getUserDetails = await userModel.findOne({_id:userId})
        console.log(getUserDetails)
        
        const dataCate:any = await catemodel.create({
            name,
            parent,
            slug: ` ${slugify(name)} - ${generateCategoryId()}`
        })
        dataCate.user = getUserDetails
        dataCate.save

        return res.status(201).json({
            message: dataCate
        })
    } catch (error:any) {
        return res.status(404).json({
            message: error.message,
            error: error.message
        })
    }
}

export const getAllCat = async (req:Request, res:Response):Promise<Response>=>{
    try {
        const getSingle = await catemodel.find()
        return res.status(201).json({
            message: "All categories",
            data: getSingle
        })
    } catch (error:any) {
        return res.status(404).json({
            message: "a server or inetrnet error"
    
        })
    }
}
 export const getOneCat =  async (req:Request, res:Response):Promise<Response>=>{
    try {
        const {Id}=req.params
        const getOne = await catemodel.findById(Id)

        return res.status(201).json({
            message: "single category",
            result: getOne
        })
    } catch (error:any) {
        return res.status(401).json({
            message: error.message

        })
    }
 }
export const deleteAcategory = async (req:Request, res:Response):Promise<Response>=>{
    try {
        const {deleteId}=req.params
        const delet = await catemodel.findByIdAndDelete(deleteId)
            return res.status(401).json({
                message: "deleted successfuly"
            })
    } catch (error:any) {
        return res.status(401).json({
            message: "Internet or server error"
        })
    }
}