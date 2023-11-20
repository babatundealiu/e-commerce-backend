
import express, {Application, Request, Response, NextFunction, application} from "express";
import userModel from "../model/userModel";
import userProfile from "../model/userProfile";
import catemodel from "../model/category"
import cloudinary from "../utils/cloudinary";
import slugify from "slugify";
import cartModel from "../model/cartModel";
import productModel from "../model/productModel";
import orderModel from "../model/orderModel";
import Flutterwave from "flutterwave-node-v3"
import {v4 as uuiv4} from 'uuid';

const flw = new Flutterwave("FLWPUBK_TEST-19f6df7aa276e1f45f69e0e779a7b921-X", "FLWSECK_TEST-e8f881fc39ac6c79f89f7701e5994f2d-X");


export const checkOut = async (req:Request, res:Response):Promise<Response>=>{
    try {
        const {userId}=req.params
        const findUserCart = await cartModel.findOne({user: userId})
        console.log(findUserCart)
        const {card_number, cvv, expiry_month, expiry_year, amount, fullname}= req.body
        const payload = {
            // "card_number": "5531886652142950",
            // "cvv": "564",
            // "expiry_month": "09",
            "card_number": card_number,
            "cvv": cvv,
            "expiry_month": expiry_month,
            "expiry_year": expiry_year,
            "currency": "NGN",
            "amount": findUserCart?.bills,
            "redirect_url": "https://www.google.com",
            "fullname": fullname,
            "email": "developers@flutterwavego.com",
            "phone_number": "09000000000",
            "enckey": "FLWSECK_TESTf7418d790540",
            "tx_ref": uuiv4()
        
        }
        const response = await flw.Charge.card(payload)
        console.log(response)


        // if (response.meta.authorization.mode === "pin")
        if (response.meta.authorization.mode === 'pin') {
            let payload2:any = payload
            payload2.authorization = {
                "mode": "pin",
                // "fields": [
                //     "pin"
                // ],
                "pin": 3310
            }
            const reCallCharge = await flw.Charge.card(payload2)
            const callValidate = await flw.Charge.validate({
                "otp": "12345",
                "flw_ref": reCallCharge.data.flw_ref
            })
            console.log(callValidate)
            if (callValidate.status === "success")
            {
                const createOrder =  await cartModel.create({
                    user:findUserCart?.user,
                    orderItems: findUserCart?.cartItem,
                    bills:findUserCart?.bills
                })
            }
            await cartModel.findByIdAndDelete({_id:findUserCart?._id})

            return res.status(201).json({
                message: "payment sucessful",
                data: "check your order"
            })
        } else 
        {
            return res.status(401).json({
                message: "error in making payment",
            })
        }
        
    } catch (error:any) {
        return res.status(400).json({
            message:"failed",
            error: error.message
        })
    }

}