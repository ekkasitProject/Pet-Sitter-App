import React, { useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes

function PetBookingCard(props) {
  const [isSelected, setIsSelected] = useState(false);

  const toggleSelection = () => {
    setIsSelected(!isSelected);
  };

  const cardClasses = `pet-sitter-list-card shadow-custom2 w-[240px] h-[240px] my-6 mx-3 p-2 rounded-md flex flex-col justify-center items-center cursor-pointer border-2 ${
    isSelected ? "border-primaryOrange4" : "border-white"
  }`;

  return (
    <div className="relative">
      <div className={cardClasses} onClick={toggleSelection}>
        <div className="pet-sitter-image-card w-[104px] h-[104px] cursor-pointer">
          <img
            src={props.PetImg}
            className="rounded-lg w-[104px] h-[104px] object-fill"
            alt="pet sitter picture"
          />
        </div>
        <div className="pet-sitter-profile w-2/3 h-auto pl-10 flex flex-col justify-around">
          <div className="flex flex-row gap-5">
            <div className="flex flex-col justify-center w-2/3">
              <h1 className="text-lg">
                {/* {props.PetName} */}
                <p>Daisy</p>
                </h1>
            </div>
          </div>
          <div className="flex flex-row gap-2">{props.children}</div>
        </div>
      </div>
    </div>
  );
}

export default PetBookingCard;
