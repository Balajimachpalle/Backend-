import Router from "express";
import registerUser from "../controllers/user.controller.js"
import {upload} from "../middlewares/multer.middleware.js"

const router =Router()

router.route("/register").post(
    // Middleware added in form of filesHandling . jo bhi methode execute ho rhu hai uske phile use kro
    upload.fields([
        {
            name:"avatar",
            maxCount:1
        },
        {
           name:"coverImage"
        }
    ]),
    

    registerUser
)

export default router