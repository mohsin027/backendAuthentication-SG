import express from "express";
import {
  home,
  userLogin,
  userLogout,
  userReg,
} from "../controllers/authController.js";
const router = express.Router();

router.get("/", home);
router.post("/register", userReg);
router.post("/login", userLogin);
router.get("/logout", userLogout);

export default router;
