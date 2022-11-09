import {
  faBed,
  faCalendarDays,
  faCar,
  faPerson,
  faPlane,
  faTaxi,
} from "@fortawesome/free-solid-svg-icons";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import "./header.css";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../context/SearchContext";

function Header({type}) {
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [openDate,setOpenDate] = useState(false)
  const [openOptions,setOpenOptions] = useState(false);
  const [destination,setDestination] = useState('');

  const navigate = useNavigate();
  const [options,setOptions] = useState({
    adult:1,
    children:0,
    room:1,
  });
  

  const handleOptions = (name,operation) =>{
    setOptions(prev=>{return{
        ...prev,
        [name]:operation === "i" ? options[name] + 1 : options[name] - 1
    }})

  }

  const {dispatch} = useContext(SearchContext)
  const handleSearch =()=>{
    dispatch({type:"NEW_SEARCH",payload:{destination,date,options}})
    navigate("/hotels",{state:{destination,date,options}})
  }

  return (
    <div className="header">
      <div className={ type=="list"? "headerContainer listMode" :"headerContainer"}>
        <div className="headerList">
          <div className="headerListItem active">
            <FontAwesomeIcon icon={faBed} />
            <span>Stays</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faPlane} />
            <span>Flights</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faCar} />
            <span>Car rental</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faBed} />
            <span>Attractions</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faTaxi} />
            <span>Airport taxis</span>
          </div>
        </div>
{  type !==  "list" &&
<>
        <h1 className="headerTitle">A lifetime of discounts? Its's Genius.</h1>
        <p className="headerDesc">
          Get rewarded for your travels - unlock instant savings of 10% or more
          with a free Lamabooking account
        </p>
        <button className="headerbtn">Sign in / Register</button>
        <div className="headerSearch">
          <div className="headerSearchItem">
            <FontAwesomeIcon icon={faBed} className="headerIcon" />
            <input
              type="text"
              onChange={e=>setDestination(e.target.value)}
              placeholder="where are you going"
              className="headerSearchInput"
            />
          </div>

          <div className="headerSearchItem">
            <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
            <span onClick={()=>setOpenDate(!openDate)}  className="headerSearchText">{`${format(
              date[0].startDate,
              "MM/dd/yyyy"
            )}to  ${format(date[0].endDate, "MM/dd/yyyy")}`}</span>
           {openDate&& <DateRange
              onChange={(item) => setDate([item.selection])}
              showSelectionPreview={true}
              moveRangeOnFirstSelection={false}
              months={2}
              ranges={date}
              direction="horizontal"
              className="date"
            />}
          </div>

          <div className="headerSearchItem">
            <FontAwesomeIcon icon={faPerson} className="headerIcon"  />
            <span onClick={()=>setOpenOptions(!openOptions)} className="headerSearchText">{`${options.adult} adult . ${options.children}children. ${options.room}room`}</span>
           {openOptions && <div className="options">
                <div className="optionItem">
                    <span className="optionText">Adult</span>
                    <div className="optionCounter">
                    <button className="optionCounterButton" disabled={options.adult<=1}  onClick={()=>handleOptions("adult","d")}>-</button>
                     <span className="optionCounterNumber">{options.adult}</span>
                    <button className="optionCounterButton" onClick={()=>handleOptions("adult","i")}>+</button>
                    </div>
                </div>

                <div className="optionItem">
                    <span className="optionText">Children</span>
                    <div className="optionCounter">

                    <button className="optionCounterButton" disabled={options.adult<=1}  onClick={()=>handleOptions("children","d")}>-</button>
                     <span className="optionCounterNumber">{options.children}</span>
                    <button className="optionCounterButton" onClick={()=>handleOptions("children","i")}>+</button>
                    </div>
                </div>

                <div className="optionItem">
                    <span className="optionText">Room</span>
                    <div className="optionCounter">
                    <button className="optionCounterButton" disabled={options.adult<=1} onClick={()=>handleOptions("room","d")}>-</button>
                     <span className="optionCounterNumber">{options.room}</span>
                    <button className="optionCounterButton" onClick={()=>handleOptions("room","i")}>+</button>
                    </div>
                </div>
            </div>}
          </div>
          <div className="headerSearchItem">
            <button className="headerbtn" onClick={handleSearch}>Search</button>
          </div>
        </div>
        </>
        }
      </div>

    </div>
  );
}

export default Header;
