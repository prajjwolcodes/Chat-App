import express from "express"
import isLoggedIn from "../middleware/isLoggedIn.js"
import { getUsers } from "../controller/userController.js"
import errorHandler from "../middleware/errorHandler.js"

const router = express.Router()

router.get("/users", isLoggedIn, errorHandler(getUsers))

export default router