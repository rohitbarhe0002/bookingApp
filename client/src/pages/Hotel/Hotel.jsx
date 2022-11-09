import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocation,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Components/context/AuthContext";
import { SearchContext } from "../../Components/context/SearchContext";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import MailList from "../../Components/MailList/MailList";
import MyCompo from "../../Components/MyCompo/MyCompo";
import Navbar from "../../Components/Navbar/Navbar";
// import Reserve from "../../Components/Reserve/Reserve";
import useFetch from "../../hooks/useFetch";

import "./hotel.css";

function Hotel() {
  const loacation = useLocation();
  const id = loacation.pathname.split("/")[2];
  const [slideNumber, setSlideNumber] = useState(0);
  const [openSlider, setOpenSlider] = useState(false);
  const [check, setCheck] = useState(false);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const { data, loading, error } = useFetch(
    `http://localhost:8000/api/hotels/find/${id}`
  );

  const { date, city, options } = useContext(SearchContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  console.log(user, "user is here");

  // console.log(date[0].startDate.getTime(),city,options, "dates are here");

  const MILISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDiffrence(date1, date2) {
    const timeDiff = Math.abs(date2?.getTime() - date1?.getTime());
    const diffDays = Math.ceil(timeDiff / MILISECONDS_PER_DAY);
    return diffDays;
  }

  const days = dayDiffrence(date[0]?.endDate, date[0]?.startDate);
  const photos = [
    {
      src: "https://media.istockphoto.com/photos/luxury-resort-picture-id104731717?k=20&m=104731717&s=612x612&w=0&h=40INtJRzhmU1O4Rj24zdY8vj4aGsWpPaEfojaVQ8xBo=",
    },
    {
      src: "https://media.istockphoto.com/photos/luxury-resort-picture-id104731717?k=20&m=104731717&s=612x612&w=0&h=40INtJRzhmU1O4Rj24zdY8vj4aGsWpPaEfojaVQ8xBo=",
    },
    {
      src: "https://media.istockphoto.com/photos/luxury-resort-picture-id104731717?k=20&m=104731717&s=612x612&w=0&h=40INtJRzhmU1O4Rj24zdY8vj4aGsWpPaEfojaVQ8xBo=",
    },
    {
      src: "https://media.istockphoto.com/photos/luxury-resort-picture-id104731717?k=20&m=104731717&s=612x612&w=0&h=40INtJRzhmU1O4Rj24zdY8vj4aGsWpPaEfojaVQ8xBo=",
    },
    {
      src: "https://media.istockphoto.com/photos/luxury-resort-picture-id104731717?k=20&m=104731717&s=612x612&w=0&h=40INtJRzhmU1O4Rj24zdY8vj4aGsWpPaEfojaVQ8xBo=",
    },
    {
      src: "https://media.istockphoto.com/photos/luxury-resort-picture-id104731717?k=20&m=104731717&s=612x612&w=0&h=40INtJRzhmU1O4Rj24zdY8vj4aGsWpPaEfojaVQ8xBo=",
    },
  ];
  // const handleOpen = (i) => {
  //   console.log("called");
  //   setOpenSlider(!openSlider);
  //   setCheck(true);

  //   console.log(i, openSlider, "slideNumber");
  //   setSlideNumber(i);
  // };
  const handleOpen = (i) => {
    setOpenSlider(!openSlider);
    setSlideNumber(i);
  };

  const handleClick = () => {
    if (user) {
      setOpenModal(true);
    } else {
      navigate("/login");
    }
  };

  const handleSliderMove = (direction, i) => {
    let newSlideNumber;
    direction === "L"
      ? newSlideNumber = slideNumber === 0   ? 5 : slideNumber - 1
      : newSlideNumber = slideNumber === 5  ? 0 : slideNumber + 1;
      setSlideNumber(newSlideNumber)
  };
  return (
    <div>
      <Navbar />
      <Header type="list" />
      {loading ? (
        "loading"
      ) : (
        <div className="hotelContainer">
          {openSlider && (
            <div className="Slider">
              <FontAwesomeIcon
                icon={faCircleXmark}
                className="close"
                onClick={() => setOpenSlider(!openSlider)}
              />
              <FontAwesomeIcon
              color=""
                icon={faCircleArrowLeft}
                className="arrow"
                onClick={(slideNumber) => handleSliderMove("L", slideNumber)}
              />
              <div className="sliderWrapper">
                <img
                  src={photos[slideNumber].src}
                  alt=""
                  className="sliderImg"
                />
              </div>
              <FontAwesomeIcon
                icon={faCircleArrowRight}
                className="arrow"
                onClick={(slideNumber) => handleSliderMove("R", slideNumber)}
              />
            </div>
          )}

          <div className="hotelWrapper">
            <button className="bookNow">Reservr or Book Now!</button>
            <h1 className="hotelTitle">{data?.name}</h1>
            <div className="hotelAddress">
              <FontAwesomeIcon icon={faLocation} />
              <span>{data?.address}</span>
            </div>
            <span className="hotelDistance">
              Excellant location {data?.distance}m from center
            </span>
            <span className="hotelPriceHighLight">
              Book a stay over ${data?.cheapestPrice} at this property and get a
              free airport taxi
            </span>
            <div className="hotelImages">
              {photos?.map((img, i) => (
                <div className="hotelImgWrapper" key={i}>
                  <img
                    src={img.src}
                    onClick={() => handleOpen(i)}
                    alt=""
                    className="hotelImg"
                  />
                </div>
              ))}
            </div>
            <div className="hotelDetails">
              <div className="hotelTexts">
                <h1 className="hotelTitle">{data?.title}</h1>
                <p className="hotelDsc"> {data?.desc}</p>
              </div>
              <div className="hotelDetailsPrice">
                <h1>Perfect for a {days} -night stay !</h1>
                <span className="">
                  {" "}
                  located in the real heart of karkow this property ha an
                  excellant location score og 9.8
                </span>
                <h2>
                  <b>${days * data?.cheapestPrice * options?.room}</b> ({days}
                  nights)
                </h2>
                <button onClick={handleClick}>Rserve or Book now</button>
              </div>
            </div>
          </div>
          <MailList />
          <Footer />
        </div>
      )}{" "}
      {/* <MyCompo/> */}
      {openModal && <MyCompo setOpen={setOpenModal} hotelId={id} />}
    </div>
  );
}

export default Hotel;
