import express from "express"
import { logout, login, signUp } from "../controller/authController.js"
import errorHandler from "../middleware/errorHandler.js"

const router = express.Router()

router.post("/signup", signUp)
router.post("/login", errorHandler(login))
router.post("/logout", logout)

export default router