import { Product } from "../models/product.js";
import { errorMiddleware } from "../middlewares/error.js";

// Add controllers for adding, deleting, and getting products

export const addProduct = async (req, res, next) => {
  try {
    const { name, tags, description } = req.body;

    const existingProduct = await Product.findOne({
      name,
      tags,
      description,
    });

    if (existingProduct) {
      return res.status(200).json({
        success: false,
        message: "Product already exists",
      });
    }

    const product = await Product.create({
      name,
      tags,
      description,
    });

    return res.status(200).json({
      success: true,
      message: "Product added successfully",
      product,
    });
  } catch (err) {
    errorMiddleware(err, req, res, next);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = await Product.findByIdAndRemove(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (err) {
    errorMiddleware(err, req, res, next);
  }
};

export const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();

    return res.status(200).json({
      success: true,
      message: "Products found",
      products,
    });
  } catch (err) {
    errorMiddleware(err, req, res, next);
  }
};
