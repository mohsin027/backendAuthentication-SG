import UserModel from "../model/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const salt = 10;

export const home = (req, res) => {
  console.log("auth controller");
  res.json({ home: "home" });
};

export const userReg = async (req, res) => {
  const { fullName, email, password } = req.body;

  console.log("user registration controller");
  try {
    let user = await UserModel.findOne({ email });
    if (user) {
      return res.json({ err: true, message: "user already found" });
    }

    const hashPassword = bcrypt.hashSync(password, salt);

    user = await UserModel.create({ fullName, email, password: hashPassword });
    const token = jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_SECRET_KEY
    );
    return res
      .cookie("userToken", token, {
        httpOnly: true,
        secure: true,
        maxAge: 1000 * 60 * 10,
        sameSite: "none",
      })
      .json({ err: false, userToken: token });
  } catch (err) {
    res.status(400).json({ err: true, error: err.message });
  }
};

export const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.json({ err: true, message: "Invalid email or password" });
    }

    const userValid = bcrypt.compareSync(password, user.password);
    if (!userValid) return res.json({ err: true, message: "wrong Password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);
    res
      .cookie("userToken", token, {
        httpOnly: true,
        secure: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
        sameSite: "none",
      })
      .json({ err: false, userToken: token });
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error, "error in controller");
  }
};
export const userLogout = async (req, res) => {
  res
    .cookie("token", null, {
      httpOnly: true,
      secure: true,
      maxAge: 0,
      sameSite: "none",
    })
    .json({ err: false });
};
