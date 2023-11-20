import mongoose from "mongoose";

interface category {
    name: string,
    slug: string, 
    parent: string,
    user: {},
    products:{}[]
}

interface iCategory extends category, mongoose.Document { }

const catSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    slug: {
        type: String,
    },
    parent: {
        type: String,
    },
    products: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }, createdAt :{
        type: String || Number,
        default: new Date
    }
})

export default mongoose.model<iCategory>("category", catSchema)
