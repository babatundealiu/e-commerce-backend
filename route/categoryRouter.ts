import express, {Router} from "express"
import { getOneCat, getAllCat, createCat, deleteAcategory } from "../controller/categoryController";
import { verifyToken } from "../utils/verifyToken";



const router= express.Router()
router.route("/reg-createCat/:userId").post( createCat)
router.route("/all-cat").get(getAllCat)
router.route("/getone/:Id").get(getOneCat)
router.route("/delete-category/:id").delete(deleteAcategory)



export default router;