import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    required: true,
    type: String,
    select: false,
  },
  phone_number: {
    required: true,
    type: String,
  },
  shops_owned:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Shop"
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const ShopKeeper = mongoose.model("ShopKeeper", schema);