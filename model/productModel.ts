import mongoose from "mongoose";

interface Product {
    name: string,
    img: string,
    desc: string,
    price: number,
    category: string,
    qty: number,
    createdBy: {}
}
interface iProduct extends Product, mongoose.Document{ }

const productSchem = new mongoose.Schema({
    name: {
        type: String,
    },
    desc: {
        type: String,
    },
    price: {
        type: Number,
    },
    category : {
        type: String,
    },
    qty: {
        type: Number,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }

}, {timestamps: true})

export default mongoose.model<iProduct>("product", productSchem)