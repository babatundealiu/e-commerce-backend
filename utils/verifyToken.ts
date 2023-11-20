import express, {Request, Response} from 'express'
import jwt from 'jsonwebtoken'


export const verifyToken = async (req:any, res:any, next:any) => {
    // const getSession = req.headers["cookie"]
    
    // if (!getSession)
    // {
    //     return res.status(404).json({
    //         message:"please login to get token"
    //     })
    // }
    
    // const tokenCookies =await getSession.split("=")[1]
    // console.log("hjgjjj", tokenCookies)
    // if (tokenCookies)
    if (req.headers.authorization)
    {
        // const token = await tokenCookies
        const token = await req.headers.authorization.split( " ") [1]
        console.log(token)
        jwt.verify(token, "secretkey", (err:any, payload:any)=>{
            if (err)
            {

                return res.status(404).json({
                    message: "token expired"
                })
            }
            req.user = payload 
            next()
        })
    } else
    {
        return res.status(404).json({
            message:"please provide a valid token"
        })
    }
}