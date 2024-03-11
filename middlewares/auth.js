import { User } from "../models/user.js";
import { ShopKeeper } from "../models/shopKeeper.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(404).json({
      success: false,
      message: "Login First",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded._id);
    console.log(req.user)

    if (!req.user) {
      req.shopKeeper = await ShopKeeper.findById(decoded._id);
      console.log(req.shopKeeper)
    }

    if (!req.user && !req.shopKeeper) {
      
      return res.status(404).json({
        success: false,
        message: "User or ShopKeeper not found",
      });
    }

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};
