import express, {Application, Request, Response, json} from "express";
import bcrypt from "bcrypt";
import userModel from "../model/userModel";
import userProfle from "../model/userProfile"
import jwt from "jsonwebtoken"
import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    host: "smtp.forwardemail.net",
    service: "gmail",
    port: 587,
    secure: true,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: "jamiubaba16@gmail.com",
      pass: "aquw dgsq rart hkst",
    },
  });
  

export const registration= async (req:Request, res:Response):Promise<Response>=>{
    try {
        const {fullname, email, password, role}= req.body
        if (!fullname || !email || !password)
        {
            return res.status(401).json({
                message: "All fields are required"
            })
        }
        
        const checkEmail = await userModel.findOne({email:email})
        console.log(checkEmail)
        if (checkEmail)
        {
            return res.status(401).json({
                message: "email already exists"
            })
        }
        const salt = await bcrypt.genSalt(10)
        const hashedpassword = await bcrypt.hash(password, salt)

        const createData= await userModel.create({
            fullname,
            email, 
            password:hashedpassword,
            role
        })
        const createProfile = await userProfle.create({
            _id:createData._id,
            firstname: "",
            lastname: "",
            gender: "",
            avatar:""
        })
        createData.profile= createProfile._id
        createData.save()

        createProfile.user = createData._id
        createProfile.save()
        
        let mailOption = {
            from: '"SpicyStore 👻" <foo@example.com>', // sender address
            to: email, // list of receivers
            subject: "welcome to SpicyStore ✔", // Subject line
            text: "Hello world?", // plain text body
            html: `<b>Hello Azolar please click this link its from yor friend? <a href="http://localhost:8978/api/v1/verify-account/${createData._id}">link </a> to verify your account</b>`, // html body
        
        }
        await transporter.sendMail(mailOption, (error:any, info:any)=>{
            if (error)
            {
                console.log("error sending mail", error)
            }else 
            {
                console.log("email sent ", info.response)
            }
        })

        return res.status(201).json({
            message: "user created successfully",
            result: createData
        })
       
    } catch (error:any) {
        return res.status(401).json({
            message: "failed to register user",
            error: error.message
        })
    }
}
export const getSingleUser = async (req:Request, res:Response):Promise<Response>=>{
    // const getsing = await userModel.findById(req.params.id)
    try {
        const getsing = await userModel.findById(req.params.id).populate({
            path: "profile",
            select: "firstname lastname gender avatar"
        })
        return res.status(201).json({
            message: "successful",
            data: getsing
        })
    } catch (error:any) {
        return res.status(401).json({
            message: "failed to get user",
            error: error.message
        })
    }
}
export const login = async (req:Request, res:Response)=>{
    try {
        const {email, password}=req.body
        if (!email || !password)
        {
            return res.status(401).json({
                message: "All fields are required"
            })
        } 
        const checkEmail = await userModel.findOne({email:email})
        if (checkEmail)
        {
            const checkPassword = await bcrypt.compare(password, checkEmail.password)
            if (checkPassword)
            {
                if (checkEmail.verify) {
                }
                const token:any = jwt.sign(
                    {_id:checkEmail._id, fullname:checkEmail.fullname},
                     "secretkey",
                     {expiresIn: "3d"})
                                 
            const  {Password, isActive, ...info} = checkEmail._doc
            const options:any = {expiresIn: "3d"}
            res.cookie("sessionId",token, options)

            return res.status(201).json({
                message: "log in successfully",
                data: {token, options}
            })
            } else {
                let mailOption = {
                    from: '"SpicyStore 👻" <foo@example.com>', // sender address
                    to: email, // list of receivers
                    subject: "welcome to SpicyStore ✔", // Subject line
                    text: "Hello world?", // plain text body
                    html: `<b>Hello Azolar please click this link its from yor friend? <a href="http://localhost:8978/api/v1/verify-account/${checkEmail._id}">link </a> to verify your account</b>`, // html body
                
                }
                await transporter.sendMail(mailOption, (error:any, info:any)=>{
                    if (error)
                    {
                        console.log("error sending mail", error)
                    }else 
                    {
                        console.log("email sent ", info.response)
                    }
                })
        }
            
        } else {
            return res.status(401).json({
                message:" incorrect password"
            })
        }
    }catch(error:any){
        return res.status(401).json({
            message: "internet or server error"
        })
    }

}

export const verifyUser = async (req:Request, res:Response)=>{
    try {
        const user = await userModel.findById(req.params.id)
        console.log(user)
        const verifyData = await userModel.findByIdAndUpdate(
            req.params.id,
            {
                verify:true
            },
            {new:true}
        )
        return res.status(201).json({
            message: "account has been verified, process to login"
        })
    } catch (error:any) {
        return res.status(401).json({
            message: error.message
        })
    }
}
