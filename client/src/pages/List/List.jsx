import { format } from "date-fns";
import React, { useState } from "react";
import { DateRange } from "react-date-range";
import { useLocation } from "react-router-dom";
import Header from "../../Components/Header/Header";
import Navbar from "../../Components/Navbar/Navbar";
import SearchItem from "../../Components/SearchItem/SearchItem";
import useFetch from "../../hooks/useFetch";
import "./list.css";

function List() {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [date, setDate] = useState(location.state.date);
  const [opendate, setOpenDate] = useState(false);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);

  const [options, setOptions] = useState(location.state.options);
  const {data,loading,error,reFetchData} = useFetch(`http://localhost:8000/api/hotels?city=${destination}&min=${minPrice || 0}&max=${maxPrice || 99999999}`);
  
  const handleClick = () => {
    reFetchData();
  }
  
  console.log(location, "here all location");
  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="listTitle">Search</h1>
            <div className="listItem">
              <label htmlFor="">Destination</label>
              <input type="text" placeholder={destination} />
            </div>
            <div className="listItem">
              <label htmlFor="">Check-in Date</label>
              <span onClick={() => setOpenDate(!opendate)}>{`${format(
                date[0].startDate,
                "MM/dd/yyyy"
              )} to ${format(date[0].endDate, "MM/dd/yyyy")}`}</span>
              {opendate && (
                <DateRange
                  onChange={(item) => setDate([item.selection])}
                  minDate={new Date()}
                  ranges={date}
                />
              )}
            </div>
            <div className="listItem">
              <label>Options</label>
              <div className="listOptions">
                <div className="listOptionItem">
                  <span className="listOptionText">
                    Min price<small>per night</small>
                  </span>
                  <input type="number"  onChange={e=>setMinPrice(e.target.value)} className="listOptionInput" />
                </div>
                <div className="listOptionItem">
                  <span className="listOptionText">
                    Max price<small>per night</small>
                  </span>
                  <input type="number" onChange={e=>setMaxPrice(e.target.value)} className="listOptionInput" />
                </div>
                <div className="listOptionItem">
                  <span className="listOptionText">Adult</span>
                  <input
                    min={1}
                    type="number"
                    className="listOptionInput"
                    placeholder={options.adult}
                  />
                </div>
                <div className="listOptionItem">
                  <span className="listOptionText">Children</span>
                  <input
                    type="number"
                    min={0}
                    className="listOptionInput"
                    placeholder={options.children}
                  />
                </div>
                <div className="listOptionItem">
                  <span className="listOptionText">Room</span>
                  <input
                    type="number"
                    min={1}
                    className="listOptionInput"
                    placeholder={options.room}
                  />
                </div>
              </div>
            </div>
            <button onClick={()=>handleClick}>Search</button>
          </div>
          <div className="listResult">
         {loading?"your data is loading" :
         <>
         {
          data.map(item=>(
         <SearchItem item={item} key={item.id} />
         ))}
         </>
         }
          </div>

        </div>
      </div>
    </div>
  );
}

export default List;
