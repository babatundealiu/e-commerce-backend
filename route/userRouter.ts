import express from "express"
import {registration, getSingleUser, login, verifyUser} from "../controller/userController"


const router= express.Router()
router.route("/reg-user").post(registration)
router.route("/login-user").post(login)
// router.route("/logout-user").post(logout)
router.route("/verify-account/:id").get(verifyUser)


router.route("/single-user/:id").get(getSingleUser)


export default router;