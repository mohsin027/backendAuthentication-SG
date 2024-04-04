import express from "express";
const app = express();
const PORT = process.env.PORT || 4000;
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";
import cookieParser from "cookie-parser";
import dbConnect from "./config/dbConfig.js";
import dotenv from "dotenv";
import verifyUser from "./middleware/verifyUser.js";
dotenv.config();

dbConnect();

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());

//Authentication Routes
app.use("/", authRouter);

//Protected Routes
app.use("/auth", verifyUser, userRouter);

app.listen(PORT, () => {
  console.log("app listening on port " + PORT);
});
