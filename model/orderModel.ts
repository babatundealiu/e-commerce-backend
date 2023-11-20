import mongoose from "mongoose"

interface order {
    user: string,
    cartItem: object[]
    bills: number
}
interface iOrder extends order, mongoose.Document { }

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
        },
    cartItem: [{
            products: {type: mongoose.Schema.Types.ObjectId, ref: "products", required: true},
            quantity:{type: Number, default:1, min: 1},
            price:{type: Number}
        }],
    bills: {
            type: Number,
            required: true,
            default: 0
        }, 
    createdAt :{
        type: String || Number,
        default: new Date

    }
})
export default mongoose.model<iOrder>("orders", cartSchema)