import express from "express";
import {
  createHotel,
  updateHotel,
  deleteHotel,
  getHotelByid,
  getAllHotel,
  countByCity,
  countByType,
  getHotelByRooms,
  getAllHotels,
  getAllFeaturedHotels,
  getHotelsByCity,

} from "../controllers/hotel.js";
import { getRoomsById } from "../controllers/rooms.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";



const router = express.Router();
/////post
router.post("/", verifyAdmin,createHotel);

////update
router.put("/:id",verifyAdmin, updateHotel);

///delete
router.delete("/:id",verifyAdmin, deleteHotel);

///get a single user
router.get("/find/:id", getHotelByid);

///get All hotels
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
router.get("/room/:id", getHotelByRooms);

router.get("/featured", getHotelsByCity);


router.get("/", getAllHotel);

export default router;
