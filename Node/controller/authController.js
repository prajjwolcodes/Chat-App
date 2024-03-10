import User from "../model/userModel.js"
import bcrypt from "bcrypt"
import generateToken from "../utils/generateToken.js"

export const signUp = async (req, res) => {
    const { fullName, username, password, confirmPassword, gender } = req.body
    const userExist = await User.findOne({ username })
    if (userExist)
        return res.status(400).json({
            error: "User already Exist"
        })
    if (password !== confirmPassword)
        return res.status(400).json({
            error: "Password Doesn't match"
        })

    // Random Avatar Generator https://avatar-placeholder.iran.liara.run/
    const randomBoyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
    const randomGirlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`

    const newUser = await User.create({
        fullName, username, gender,
        password: bcrypt.hashSync(password, 10),
        profilePic: gender === "male" ? randomBoyProfilePic : randomGirlProfilePic
    })

    if (newUser) {
        generateToken(newUser._id, res)
        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            username: newUser.username,
            profilePic: newUser.profilePic,
        })
    }
    else {
        res.status(400).json({
            error: "Error at creating user"
        })
    }
}

export const login = async (req, res) => {
    const { username, password } = req.body
    if (!username || !password)
        return res.status(400).json({
            error: "Please fill all the fields"
        })

    const userExist = await User.findOne({ username })
    if (!userExist)
        return res.status(400).json({
            error: "User doesnot exist with that username"
        })
    const ispasswordMatched = bcrypt.compareSync(password, userExist?.password || "")
    if (!ispasswordMatched)
        return res.status(400).json({
            error: "Invalid username or password"
        })

    if (userExist && ispasswordMatched) {
        generateToken(userExist._id, res)

        res.status(201).json({
            _id: userExist._id,
            fullName: userExist.fullName,
            username: userExist.username,
            profilePic: userExist.profilePic,
        })
    };

}


export const logout = (req, res) => {
    try {
        // res.cookie("jwt", " ", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}