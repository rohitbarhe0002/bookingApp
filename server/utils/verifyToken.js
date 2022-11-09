import Jwt from "jsonwebtoken";
import { createError } from "./error.js";
export const verifyToken = (req, res, next) => {
  console.log("admin called");
  const token = req.cookies.access_token;
  if (!token) {
    return next(createError(401, "you are not authenticated!"));
  }
  Jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return next(createError(403, "token is npot valid!"));
    req.user = user;
    next();
  });
};

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      if (err) return next(createError(403, "ypu are not authorised!"));
    }
  });
};

export const verifyAdmin = (req, res, next) => {
  console.log("called");
  verifyToken(req, res, next, () => {
    console.log(req.user.isAdmin, "here status");
    if (req.user.isAdmin) {
      next();
    } else {
      if (err) return next(createError(403, "ypu are not authorised!"));
    }
  });
};
