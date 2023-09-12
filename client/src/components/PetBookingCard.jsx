import { Link } from "react-router-dom";
import { useState } from "react";

function PetBookingCard(props) {
  const [isSelected, setIsSelected] = useState(false);

  const toggleSelection = () => {
    setIsSelected(!isSelected);
  };

  return (
    <div
      className={`relative ${isSelected ? "bg-gray-200" : ""}`}
      onClick={toggleSelection}
    >
      <input
        type="checkbox"
        className="absolute top-10 right-5 z-10 cursor-pointer opacity-0"
        checked={isSelected}
        onChange={() => {}}
      />
      <Link
        to={`/petsitterlist/view/${props.petsisterId}`}
        className="pet-sitter-list-card shadow-custom2 w-[240px] h-[240px] my-6 mx-3 p-2 rounded-md flex flex-col justify-center items-center cursor-pointer border-2 border-white hover:border-primaryOrange4"
      >
        <div className="pet-sitter-image-card w-[104px] h-[104px] cursor-pointer">
          <img
            src={props.petSitterImage}
            className="rounded-lg w-[104px] h-[104px] object-fill"
            alt="pet sitter picture"
          />
        </div>
        <div className="pet-sitter-profile w-2/3 h-auto pl-10 flex flex-col justify-around">
          <div className="flex flex-row gap-5">
            <div className="flex flex-col justify-center w-2/3">
              <h1 className="text-lg">Daisy</h1>
              {/* {props.petSitterName} */}
            </div>
          </div>
          <div className="flex flex-row gap-2">{props.children}</div>
        </div>
      </Link>
    </div>
  );
}

export default PetBookingCard;
