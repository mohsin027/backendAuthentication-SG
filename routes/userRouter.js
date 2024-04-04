import express from "express";
import { profile } from "../controllers/userController.js";
const router = express.Router();

router.get("/", profile);

export default router;
