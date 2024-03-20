import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    shopkeeper_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ShopKeeper",
        required: true,
    },
    latitude: {
        type: Number,
        required: true,
    },
    longitude: {
        type: Number,
        required: true,
    },
    available_products: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
        },
        quantity: {
            type: Number,
            required: true,
        }
    }],
    comments: [{
        commentatorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        comment: {
            type: String,
            required: true,
        },
        sentiment:{
            type:Boolean,
            required:true
        }
    }]
});

export const Shop = mongoose.model("Shop", schema);
