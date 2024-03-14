import express from "express";

import { getShops,addComment,addProduct,deleteProduct,updateProduct} from "../controllers/shop.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.get("/allShops",getShops)

router.post("/newComment/:id",isAuthenticated,addComment); 

router.post("/addProduct/:id",isAuthenticated,addProduct);

router.post("/deleteProduct/:id",isAuthenticated,deleteProduct);

router.post("/updateProduct/:id",isAuthenticated,updateProduct);


export default router;