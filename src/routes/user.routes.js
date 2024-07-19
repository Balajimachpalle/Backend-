import Router from "express";
import registerUser from "../controllers/user.controller.js"
import {upload} from "../middlewares/multer.middleware.js"
import { loginUser, logout } from "../controllers/login.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

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

router.route("/login").post(loginUser)

//secure route
router.route("/logout").post(verifyJWT,logout)

export default router