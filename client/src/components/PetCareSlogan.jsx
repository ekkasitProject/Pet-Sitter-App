import React from "react";
import shape_2 from "../assets/images/elements/Frame 427320928.svg";
import shape_3 from "../assets/images/elements/Ellipse 15.svg";
import shape_5 from "../assets/images/elements/Dogfoot.svg";
import cat from "../assets/images/elements/allcat.svg";

import shape_6 from "../assets/images/elements/Ellipse 17.svg";
import dogImg from "../assets/images/elements/dogyellow.svg";
import star from "../assets/images/elements/Star 1.svg";
import circle from "../assets/images/elements/Ellipse 16.svg";

const PetCareSlogan = () => {
  return (
    <div
      className="flex w-[90%] mx-auto mt-16"
      style={{ fontFamily: "Satoshi-black" }}
    >
      <div className="w-[25%]  h-[500px] relative">
        <img
          className="absolute top-[50%] right-[30%] z-10"
          src={shape_2}
          alt=""
        />
        <img className="absolute top-[30%] left-[10%]" src={shape_3} alt="" />
        <img
          className="absolute right-4 top-[3rem] w-[145px]"
          src={shape_5}
          alt=""
        />
        <img
          className="absolute w-[220px]  bottom-0 right-0"
          src={cat}
          alt=""
        />
      </div>
      <div className="mx-16 flex flex-col justify-center items-center">
        <h1 className="text-[5.1rem] font-black tracking-wide text-center leading-12">
          Pet Sitter<span className="text-[#ff7038]">,</span> <br /> Perfect
          <span className="text-[#76d0fc]">,</span>
          <br />
          For Your Pet<span className="text-[#ffca62]">.</span>
        </h1>
        <p className="text-center text-[#7B7E8F] font-semibold tracking-wide">
          Find your perfect pet sitter with us.
        </p>
      </div>

      <div className="w-[25%]  h-[500px] relative">
        <img className="absolute bottom-0 left-0  z-10" src={shape_6} alt="" />
        <img className="absolute top-[0] left-[10%]" src={star} alt="" />
        <img className="absolute right-4 top-[9rem]" src={dogImg} alt="" />
        <img className="absolute  bottom-[6rem] left-0  " src={circle} alt="" />
      </div>
    </div>
  );
};

export default PetCareSlogan;
