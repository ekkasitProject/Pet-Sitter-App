import React from "react";
import { useSnapCarousel } from "react-snap-carousel";
import dog1 from "../assets/images/elements/dog1.svg";
import dog2 from "../assets/images/elements/dog2.svg";
import dog3 from "../assets/images/elements/dog3.svg";
import icon_arrow1 from "../assets/icons/iconarrow1.svg";
import icon_arrow2 from "../assets/icons/iconarrow2.svg";

const AdvancedCarousel = () => {
  const { scrollRef, pages, activePageIndex, next, prev, goTo } =
    useSnapCarousel();

  // Define the number of items to show at a time
  const itemsToShow = 3;

  return (
    <div className="relative">
      <ul
        ref={scrollRef}
        className="flex justify-between overflow-x-auto scroll-snap-type-x-mandatory z-0 "
      >
        <li className="w-550 h-413 flex-shrink-0">
          <img src={dog2} alt="Image 1" className="w-full h-full px-3" />
        </li>
        <li className="w-550 h-413 flex-shrink-0">
          <img src={dog1} alt="Image 2" className="w-full h-full px-3" />
        </li>
        <li className="w-550 h-413 flex-shrink-0">
          <img src={dog3} alt="Image 3" className="w-full h-full px-3" />
        </li>
        <li className="w-550 h-413 flex-shrink-0">
          <img src={dog2} alt="Image 1" className="w-full h-full px-3" />
        </li>
        <li className="w-550 h-413 flex-shrink-0">
          <img src={dog1} alt="Image 2" className="w-full h-full px-3" />
        </li>
        <li className="w-550 h-413 flex-shrink-0">
          <img src={dog3} alt="Image 3" className="w-full h-full px-3" />
        </li>
        {/* Add more images as needed */}
      </ul>

      <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center ">
        <img
          src={icon_arrow1}
          onClick={() => prev()}
          className="bg-white text-gray-500 px-4  py-2 rounded-full ml-2 absolute left-10 transform -translate-y-1/2 top-1/2 rotate-90 w-[56px] h-[56px]"
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
