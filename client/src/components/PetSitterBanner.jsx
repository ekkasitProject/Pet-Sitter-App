import React from "react";
import circleYellow from "../assets/images/elements/circleyellow.svg";
import greenStar from "../assets/images/elements/greenstar.svg";
import circleBlue from "../assets/images/elements/halfcircleblue.svg";
import { Link } from "react-router-dom";

const PetSitterBanner = () => {
  return (
    <div className="w-[80%] mx-auto h-[448px] bg-[#FFF5EC] mb-12 relative rounded-xl overflow-hidden">
      <img
        className="absolute top-[-10%] right-[-3%]"
        src={circleYellow}
        alt=""
        style={{ clipPath: "circle(50%)" }} // เพิ่มคุณสมบัติ clipPath เพื่อควบคุมการแสดงผลของวงกลมสีเหลือง
      />
      <img className="absolute top-[28%] right-[10%]" src={greenStar} alt="" />
      <img className="absolute bottom-0 left-0" src={circleBlue} alt="" />
      <div className="absolute left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%]">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-[3rem] text-center font-medium leading-11">
            Perfect Pet Sitter <br /> For Your Pet
          </h1>
          <Link
            to="/petsitterlist"
            className="bg-[#FF7037] px-3 py-2 rounded-full text-white font-medium text-center w-[50%] mt-8"
          >
            Find A Pet Sitter
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PetSitterBanner;
