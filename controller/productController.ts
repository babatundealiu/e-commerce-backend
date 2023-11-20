import express, {Application, Request, Response, NextFunction, application} from "express";
import userModel from "../model/userModel";
import userProfile from "../model/userProfile";
import catemodel from "../model/category"
import cloudinary from "../utils/cloudinary";
import productModel from "../model/productModel";
import mongoose from "mongoose"

export const createProduct = async (req:any, res:Response):Promise<Response>=>{
    try {
        const {name, desc, qty, price, category}= req.body
        // if (!name || !desc || !qty || !price || !category)
        // {
        //     return res.status(401).json({
        //         message:"field cannot be empty"
        //     })
        // }
        const {catId}= req.params
        // console.log(catId)
        const getCat:any = await catemodel.findOne({_id:catId})
        // console.log(getCat)

        const {userId}=req.params
        // console.log(userId)
        const getUser:any = await userModel.findOne({_id: userId})
        console.log(getUser)
        const imageUrl = await cloudinary.uploader.upload(req.file.path)
        
        if (req.user.role === "admin")
        {
            const dataProduct = await productModel.create({
                name,
                desc,
                price,
                category,
                qty,
                img: imageUrl.secure_url
            })
    
            getCat.product.push(new mongoose.Types.ObjectId (dataProduct._id))
            getCat.save()
            
            dataProduct.createdBy = getUser
            dataProduct.save()

            return res.status(201).json({
                message: "product successfully created",
                data: dataProduct
            })   
        } else 
        {
              return res.status(201).json({
               message:"only admin can post"
           }) 
        }


    } catch (error) {
        return res.status(401).json({
            message: "failed to create product"
        })
    }
}
export const editProductImage = async (req:any, res:Response):Promise<Response>=>{
    try {
        const {prodId}=req.params

        console.log(req.file)
        const imageUrl = await cloudinary.uploader.upload(req.file.path)
        console.log("nkfjkl", imageUrl)
        const updateImage = await userProfile.findByIdAndUpdate(
            prodId,
            {
                img: imageUrl.secure_url
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
// import slugify from "slugify";