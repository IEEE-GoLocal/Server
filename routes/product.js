import express from "express";

import {addProduct,deleteProduct ,getProducts } from "../controllers/product.js";
// import { isAuthenticated } from "../middlewares/auth.js"; 

const router = express.Router();
router.get('/getProduct',getProducts)
router.post('/add',addProduct);
router.delete('/delete/:id',deleteProduct);


export default router




 