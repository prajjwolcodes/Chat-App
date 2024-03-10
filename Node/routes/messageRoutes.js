import express from "express"
import errorHandler from "../middleware/errorHandler.js"
import { getMessage, sendMessage } from "../controller/messageController.js"
import isLoggedIn from "../middleware/isLoggedIn.js"

const router = express.Router()

router.post("/send/:id", isLoggedIn, sendMessage)
router.get("/get/:id", isLoggedIn, getMessage)


export default router