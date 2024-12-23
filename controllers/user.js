import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";
import {Shop} from "../models/shop.js";
import axios from "axios"

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid Email or Password"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid Email or Password"
      });
    }

    sendCookie(user, res, `Welcome back, ${user.name}`, 200);
  } catch (error) {
    console.log("Error during login:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
};

export const register = async (req, res, next) => {
  try {
    const { name, email, phone_number, password } = req.body;

    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        success: false,
        message: "User Already Exist"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({ name, email, phone_number, password: hashedPassword });

    sendCookie(user, res, "Registered Successfully", 201);
  } catch (error) {
    console.log("Error during registration:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
};

export const getProfile = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await User.findById(id);
    if (!data) {
      return res.status(400).json({
        success: false,
        message: "User doesn't Exist"
      });
    }
    res.status(200).json({
      success: true,
      result: data,
    });
  } catch (error) {
    console.log("Error while fetching profile:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
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
    console.log("Error while updating profile:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
};
export const shopsWithinRadius = async (req, res, next) => {
  try {
    const { latitude, longitude, radius } = req.body;
    console.log(latitude, longitude, radius);
    const shops = await Shop.find({
      loc: {
        $geoWithin: {
          $center: [[longitude, latitude], radius] 
        }
      }
    });

    console.log(shops);
    res.status(200).json({
      success: true,
      message: "Fetched shops",
      shops: shops
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error couldn't fetch shops"
    });
  }
};

export const shopsWithinRadiusLoc = async (req, res, next) => {
  try {
    const { location, radius } = req.body;
    const api="65fc95357628d302108426jyq94817d"
    // console.log(latitude, longitude, radius);
    const data = await axios.get(`https://geocode.maps.co/search?q=${location}&api_key=${api}`, {
            cors: true,
            withCredentials: true
        });

    console.log(data.data)
    const latitude = data.data[0].lat
    const longitude = data.data[0].lon
    const shops = await Shop.find({
      loc: {
        $geoWithin: {
          $center: [[longitude, latitude], radius] 
        }
      }
    });

    console.log(shops);
    res.status(200).json({
      success: true,
      message: "Fetched shops",
      shops: shops
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error couldn't fetch shops"
    });
  }
};