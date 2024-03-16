import { Schema, model } from "mongoose";

const chatHistoryListSchema = new Schema({
    shopId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
})

export const ChatHistoryList = model('ChatHistoryList', chatHistoryListSchema)