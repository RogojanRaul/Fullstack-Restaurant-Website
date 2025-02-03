import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/user.model.js';
import { errorHandler } from '../utils/errorHandler.js';

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  const expiryDate = new Date(Date.now() + 3600000 * 24); // 24 hour

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, 'User not found'));

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, 'Wrong credentials'));

    const token = jwt.sign(
      { id: validUser._id },
      process.env.NEXT_PUBLIC_JWT_SECRET
    );

    const { password: hashedPassword, ...rest } = validUser._doc;

    res
      .cookie('access_token', token, { httpOnly: true, expires: expiryDate })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      const token = jwt.sign(
        { id: user._id },
        process.env.NEXT_PUBLIC_JWT_SECRET
      );
      const expiryDate = new Date(Date.now() + 3600000 * 24);

      const { password: hashedPassword, ...rest } = user._doc;

      res
        .cookie('access_token', token, {
          httpOnly: true,
          expires: expiryDate,
        })
        .status(200)
        .json(rest);
    } else {
      const generatePassword = Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatePassword, 10);

      const createGoogleUserName =
        req.body.name.split(' ').join('').toLowerCase() +
        Math.random().toString(36).slice(-4);

      const newUser = new User({
        username: createGoogleUserName,
        email,
        password: hashedPassword,
        profilePicture: req.body.photo,
      });

      await newUser.save();

      const token = jwt.sign(
        { id: newUser._id },
        process.env.NEXT_PUBLIC_JWT_SECRET
      );
      const { password: hashedPassword2, ...rest } = newUser._doc;
      const expiryDate = new Date(Date.now() + 3600000 * 24);

      res
        .cookie('access_token', token, {
          httpOnly: true,
          expires: expiryDate,
        })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};

export const logout = (req, res) => {
  res.clearCookie('access_token').status(200).json('Logout success');
};
