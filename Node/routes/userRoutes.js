import express from "express"
import isLoggedIn from "../middleware/isLoggedIn.js"
import { getUsers } from "../controller/userController.js"

const router = express.Router()

router.get("/users", isLoggedIn, getUsers)

export default router