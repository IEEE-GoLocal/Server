import { ChatHistoryList } from "../models/chatHistoryList.js";
import { ChatConvos } from "../models/chatConvos.js";
import { errorMiddleware } from "../middlewares/error.js";

// GET /api/v1/chats/getallusers
export async function getAllUsers(req, res, next) {
    const { shopId } = req.query
    try {
        const userlist = await ChatHistoryList.find({ shopId })
        if (!userlist) {
            res.status(404).json({ message: 'Conversation not found' })
        }
        res.status(200).json(userlist)
    } catch (err) {
        errorMiddleware(err, req, res, next)
    }
}


// GET /api/v1/chats/conversation
export async function getConversation(req, res, next) {
    const { shopId, userId } = req.query
    try {
        const conversation = await ChatConvos.findOne({ userId, shopId })
        if (!conversation) {
            res.status(404).json({ message: 'Conversation not found' })
        }
        res.status(200).json(conversation)
    } catch (err) {
        errorMiddleware(err, req, res, next)
    }
}

// POST /api/v1/chats/newconvo
export async function initNewConvo(req, res, next) {
    const { userId, shopId } = req.body
    const newConvoEntry = new ChatHistoryList({
        shopId,
        userId
    })
    const newConvo = new ChatConvos({
        roomId: shopId + userId,
        shopId,
        userId,
        conversations: []
    })

    try {
        await newConvoEntry.save()
        await newConvo.save()
        res.status(200).json({ message: "initiated new convo" })
    } catch (err) {
        errorMiddleware(err, req, res, next)
    }
}


// POST /api/v1/chats/updateconvo
export async function updateConvo(req, res, next) {
    const { shopId, userId, sender, msg } = req.body
    try {
        let convo = await ChatConvos.findOne({ roomId: shopId + userId })
        const previousConvos = convo.conversations
        convo.conversations = [...previousConvos, { sender, msg }]
        await convo.save()
        res.status(200).json({ message: "updated convo" })
    } catch (err) {
        errorMiddleware(err, req, res, next)
    }
}

