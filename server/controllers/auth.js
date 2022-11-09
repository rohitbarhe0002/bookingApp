import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";
import * as dotenv from 'dotenv' 
dotenv.config()

/// register user
export const register = async (req, res, next) => {
  console.log("comein register ");
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });
    await newUser.save();
    res.status(200).send("user has been created");
  } catch (err) {
    next(err);
  }
};

/// login user
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "user not found !"));
    const isPasswordChecked = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordChecked)
      return next(
        createError(400, "bad request username or password not matched !")
      );
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },process.env.JWT
  
    );
    const { password, isAdmin, ...otherdetails } = user._doc;
    res.cookie("access_token",token,{
      httpOnly:true,
    }).status(200).json(otherdetails);
  } catch (err) {
      res.status(500).json(err);
  }
};
