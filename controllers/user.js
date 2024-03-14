import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";
import { errorMiddleware } from "../middlewares/error.js";
import ErrorHandler from "../middlewares/error.js";

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) return next(new ErrorHandler("Invalid Email or Password", 400));

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return next(new ErrorHandler("Invalid Email or Password", 400));

    sendCookie(user, res, `Welcome back, ${user.name}`, 200);
  } catch (error) {
    errorMiddleware(error, req, res, next);
  }
};

export const register = async (req, res, next) => {
  try {
    const { name, email, phone_number, password } = req.body;

    let user = await User.findOne({ email });

    if (user) return next(new ErrorHandler("User Already Exist", 400));

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({ name, email, phone_number, password: hashedPassword });

    sendCookie(user, res, "Registered Successfully", 201);
  } catch (error) {
    errorMiddleware(error, req, res, next);
  }
};

export const getProfile = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await User.findById(id);
    if (!data) return next(new ErrorHandler("User doesn't Exist", 400));
    res.status(200).json({
      success: true,
      result: data,
    });
  } catch (error) {
    errorMiddleware(error, req, res, next);
  }
};

export const getMyProfile = (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

export const logout = (req, res) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Development" ? false : true,
    })
    .json({
      success: true,
      message: "logged out successfully",
    });
};

export const editProfile = async (req, res, next) => {
  try {
    const { name, email, phone_number } = req.body;

    const user = await User.findByIdAndUpdate(req.user._id, { name, email, phone_number }, { new: true });

    res.status(200).json({
      success: true,
      message: "Updated Successfully",
      user: user,
    });
  } catch (error) {
    errorMiddleware(error, req, res, next);
  }
};
