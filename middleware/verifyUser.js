import jwt from "jsonwebtoken";
import UserModel from "../model/userModel.js";

const verifyUser = async (req, res, next) => {
  try {
    const token = req.cookies.userToken;
    if (!token)
      return res.json({ loggedIn: false, error: true, message: "no token" });

    const verifiedJWT = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log(verifiedJWT, "verifyjWT");
    const user = await UserModel.findById(verifiedJWT.id, { password: 0 });
    if (!user) {
      return res.json({ loggedIn: false });
    }
    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    res.json({ loggedIn: false, error: err });
  }
};
export default verifyUser;
