import { Schema, model } from "mongoose";

const chatConvosSchema = new Schema({
    roomId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    shopId: {
        type: String,
        required: true
    },
    conversations: [
        {
            sender: {
                type: String,
                enum:['user','shopkeeper'],
                required: true
            },
            msg: {
                type: String,
                required: true
            }
        }
    ]
})

export const ChatConvos = model('ChatConvos', chatConvosSchema);