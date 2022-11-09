import express from "express";
import {
    createRoom,
    updateRoom,
    deleteRoom,
    getAllRoom,
    getRoomsById,
    updateRoomsAvaibility,
 
} from "../controllers/rooms.js";
import { verifyAdmin } from "../utils/verifyToken.js";



const router = express.Router();
/////post
router.post("/:hotelid", verifyAdmin,createRoom);

////update
router.put("/:id",verifyAdmin, updateRoom);
router.put("/avaibility/:id",updateRoomsAvaibility );


///update rooms avaibility 


///delete
router.delete("/:id/:hotelid",verifyAdmin, deleteRoom);

///get a single user
router.get("/:id", getRoomsById);

///get All hotels
router.get("/", getAllRoom);

export default router;
