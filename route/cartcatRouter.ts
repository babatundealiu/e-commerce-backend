import express, {Router} from 'express'
import {addToCart, removeFromCart} from '../controller/cartController'

const router = express.Router()
router.route("/cart-items:userId/:productId").post(addToCart)
router.route("/delete-item/:userId").delete(removeFromCart)

export default router
