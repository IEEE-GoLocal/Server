import express from "express";
import { editProfile, getMyProfile, getProfile, login, logout, register,shopsWithinRadius,shopsWithinRadiusLoc } from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/new", register);
router.post("/login", login);
router.post("/getshopsradius",isAuthenticated, shopsWithinRadius)
router.post("/getshopsradiusloc",isAuthenticated, shopsWithinRadiusLoc)

router.post("/update", isAuthenticated,editProfile)

router.get("/logout", logout);

router.get("/me", isAuthenticated, getMyProfile);
router.get("/:id",getProfile)

export default router;