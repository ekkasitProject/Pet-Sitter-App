import React from "react";
import { useSnapCarousel } from "react-snap-carousel";
import dog1 from "../assets/images/elements/dog1.svg";
import dog2 from "../assets/images/elements/dog2.svg";
import dog3 from "../assets/images/elements/dog3.svg";

const AdvancedCarousel = () => {
  const { scrollRef, pages, activePageIndex, next, prev, goTo } =
    useSnapCarousel();

  // Define the number of items to show at a time
  const itemsToShow = 3;

  return (
    <div className="relative">
      <ul
        ref={scrollRef}
        className="flex justify-between overflow-x-auto scroll-snap-type-x-mandatory "
      >
        <li className="w-550 h-413 flex-shrink-0">
          <img src={dog2} alt="Image 1" className="w-full h-full" />
        </li>
        <li className="w-550 h-413 flex-shrink-0">
          <img src={dog1} alt="Image 2" className="w-full h-full" />
        </li>
        <li className="w-550 h-413 flex-shrink-0">
          <img src={dog3} alt="Image 3" className="w-full h-full" />
        </li>
        <li className="w-550 h-413 flex-shrink-0">
          <img src={dog2} alt="Image 1" className="w-full h-full" />
        </li>
        <li className="w-550 h-413 flex-shrink-0">
          <img src={dog1} alt="Image 2" className="w-full h-full" />
        </li>
        <li className="w-550 h-413 flex-shrink-0">
          <img src={dog3} alt="Image 3" className="w-full h-full" />
        </li>
        {/* Add more images as needed */}
      </ul>

      <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center ">
        <button
          onClick={() => prev()}
          className="bg-white text-gray-500 px-4 py-2 rounded-full ml-2 absolute left-10 transform -translate-y-1/2 top-1/2"
        >
          «
        </button>
        <button
          onClick={() => next()}
          className="bg-white text-gray-500 px-4 py-2 rounded-full ml-2 absolute right-10 transform -translate-y-1/2 top-1/2"
        >
          »
        </button>
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
