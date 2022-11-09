import Room from "../models/Room.js";
import Hotels from "../models/Hotels.js";

//// add room detail
export const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  const newRoom = new Room(req.body);
console.log(req.params.hotelid,"full req");
  try {
    const saveRoom = await newRoom.save();
    try {
      await Hotels.findByIdAndUpdate(hotelId, {
        $push: { rooms: saveRoom._id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json(saveRoom);
  } catch (err) {
    next(err);
  }
};

///update room detail
export const updateRoom = async (req, res, next) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedRoom);
  } catch (err) {
    next(err);
  }
};
///update rooms avaiblity 
export const updateRoomsAvaibility = async (req, res, next) => {
  console.log("come in",req.body.dates);
  try {
 await Room.updateOne(
      
      { "roomNumbers._id":req.params.id },
      { $push: {
        "roomNumbers.$.unavailable":req.body.dates
      } }
    );
    res.status(200).json("roo has been updated");
  } catch (err) {
    next(err);
  }
};
///delete room detail
export const deleteRoom = async (req, res, next) => {
  const hotelId = req.params.hotelId;
  console.log(hotelId,"hotepl id");
  try {
    await Room.findByIdAndDelete(req.params.id);
    try {
      await Hotels.findByIdAndUpdate(hotelId, {
        $pull: { rooms:req.params.id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json("room has been deleted");
  } catch (err) {
    next(err);
  }
};

///get All room details
export const getAllRoom = async (req, res, next) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (err) {
    next(err);
  }
};

////single room detail
export const getRoomsById = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    res.status(200).json(room);
  } catch (err) {
    next(err);
  }
};
