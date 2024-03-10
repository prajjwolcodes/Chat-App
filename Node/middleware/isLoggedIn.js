import jwt from "jsonwebtoken"
import User from "../model/userModel.js"

async function isLoggedIn(req, res, next) {
    const token = req.cookies.jwt
    if (!token)
        return res.status(400).json({
            error: "Please Provide Token || Please Log in"
        })
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
    if (!decoded)
        return res.status(400).json({
            error: "Invalid Token"
        })

    const user = await User.findById(decoded.userId).select("-password")
    req.user = user
    next()
}

export default isLoggedIn