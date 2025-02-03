import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/errorHandler.js";

dotenv.config();

export const signup = async (req, res, next) => {
  const { username, email, password, signupCode } = req.body;

  if (signupCode !== process.env.SIGNUP_CODE) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid signup code" });
  }
  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  const expiryDate = new Date(Date.now() + 3600000 * 24); // 24 hour

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User not found"));

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Wrong credentials"));

    const token = jwt.sign(
      { id: validUser._id },
      process.env.NEXT_PUBLIC_JWT_SECRET
    );

    const { password: hashedPassword, ...rest } = validUser._doc;

    res
      .cookie("access_token", token, { httpOnly: true, expires: expiryDate })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const logout = (req, res) => {
  res.clearCookie("access_token").status(200).json("Logout success");
};
