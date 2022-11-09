import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { SearchContext } from "../context/SearchContext";
import './myCompo.css'
function Reserve({ setOpen, hotelId }) {
  const { loading, data, error } = useFetch(
    `http://localhost:8000/api/hotels/room/${hotelId}`
  );
  console.log(data,"data outside");
  const [selectedRoom, setSelectedRoom] = useState([]);
  const {date} = useContext(SearchContext);
  const getDateRange = (startDate,endDate) => {
    console.log(startDate,endDate,"start and end ");
    const start = new Date(startDate);
    const end = new Date(endDate);
    console.log(start,end ,"date new");
    const dates = new Date (start.getTime());
    console.log(dates,"dates");
let list = []
console.log(data,"data here");
while(dates <= end){
  console.log("coem in loop");
list.push(new Date(dates).getTime())
dates.setDate(dates.getDate()+1)
}
return list;
  }
  const allDates = getDateRange(date[0]?.startDate,date[0]?.endDate);

  const isAvailable = roomNumber => {
    console.log(roomNumber,"roomNumber");
    // const isFound = roomNumber.unavalableDates.some((date)=>
    // allDates.includes(new Date(date).getTime()))
    // return !isFound;
  }
  const handleSelect = (e) => {
    console.log(e,"called");
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRoom(
      checked
        ? [...selectedRoom, value]
        : selectedRoom.filter((item) => item !== value)
    );
  };
  const handleClick = () => {
   setOpen(false)
  }
  return (
    <div className="reserve">
      <div className="reserveContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          onClick={() => setOpen(false)}
          className="reserveClose"
        />
        <span>Select your room:</span>
        {data.map((item) => (
          <div className="reserveItem">
            <div className="reserveItemInfo">
              <div className="reserveTitle"> {item?.title}</div>
              <div className="reserveDesc">{item?.desc} </div>
              <div className="reserveMax">
                Max People: <b>{item?.maxPeople}</b>
              </div>
              <div className="reservePrice">{item?.price}</div>
              </div>
              <div className="reserveSelectRooms">
              {item.roomNumbers.map((roomNumber) => (
                <div className="reserveRoom">
                  <label>{roomNumber?.number}</label>
                  <input
                    type="checkbox"
                    value={roomNumber?._id}
                    onChange={console.log("gghhgs")}
                    disabled={ isAvailable(roomNumber)}
                  />
                </div>
              ))}
            </div>
            </div>
         
        ))}
        <button onClick={handleClick} className="reserveButton">Reserve Now!</button>
      </div>
    </div>
  );
}

export default Reserve;
