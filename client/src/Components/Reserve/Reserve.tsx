import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import useFetch from '../../hooks/useFetch'
import './reserve.css'
function Reserve({setOpen,hotelId}) {
   const {loading,data,error} =  useFetch(`http://localhost:8000/api/hotels/room/${hotelId}`)
  return (
    <div className='reserve'>
        <div className="reserveContainer">
            <FontAwesomeIcon icon={faCircleXmark} onClick={()=>setOpen(false)} className="reserveClose"/>
            <span>Select your room:</span>
            {data.map(item=>(
              <div className="reserveItem">
                <div className="reserveItemInfo">
                  <div className="reserveTitle"> dsd</div>
                    <div className="reserveDesc">fsdf </div>
                      <div className="reserveMax">
                        Max People: <b>uggd</b>
                      </div>
                </div>
              </div>
            ))}
        </div>
         </div>
  )
}

export default Reserve;