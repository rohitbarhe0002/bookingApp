import React from "react";
import useFetch from "../../hooks/useFetch";
import "./featured.css";
function Featured() {
 const  {data,loading,error} = useFetch("http://localhost:8000/api/hotels/countByCity?cities=indore,vrindavan")
 console.log(data);
  return (
    <div className="featured">
      {loading?"please wait your data is load":(
        <>
      
      <div className="featuredItem">
        <img
          src="https://media.istockphoto.com/photos/luxury-resort-picture-id104731717?k=20&m=104731717&s=612x612&w=0&h=40INtJRzhmU1O4Rj24zdY8vj4aGsWpPaEfojaVQ8xBo="
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>Indore</h1>
          <h2>{data[0]} properties</h2>
        </div>
      </div>
      <div className="featuredItem">
        <img
          src="https://media.istockphoto.com/photos/luxury-resort-picture-id104731717?k=20&m=104731717&s=612x612&w=0&h=40INtJRzhmU1O4Rj24zdY8vj4aGsWpPaEfojaVQ8xBo="
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>Agra</h1>
          <h2>{data[1]} properties</h2>
        </div>
      </div>
      <div className="featuredItem">
        <img
          src="https://media.istockphoto.com/photos/luxury-resort-picture-id104731717?k=20&m=104731717&s=612x612&w=0&h=40INtJRzhmU1O4Rj24zdY8vj4aGsWpPaEfojaVQ8xBo="
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>Delhi</h1>
          <h2>{data[2]} properties</h2>
        </div>
      </div>
      </>)}
    </div>
  );
}

export default Featured;
