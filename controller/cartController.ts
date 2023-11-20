// import express, {Application, Request, Response, NextFunction, application} from "express";
// import userModel from "../model/userModel";
// import userProfile from "../model/userProfile";
// import catemodel from "../model/category"
// import cloudinary from "../utils/cloudinary";
// import slugify from "slugify";
// import cartModel from "../model/cartModel";
// import productModel from "../model/productModel";

// export const addToCart = async (req:Request, res:Response):Promise<Response>=>{
//     try {
//         const {quantityValue}= req.body
//         const userId= req.params.userId
//         console.log(userId)
//         const checkUser = await userModel.findOne({_id:userId})
//         if (!checkUser) {
//             return res.status(401).json({
//                 message: "user not found"
//             })
//         }
//         const productId= req.params.productId
//         console.log(productId)
//         const checkProduct:any = await productModel.findOne({_id:productId})
//         console.log(checkProduct)
//         const quantity:any = quantityValue || 1
//         const price = checkProduct?.price *quantity
//         if (!checkProduct) {
//             return res.status(401).json({
//                 message: "product not found"
//             })
//         }
//         const createData = await cartModel.create({
//             user:userId,
//             cartItem: [{product:productId, quantity, price}],
//             bill: price * quantity
//         })
//         return res.status(201).json({
//             success: 1,
//             result: createData
//         })
//     } catch (error) {
//         return res.status(401).json({
//             message: "a server error has occured"
//         })
//     }
// } 
import express, {Application, Request, Response, NextFunction, application} from "express";
import userModel from "../model/userModel";
import userProfile from "../model/userProfile";
import catemodel from "../model/category"
import cloudinary from "../utils/cloudinary";
import slugify from "slugify";
import cartModel from "../model/cartModel";
import productModel from "../model/productModel";

export const addToCart = async(req:Request, res:Response)=>{
    try {
        const {productId}=req.params
        const {userId} = req.params
        const getUser = await userModel.findOne({_id:userId})
        // console.log(getUser)
        const getProduct:any= await productModel.findOne({_id:productId})
        // console.log(getProduct)

        const checkUserCart:any = await cartModel.findOne({user: userId})
        if (checkUserCart)
        {
            const findIndexProduct:any = checkUserCart.cartItem.findIndex((item:any)=>item?.product?.equals(productId))
            console.log("kjfnkj", findIndexProduct)
            if (findIndexProduct > -1)
            {
                const userSelectPr:any = checkUserCart.cartItem[findIndexProduct]
                console.log(userSelectPr)
                userSelectPr.quantity +=1
                checkUserCart.bill = checkUserCart.cartItem.reduce((acc:any, cur:any)=>{
                    console.log(cur)
                    return acc + cur.quantity *cur.price
                }, 0)
                checkUserCart.cartItem[findIndexProduct]=userSelectPr
                await checkUserCart.save()

                return res.status(201).json({
                    message: 'you have ordered before',
                    result: checkUserCart
                })
            } else
            {
                checkUserCart.cartItem.push({product: getProduct?._id, quantity: 1, price: getProduct?.price})
                checkUserCart.bill = checkUserCart.cartItem.reduce((acc:any, cur:any)=>{
                    console.log(cur)
                    return acc + cur.quantity *cur.price
                }, 0)
                await checkUserCart.save()

                return res.status(201).json({
                    message: "new product added",
                    result: checkUserCart
                })
            }
        }else
        {
            const dataCart:any = await cartModel.create({
                user: getUser?._id,
                cartItem: [{product: getProduct?._id, quantity:1, price: getProduct?.price}],
                bill: 1 * getProduct.price
            })
            return res.status(201).json({
                message: "successfully added to cart",
                result: dataCart
            })
        }

    } catch (error:any) {
        return res.status(401).json({
        message: "a server error has occured",
        error: error.message
    })
}}

export const removeFromCart = async (req:any, res:Response) => {
    try
    {
        const { userId } = req.params
        const productId = req.query.productId
        console.log(productId)

        // const a = "world"
        // console.log(`hello ${a}`)
        

        const checkUserCart:any = await cartModel.findOne({ user: userId })  
        console.log(checkUserCart)

        const position = checkUserCart?.cartItem.findIndex((item:any) => item.product == productId)
        console.log(position)
        // if (checkUserCart)
        if (position > -1)
        {
            const item = checkUserCart?.cartItem[position]
            if (item.quantity > 1)
            {
                  item.quantity -= 1;
                  checkUserCart.bill -= item.price;
                
            } else
            {
                checkUserCart.bill -= item.quantity * item.price
            if (checkUserCart.bill < 0)
            {
                checkUserCart.bill = 0
            }
            checkUserCart?.cartItem.splice(position, 1)
            }
           
            checkUserCart.bill = checkUserCart.cartItem.reduce((acc:any, cur:any) => {
                console.log(cur)
                return acc + cur.quantity * cur.price
            }, 0)
            await checkUserCart.save()
            return res.status(201).json({
                message:"succesfully removed from cart",
               //  result:dataCart
            })

        }else {
            return res.status(401).json({
                message: "you dont have any items",
            })
        } 
    } catch (error:any)
    {
          return res.status(400).json({
            message: error.message,
            error: error.message
        })
   }
    
}
 