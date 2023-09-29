import React, { useState } from "react";
import { useSnapCarousel } from "react-snap-carousel";
import dog1 from "../assets/images/elements/dog1.svg";
import dog2 from "../assets/images/elements/dog2.svg";
import dog3 from "../assets/images/elements/dog3.svg";
import icon_arrow1 from "../assets/icons/iconarrow1.svg";
import icon_arrow2 from "../assets/icons/iconarrow2.svg";
import axios from "axios";
import fetchUserData from "../hooks/fetchUserData";
import { useNavigate } from "react-router-dom";
import { ToggleContext } from "../pages/AuthenticatedApp";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useContext } from "react";
import useFilter from "../hooks/useFilter";

const AdvancedCarousel = () => {
  const {
    setLoading
  } = useContext(ToggleContext);
  const { petSitter, getPetSitterById } = useFilter();

  const { scrollRef, pages, activePageIndex, next, prev, goTo, onSnapToItem } =
    useSnapCarousel();

  const { petsitter_id } = useParams();
  // Define the number of items to show at a time
  const itemsToShow = 3;

  // Create an array of images to loop through
const [petImages, setPetImages] = useState([]);


useEffect(() => {
  const fetchImage = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:6543/petsitteruser/${petsitter_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Assuming this updates the petSitter state
      getPetSitterById(petsitter_id);

      // Store the image gallery data in the petImages state
      setPetImages(
        response.data.petSitterUser.petsitterdetail[0].image_gallery
      );
      setLoading(false);
    } catch (error) {
      // Handle error here
      console.error("Error fetching pet sitter data:", error);
      setLoading(false);
    }
  };

  fetchImage();
}, []);

  return (
    <div className="relative">
      {petImages && (
        <ul
          ref={scrollRef}
          className="flex justify-between overflow-x-hidden overflow-y-hidden scroll-snap-type-x-mandatory z-0 h-[493px]"
        >
          {petImages.map((image, index) => (
            <li key={index} className="flex-shrink-0 px-3">
              <img
                src={image}
                alt={`Image ${index + 1}`}
                className="w-[550px] h-[413px]"
              />
            </li>
          ))}
        </ul>
      )}

      <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center ">
        <img
          src={icon_arrow1}
          onClick={() => prev()}
          className="bg-white text-gray-500 px-4 py-2 rounded-full ml-2 absolute left-10 transform -translate-y-1/2 top-1/2 rotate-90 w-[56px] h-[56px]"
        />
        <img
          src={icon_arrow2}
          onClick={() => next()}
          className="bg-white text-gray-500 w-{24px} h-{24px} px-4 py-2 rounded-full ml-2 absolute right-10 transform -translate-y-1/2 top-1/2 rotate-90 w-[56px] h-[56px]"
        />
      </div>
      {/* <div>
        {activePageIndex + 1} / {pages.length}
      </div> */}
      {/* <ol className="flex">
        {pages.map((_, i) => (
          <li key={i}>
            <button
              style={i === activePageIndex ? { opacity: 0.5 } : {}}
              onClick={() => goTo(i)}
              className={`bg-blue-500 text-white px-3 py-1 rounded-full ml-2 ${
                i === activePageIndex ? "opacity-50" : ""
              }`}
            >
              {i + 1}
            </button>
          </li>
        ))}
      </ol> */}
    </div>
  );
};

export default AdvancedCarousel;
