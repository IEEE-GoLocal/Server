import { ShopKeeper } from "../models/shopKeeper.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";
import {errorMiddleware} from "../middlewares/error.js";

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const shopKeeper = await ShopKeeper.findOne({ email }).select("+password");

    if (!shopKeeper) return next(new ErrorHandler("Invalid Email or Password", 400));

    const isMatch = await bcrypt.compare(password, shopKeeper.password);

    if (!isMatch)
      return next(new ErrorHandler("Invalid Email or Password", 400));

    sendCookie(shopKeeper, res, `Welcome back, ${shopKeeper.name}`, 200);
  } catch (error) {
    errorMiddleware(err,req,res,next)
  }
};

export const register = async (req, res,next) => {
  try {
    const { name, email, phone_number, password } = req.body;

    let shopKeeper = await ShopKeeper.findOne({ email });

    if (shopKeeper) return next(new ErrorHandler("ShopKeeper Already Exist", 400));

    const hashedPassword = await bcrypt.hash(password, 10);

    shopKeeper = await ShopKeeper.create({ name, email, phone_number, password: hashedPassword });

    sendCookie(shopKeeper, res, "Registered Successfully", 201);
  } catch (error) {
    errorMiddleware(err,req,res,next)
    
  }
};

export const getProfile= async(req,res,next)=>{
  try{
    const id= req.params.id;
    const data= await ShopKeeper.findById(id)
    if(!data) return next(new ErrorHandler("ShopKeeper doesn't Exist",400))
    res.status(200).json({
      success:true,
      result: data,
    })
  }
  catch(err){
    errorMiddleware(err,req,res,next)
  }
}


export const getMyProfile = (req, res) => {
    console.log(req.shopKeeper)
  res.status(200).json({
    success: true,
    shopKeeper: req.shopKeeper,
  });
};


export const logout = (req, res) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      sameSite: process.env.NODE_ENV === "Develpoment" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Develpoment" ? false : true,
    })
    .json({
      success: true,
      message:"logged out successfully",
    });
};


export const editProfile = async (req, res,next) => {
    try {
      const { name, email, phone_number } = req.body;
  
    //   let shopKeeper = await ShopKeeper.findOne({ email });
   
    //   if (shopKeeper) return next(new ErrorHandler("ShopKeeper Already Exist", 400));
  
    //   const hashedPassword = await bcrypt.hash(password, 10);
  
      let shopKeeper = await ShopKeeper.updateMany({ name, email, phone_number });
      console.log(shopKeeper)
  
      res.status(200).json({
        success: true,
        message:"Updated Successfully",
      })
    } catch (error) {
      errorMiddleware(err,req,res,next)
      
    }
  };


  export const addShop = (req, res,next) => {
    // try filling this
  }


  export const removeShop = (req, res, next) => {
    // try filling this
  }

  export const getShops = (req, res, next) =>{
    // try filling this
  }
