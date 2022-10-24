import * as user from "../models/UserModel.js";

export const VerifyUser = async (req, res, next) => {
  if (!req.session.userName) {
    return res.status(400).json({ msg: "Please login" });
  }
  const result = await user.getusernamebyUsername(req.session.userName);
  // console.log(result);
  if (!result.length) {
    return res.status(404).json({ msg: "User not found" });
  }
  req.userName = result[0].username;
  next();
};
