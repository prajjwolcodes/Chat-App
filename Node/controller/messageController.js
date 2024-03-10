import Conversation from "../model/conversationModel.js"
import Message from "../model/messageModel.js"

export const sendMessage = async (req, res) => {
    const senderId = req.user._id
    const recieverId = req.params.id
    const { message } = req.body


    //SOCKET IO WILL GO HERE
    let conversation = await Conversation.findOne({
        participants: { $all: [senderId, recieverId] }
    })

    if (!conversation) {
        await Conversation.create({
            participants: [senderId, recieverId]
        })
    }

    const newMessage = await Message.create({
        senderId, recieverId, message
    })
    if (newMessage) {
        conversation?.messages.push(newMessage._id)
    }

    await conversation?.save()
    res.status(200).json(newMessage)
}

export const getMessage = async (req, res) => {
    const userId = req.user._id
    const friendId = req.params.id

    const conversation = await Conversation.findOne({
        participants: { $all: [userId, friendId] }
    }).populate("messages")

    if (!conversation)
        return res.status(200).json([])

    res.status(200).json(conversation.messages)

}