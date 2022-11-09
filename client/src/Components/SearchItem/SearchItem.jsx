import React from "react";
import "./searchItem.css";
import axios from 'axios'
import { Link } from "react-router-dom";

function SearchItem({item}) {
  return (
    <div className="searchItem">
      <img
        src="https://media.istockphoto.com/photos/luxury-resort-picture-id104731717?k=20&m=104731717&s=612x612&w=0&h=40INtJRzhmU1O4Rj24zdY8vj4aGsWpPaEfojaVQ8xBo="
        alt=""
        className="searchItemImg"
      />
      <div className="searchItemDesc">
        <h1 className="searchItemTitle">{item.name}</h1>
        <span className="searchItemDistance">{item.distance} from center</span>
        <span className="searchItemTaxiOp">Free airport taxi</span>
        <span className="searchSubTitle">
          {" "}
          Studio apartment with air conditioning
        </span>
        <span className="searchItemFeatures">
          {" "}
          {item.desc}
        </span>
        <span className="SearchItemCancelOp">Free Cancellation</span>
        <span className="SearchItemCancelSubtitle">
          You can cancel later, so lock in this great price today!
        </span>
      </div>
      <div className="searchItemDetails">
      {item.ratings &&  <div className="searchItemRating">
          <span>Excellant</span>
          <button>{item.ratings}</button>
        </div>}
        <div className="searchItemDeatilTexts">
          <span className="searchItemPrice">{item.cheapestPrice}</span>
          <span className="searchItemTaxOp">Includes taxes and fees</span>
          <Link to={`/hotels/${item._id}`}>
          <button className="searchItemCheckButton">see avaibility</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SearchItem;
