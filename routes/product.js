import express from "express";

import {addProduct,deleteProduct ,getProducts } from "../controllers/product.js";
import { isAuthenticated } from "../middlewares/auth.js"; //authentication of admin profile 

const router = express.Router();
router.get('/getProduct',getProducts)
router.post('/add',addProduct);
router.delete('/delete/:id',deleteProduct);
// add routes for adding products ,getting products and deleting products

export default router


//products can only be added and deleted by admin no such restriction for getting products

 