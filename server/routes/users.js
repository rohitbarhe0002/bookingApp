import express from "express";
import {
  createUser,
  updateUser,
  deleteUser,
  getUserById,
  getAllUser,
} from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";



const router = express.Router();

// router.get("/checkauthentication",verifyToken,(req,res,next)=>{
//     res.send("hello user, your logged in")
// })

// router.get("/checkuser/:id",verifyUser,(req,res,next)=>{
//     res.send("hello user, your logged in and you can delete your account")
// })

// router.get("/checkadmin/:id",verifyAdmin,(req,res,next)=>{
//     res.send("hello admin , your logged in and you can delete all accounts")
// })

/////post
router.post("/", createUser);

////update
router.put("/:id", verifyUser,updateUser);

///delete
router.delete("/:id",verifyUser, deleteUser);

///get a single user
router.get("/:id",verifyUser, getUserById);

///get All Users
router.get("/", verifyAdmin,getAllUser);

export default router;
