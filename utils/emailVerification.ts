import nodemailer from "nodemailer"
import {google} from "googleapis"
import path from "path"
import ejs from "ejs"
import { gmail } from "googleapis/build/src/apis/gmail";


// const oAuth = new google.auth.OAuth2()
const GOOGLE_ID = "264723916771-558s08bcptmm1ns5a1rpi6lqc0b2c9f2.apps.googleusercontent.com";

const  GOOGLE_SECRET = "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";

const GOOGLE_REDIRECT = "https://developers.google.com/oauthplayground";
const GOOGLE_REFRESH = "1//04nv2NGvSgwdQCgYIARAAGAQSNwF-L9Ir8N0Er6eY5Rak8Y7xQkM5-LXSdBqG6VDL0h7dunAhuQ8FedcZ_ApXv7pz8eB3-glH4Xw"
const oAuth = new google.Auth.OAuth2(GOOGLE_ID, GOOGLE_SECRET, GOOGLE_REDIRECT);
oAuth.setCredentials({refresh_token: GOOGLE_REFRESH})


export const verifyUser = async (name:any)=>{
    try {
        const accessToken = await oAuth.getAccessToken()
        const transporter = nodemailer.createTransporter({
            service: "gmail",
            port: 587,
            auth: {
                // TODO: replace `user` and `pass` values from <https://forwardemail.net>
                user: "jamiubaba16@gmail.com",
                pass: "aquw dgsq rart hkst",
              },
        })
    } catch (error:any) {
        
    }console.log("nnffhjfh")
    console.log(Error)
}