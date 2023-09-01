import { useState, useEffect } from "react";
import axios from "axios";
/*import { useDebouncedCallback } from "use-debounce";*/
import Button from "@mui/material/Button";

function PetSitterList() {
  return (
    <>
      <div
        className="pet-sitter-page-wrapper w-screen h-[1570px] "
        style={{ fontFamily: "Satoshi-Bold" }}
      >
        <header className="w-screen h-auto bg-slate-200 py-5 px-10">
          <h1 className="text-2xl text-primaryGray2">Search For Pet Sitter</h1>
        </header>
        <div className="pet-sitter-list-wrapper w-full h-full flex flex-row relative">
          <div className="pet-sitter-filter w-1/3 h-full ">
            <div className="pet-sitter-list-box rounded-lg shadow-lg w-3/12 h-4/5 fixed top-[90px] left-[60px] p-5">
              <div className="w-full h-1/4 ">
                <h1>Search</h1>
              </div>
              <div className="w-full h-1/4 bg-pink-300">
                <h1>Pet Type:</h1>
              </div>
              {/*<div className="w-full h-1/5 bg-pink-300">
                <h1>Rating:</h1>
  </div>*/}
              <div className="w-full h-1/4 bg-pink-300">
                <h1>Experience</h1>
              </div>
              <div className="w-full h-1/4 bg-pink-300">
                <h1>Button</h1>
              </div>
            </div>
          </div>
          {/* Pet Sitter List Section */}
          <div className="pet-sitter-list-section h-full w-2/3 bg-green-500 flex flex-col items-center">
            <div className="pet-sitter-list-card w-11/12 h-2/12 bg-green-300 my-10 p-5 rounded-md flex flex-row">
              <div className="pet-sitter-image-card bg-pink-400 w-1/3 h-full">
                <img
                  src="https://cdn.pic.in.th/file/picinth/test2b3994a0bf0671b1.jpeg"
                  className="rounded-lg w-[300px] h-[250px]"
                />
              </div>
              <div className="pet-sitter-image-card bg-pink-200 w-2/3 h-full pl-6">
                <div className="flex flex-row">
                  <img
                    src="https://cdn.pic.in.th/file/picinth/test2b3994a0bf0671b1.jpeg"
                    className="rounded-full w-[50px] h-[50px]"
                  />
                  <div>
                    <h1>Pet Sitter Shop Name</h1>
                    <h2>Pet Sitter Fullname</h2>
                  </div>
                </div>
                <div>Location</div>
                <div>Pet Type</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PetSitterList;
