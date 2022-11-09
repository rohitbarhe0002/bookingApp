import React from 'react'
import useFetch from '../../hooks/useFetch';
import './featuredPropertiesList.css'
function FeaturedPropertiesList() {
  const {data,loading,error} = useFetch("http://localhost:8000/api/hotels/featured?cities=indore,vrindavan&limit=1");
console.log(...data,"data is here");
  return (
    <div className='fp'>
      {loading?"please wait your h0tel is loading":
      <>
      
      {data.map(item=>(

        <div className="fpItem" key={item._id}>
        
         <img
          src="https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
          // src={item.photos[0]}
          alt=""
          className="fpImg"
        />
        <span className="fpName">{item[0].name}</span>
        <span className="fpCity">{item[0].city}</span>
        <span className="fpPrice">Starting from ${item[0].cheapestPrice}</span>
      {item.rating &&  <div className="fpRating">
            <button > {item.rating}</button>
            <span>Excellent</span>
        </div>}

       </div>
))} </>
}
    </div>
  )
}

export default FeaturedPropertiesList;