// import mongoose from "mongoose"
// interface user{
//     fullname:string,
//     email: string,
//     password: string,
//     profile:{}
// }
// interface iUser extends user, mongoose.Document{ }

// const userSchema = new mongoose.Schema({
//     fullname:{
//         type: String,
//     },
//     email:
//     {
//         type: String,
//         unique:true
//     },
//     password:
//     {
//         type: String,
//     },
//     profile: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "profiles"
//     }
// },{
//     timestamps:true
// })

// export default mongoose.model<iUser>("users", userSchema)

import mongoose from "mongoose";
interface user {
    fullname:string,
    email: string, 
    password: string,
    profile: {},
    role: string,
    _doc: any,
    verify: boolean
    
}
interface iUser extends user, mongoose.Document{}

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
    },
    email:{
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    verify: {
        type:Boolean,
        default: false,

    },
    profile:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"profiles"
    },
    role: {
        type: String,
        enum:["user", "admin", "superadmin"],
        default: "user"
    }
},{timestamps: true})

export default mongoose.model<iUser>("users", userSchema)