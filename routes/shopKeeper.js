import express from "express";

import { editProfile, getMyProfile, getProfile, login, logout, register } from "../controllers/shopKeeper.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/new", register);
router.post("/login", login);

router.post("/update", isAuthenticated,editProfile)

router.get("/logout", logout);

router.get("/me", isAuthenticated, getMyProfile);
router.get("/:id",getProfile)
// router.post("newShop",isAuthenticated,addShop);

// router.get("shops", isAuthenticated,shops);

//try adding route to delete shop

export default router;