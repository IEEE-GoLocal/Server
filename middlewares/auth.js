import { User } from "../models/user.js";
import { ShopKeeper } from "../models/shopKeeper.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token)
    return res.status(404).json({
      success: false,
      message: "Login First",
    }); 

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decoded._id);
  // console.log(req.user)
//   if(!req.user){
//     req.shopkeeper=await ShopKeeper.findById(decoded._id);
  
//   }
  next();
}; 