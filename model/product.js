import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export const Product=mongoose.model("Product", schema);