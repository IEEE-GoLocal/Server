import { ShopKeeper } from "../models/shopKeeper.js";
import { Shop } from "../models/shop.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";
import { errorMiddleware } from "../middlewares/error.js";

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const shopKeeper = await ShopKeeper.findOne({ email }).select("+password");

    if (!shopKeeper) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Email or Password" });
    }

    const isMatch = await bcrypt.compare(password, shopKeeper.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Email or Password" });
    }

    sendCookie(shopKeeper, res, `Welcome back, ${shopKeeper.name}`, 200);
  } catch (error) {
    errorMiddleware(error, req, res, next);
  }
};

export const register = async (req, res, next) => {
  try {
    const { name, email, phone_number, password } = req.body;

    let shopKeeper = await ShopKeeper.findOne({ email });

    if (shopKeeper) {
      return res
        .status(400)
        .json({ success: false, message: "ShopKeeper already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    shopKeeper = await ShopKeeper.create({
      name,
      email,
      phone_number,
      password: hashedPassword,
    });

    sendCookie(shopKeeper, res, "Registered Successfully", 201);
  } catch (error) {
    errorMiddleware(error, req, res, next);
  }
};

export const getProfile = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await ShopKeeper.findById(id);
    if (!data) {
      return res
        .status(400)
        .json({ success: false, message: "ShopKeeper doesn't Exist" });
    }
    res.status(200).json({ success: true, result: data });
  } catch (error) {
    errorMiddleware(error, req, res, next);
  }
};

export const getMyProfile = (req, res) => {
  res.status(200).json({ success: true, shopKeeper: req.shopKeeper });
};

export const logout = (req, res) => {
  res
    .clearCookie("token")
    .status(200)
    .json({ success: true, message: "Logged out successfully" });
};

export const editProfile = async (req, res, next) => {
  try {
    const { name, email, phone_number } = req.body;

    const updatedShopKeeper = await ShopKeeper.findByIdAndUpdate(
      req.shopKeeper._id,
      { name, email, phone_number },
      { new: true }
    );

    res
      .status(200)
      .json({
        success: true,
        message: "Updated Successfully",
        shopKeeper: updatedShopKeeper,
      });
  } catch (error) {
    errorMiddleware(error, req, res, next);
  }
};

export const addShop = async (req, res, next) => {
  try {
    const {
      name,
      location,
      shopkeeper_id,
      latitude,
      longitude,
      available_products,
    } = req.body;
    const existingShop = await Shop.findOne({ name, shopkeeper_id });
    if (existingShop) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Shop already exists with the same name",
        });
    }

    const newShop = await Shop.create({
      name,
      location,
      shopkeeper_id,
      latitude,
      longitude,
      available_products,
    });

    // Add the new shop's ID to the shops_owned array of the corresponding ShopKeeper
    const updatedShopKeeper = await ShopKeeper.findByIdAndUpdate(
      req.shopKeeper._id,
      { $push: { shops_owned: newShop._id } }, // Use $push to add the newShop._id to the shops_owned array
      { new: true } // Return the updated document
    );

    return res
      .status(200)
      .json({
        success: true,
        message: "Shop created successfully",
        shop: newShop,
      });
  } catch (error) {
    errorMiddleware(error, req, res, next);
  }
};

export const removeShop = async (req, res, next) => {
  try {
    const shopId = req.params.id;
    if (!shopId) {
      return res
        .status(404)
        .json({ success: false, message: "Shop not found by Id" });
    }

    // Update ShopKeeper document to remove the shopId from the shops_owned array
    const updatedShopKeeper = await ShopKeeper.findByIdAndUpdate(
      req.shopKeeper._id,
      { $pull: { shops_owned: shopId } },
      { new: true }
    );

    const shop = await Shop.findByIdAndDelete(shopId);
    if (!shop) {
      return res
        .status(404)
        .json({ success: false, message: "Shop not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Shop deleted successfully" });
  } catch (error) {
    errorMiddleware(error, req, res, next);
  }
};

export const getShops = async (req, res, next) => {
  try {
    const shopIds = req.shopKeeper.shops_owned;
    console.log(shopIds);
    const shopPromises = shopIds.map(async (shopId) => {
      return await Shop.findById(shopId);
    });

    // Wait for all promises to resolve using Promise.all
    const shops = await Promise.all(shopPromises);

    res.status(200).json({ success: true, shops: shops });
  } catch (error) {
    next(error);
    errorMiddleware(error, req, res, next);
  }
};

