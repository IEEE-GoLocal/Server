import express from "express";

import { editProfile, getMyProfile, getProfile, login, logout, register,addShop,removeShop,getShops,getShopById } from "../controllers/shopKeeper.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/new", register);
router.post("/login", login);

router.post("/update", isAuthenticated,editProfile)

router.get("/logout", logout);

router.get("/me", isAuthenticated, getMyProfile);

router.post("/newShop",isAuthenticated,addShop);

router.get("/shops", isAuthenticated,getShops);

router.get("/shoppy/:id",getShopById)

router.delete("/shops/:id",isAuthenticated,removeShop);
router.get("/:id",getProfile)



export default router;