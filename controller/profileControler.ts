import express, {Application, Request, Response, NextFunction, application} from "express";
import userProfile from "../model/userProfile";
import userModel from "../model/userModel";
import cloudinary from "../utils/cloudinary";


export const editProfile = async (req: Request, res:Response):Promise<Response>=>{
    try {
        const {firstName, lastName, gender}=req.body

        const {userId}=req.params
        const getUpdate = await userProfile.findByIdAndUpdate(
            userId, 
            { firstName, lastName, gender },
            {new: true})
            return res.status(200).json({
                message: "updated successfully",
                data: getUpdate
            })

    } catch (error:any) {
        return res.status(402).json({
            message: "failed to update profile",
            error: error.message
        })
    }
}
export const editImage = async (req:any, res:Response):Promise<Response>=>{
    try {
        const {userId}=req.params

        console.log(req.file)
        const imageUrl = await cloudinary.uploader.upload(req.file.path)
        console.log("nkfjkl", imageUrl)
        const updateImage = await userProfile.findByIdAndUpdate(
            userId,
            {
                avatar: imageUrl.secure_url
            },
            {new:true}
            )
            return res.status(201).json({
                message: "image updated successfuly",
                data: updateImage
            })
    } catch (error)
    {
        return res.status(400).json({
            message: "an error occurred"
        })
    }
}
export const deleteProfile = async (req:Request, res:Response):Promise<Response>=>{
    try {
        const {userId}=req.params
        const deleted = await userProfile.findByIdAndDelete(userId)
        return res.status(401).json({
            message: "deleted successfully"
        })
    } catch (error) {
        return res.status(404).json({
            message:"deleted successfully"
        })
    }
}