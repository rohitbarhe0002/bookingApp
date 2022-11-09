
import Hotels from "../models/Hotels.js";
import Room from "../models/Room.js";


///Add new hotel
export const createHotel = async (req, res, next) => {
  const newHotel = new Hotels(req.body);

  try {
    const saveHotel = await newHotel.save();
    res.status(200).json(saveHotel);
  } catch (err) {
    next(err);
  }
};

///update hotel
export const updateHotel = async (req, res, next) => {
  try {
    const updatedHotel = await Hotels.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (err) {
    next(err);
  }
};

///delete hotel
export const deleteHotel = async (req, res, next) => {
  try {
    await Hotels.findByIdAndDelete(req.params.id);
    res.status(200).json("user has been deleted");
  } catch (err) {
    next(err);
  }
};


////single  hotel
export const getHotelByid = async (req, res, next) => {
  try {
    const hotel = await Hotels.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (err) {
    next(err);
  }
};

///
export const getAllHotels = async (req, res, next) => {
  try {
    const hotelAll = await Hotels.find();
    res.status(200).json(hotelAll);
  } catch (err) {
    next(err);
  }
};

///get All hotels
export const getAllHotel = async (req, res, next) => {
const {min,max,...others} = req.query;
  try {
    const hotels = await Hotels.find({...others,cheapestPrice:{$gt:min|1,$lt:max||99999}}).limit(req.query.limit);
    res.status(200).json(hotels);
    console.log(hotels,"hotels is here");
  } catch (err) {
    next(err);
  }
};

///get All featured hotels
export const getAllFeaturedHotels = async (req, res, next) => {
  const {min,max,...others} = req.query;
    try {
      const hotels = await Hotels.find({...others,cheapestPrice:{$gt:min|1,$lt:max||99999}}).limit(req.query.limit);
      res.status(200).json(hotels);
      console.log(hotels,"hotels is here");
    } catch (err) {
      next(err);
    }
  };

///get All hotels by city
export const countByCity = async (req, res, next) => {

  const cities = req.query.cities.split(",")

  try {
    const list = await Promise.all(cities.map(city=>{
      return Hotels.count({city:city})
    }))
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};
////get hotels by cities
export const getHotelsByCity = async (req, res, next) => {

  const cities = req.query.cities.split(",")
  console.log(cities,"here");

  try {
    const list = await Promise.all(cities.map(city=>{
      return Hotels.find({city:city}).limit(req.query.limit)
    }))
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};

/////
export const countByType = async (req, res, next) => {
 
  try {
  const hotelCount = await Hotels.countDocuments({type:"hotels"});
 const apartmentCount = await Hotels.countDocuments({type:"apartments"});
 const resortCount = await  Hotels.countDocuments({type:"resorts"});
 const villaCount = await  Hotels.countDocuments({type:"villas"});
 const cabinCount = await  Hotels.countDocuments({type:"cabins"});
////circular structure err await is need at every opration up side solve
 res.status(200).json([
  {type:"hotels",count:hotelCount},
  {type:"apartments",count:apartmentCount},
  {type:"resorts",count:resortCount},
  {type:"villas",count:villaCount},
  {type:"cabins",count:cabinCount},
 ])

}catch (err) {
  console.log(err);
   res.status(500).json(err)
  }
};

////get Hotel by room 

export const getHotelByRooms = async (req,res,next)=>{
  console.log("coem in");
try {
const hotel = await Hotels.findById(req.params.id)
console.log(hotel,"is is herr");
const list = await  Promise.all(hotel.rooms.map(roomi=>{return Room.findById(roomi)} )
)
console.log(list,"kist is here");
res.status(200).json(list)
}catch(err){
console.log(err);
}
}