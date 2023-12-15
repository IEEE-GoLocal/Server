import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    location:{
        type:String,
        required:true,
    },
    latitude:{
        type:double,
        required:true,
    },
    longitude:{
        type:double,
        required:true,
    },
    available_products:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
    }],
    comments:[{
        commentorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
          },
        comment: {
            type: String,
            required: true,
          },

    }]

})

export const Shop=mongoose.model("Shop",schema);