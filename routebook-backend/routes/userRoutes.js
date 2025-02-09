import router from "express";
import { login, signup } from "../controllers/userController.js"

const userRouter = router()

userRouter.post("/login", login)
userRouter.post("/signup", signup)

export default userRouter