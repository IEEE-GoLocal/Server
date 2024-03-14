import { Shop } from "../models/shop.js";
import { errorMiddleware } from "../middlewares/error.js";

export const getShops = async (req, res, next) => {
  try {
    const shops = await Shop.find();
    return res.status(200).json({
      success: true,
      message: "Shops found",
      shops: shops
    });
  } catch (err) {
    errorMiddleware(err, req, res, next);
  }
};

export const addComment = async (req, res, next) => {
  try {
    const shopId = req.params.id;
    const { comment } = req.body;

    const shop = await Shop.findByIdAndUpdate(
      shopId,
      {
        $push: {
          comments: {
            commentatorId: req.user._id,
            comment: comment
          }
        }
      },
      { new: true }
    );

    if (!shop) {
      return res.status(404).json({ success: false, message: "Shop not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Comment added successfully",
      shop: shop
    });
  } catch (err) {
    errorMiddleware(err, req, res, next);
  }
};

export const addProduct = async (req, res, next) => {
  try {
    const shopId = req.params.id;
    const { available_products } = req.body;

    const shop = await Shop.findByIdAndUpdate(
      shopId,
      {
        $push: {
          available_products: { $each: available_products }
        }
      },
      { new: true }
    );

    if (!shop) {
      return res.status(404).json({ success: false, message: "Shop not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Products added successfully",
      shop: shop
    });
  } catch (err) {
    errorMiddleware(err, req, res, next);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const shopId = req.params.id;
    const { productId } = req.body;

    const shop = await Shop.findByIdAndUpdate(
      shopId,
      {
        $pull: {
          available_products: { productId: productId }
        }
      },
      { new: true }
    );

    if (!shop) {
      return res.status(404).json({ success: false, message: "Shop not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      shop: shop
    });
  } catch (err) {
    errorMiddleware(err, req, res, next);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const shopId = req.params.id;
    const { productId, quantity } = req.body;

    const shop = await Shop.findByIdAndUpdate(
      shopId,
      {
        $pull: {
          available_products: { productId: productId }
        }
      },
      { new: true }
    );

    const updatedShop = await Shop.findByIdAndUpdate(
      shopId,
      {
        $push: {
          available_products: {
            productId: productId,
            quantity: quantity
          }
        }
      },
      { new: true }
    );

    if (!updatedShop) {
      return res.status(404).json({ success: false, message: "Shop not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      shop: updatedShop
    });
  } catch (err) {
    errorMiddleware(err, req, res, next);
  }
};
