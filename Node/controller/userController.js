import User from "../model/userModel.js"

export const getUsers = async (req, res) => {
    const loggedInUserId = req.user._id

    const allUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password")
    res.status(200).json(allUsers)
}