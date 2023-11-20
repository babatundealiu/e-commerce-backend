import mongoose from "mongoose";

interface user{
    firstName: string,
    lastName: string,
    gender: string,
    avatar: string,
    user: mongoose.Schema.Types.ObjectId
}    
interface iUser extends user, mongoose.Document{}
const profileSchema = new mongoose.Schema({  
    firstName:
    {
        type: String,
    },
    lastName: 
    {
        type: String,
    },
    gender: 
    {
        type: String,
    },
    avatar: 
    {
        type: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }
},{timestamps: true})

export default mongoose.model<iUser>("profiles", profileSchema) 
