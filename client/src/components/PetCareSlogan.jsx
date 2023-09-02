import React, { useState } from "react";
import shape_2 from "../assets/images/elements/Frame 427320928.svg";
import shape_3 from "../assets/images/elements/Ellipse 15.svg";
import shape_5 from "../assets/images/elements/Dogfoot.svg";
import cat from "../assets/images/elements/allcat.svg";

import shape_6 from "../assets/images/elements/Ellipse 17.svg";
import dogImg from "../assets/images/elements/dogyellow.svg";
import star from "../assets/images/elements/Star 1.svg";
import circle from "../assets/images/elements/Ellipse 16.svg";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";

import FormControlLabel from "@mui/material/FormControlLabel";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const PetCareSlogan = () => {
  const [animal, setAnimal] = useState("");
  const [experience, setExperience] = useState(""); // Initialize experience state

  const handleChangeAnimal = (event) => {
    setAnimal(event.target.value);
  };

  const handleChangeExperience = (event) => {
    setExperience(event.target.value); // Update the experience state
  };

  return (
    <>
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
          <img
            className="absolute bottom-0 left-0  z-10"
            src={shape_6}
            alt=""
          />
          <img className="absolute top-[0] left-[10%]" src={star} alt="" />
          <img className="absolute right-4 top-[9rem]" src={dogImg} alt="" />
          <img
            className="absolute  bottom-[6rem] left-0  "
            src={circle}
            alt=""
          />
        </div>
      </div>

      <div className="w-[60%] mx-auto  mt-8 mb-8  rounded-xl  shadow-sm shadow-slate-700/20 ">
        <div className="">
          <div className="w-[100%] flex items-center bg-[#F6F6F9] py-4 px-4">
            <p className="mr-4">Pet type: </p>
            <FormControlLabel
              control={
                <Checkbox
                  {...label}
                  checked={animal === "dog"}
                  onChange={handleChangeAnimal}
                  sx={{
                    color: "#DCDFED",
                    "&.Mui-checked": {
                      color: "#FF7037",
                    },
                  }}
                  value="dog"
                />
              }
              label="Dog"
            />
            <FormControlLabel
              control={
                <Checkbox
                  {...label}
                  checked={animal === "cat"}
                  onChange={handleChangeAnimal}
                  sx={{
                    color: "#DCDFED",
                    "&.Mui-checked": {
                      color: "#FF7037",
                    },
                  }}
                  value="cat"
                />
              }
              label="Cat"
            />
            <FormControlLabel
              control={
                <Checkbox
                  {...label}
                  checked={animal === "bird"}
                  onChange={handleChangeAnimal}
                  sx={{
                    color: "#DCDFED",
                    "&.Mui-checked": {
                      color: "#FF7037",
                    },
                  }}
                  value="bird"
                />
              }
              label="Bird"
            />
            <FormControlLabel
              control={
                <Checkbox
                  {...label}
                  checked={animal === "rabbit"}
                  onChange={handleChangeAnimal}
                  sx={{
                    color: "#DCDFED",
                    "&.Mui-checked": {
                      color: "#FF7037",
                    },
                  }}
                  value="rabbit"
                />
              }
              label="Rabbit"
            />
          </div>
        </div>
        <div className="w-[100%] bg-white py-6 px-4 flex items-center ">
          <p className="mr-4">Experience</p>
          <FormControl sx={{ minWidth: 120 }} size="small">
            <InputLabel id="demo-simple-select-label">Years</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="animal"
              onChange={handleChangeExperience} // Use the correct handleChange function
              value={experience} // Set the value to the experience state
            >
              <MenuItem value={1}>0 Year</MenuItem>
              <MenuItem value={2}>1 Year</MenuItem>
              <MenuItem value={3}>2 Year</MenuItem>
            </Select>
          </FormControl>
          <button className="bg-[#FF7037] px-5 py-2 rounded-full text-white ml-4">
            Search
          </button>
        </div>
      </div>
    </>
  );
};

export default PetCareSlogan;
