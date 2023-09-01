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
        <header className="w-screen h-auto  py-10 mb-10 px-16">
          <h1 className="text-2xl text-primaryGray2">Search For Pet Sitter</h1>
        </header>
        <div className="pet-sitter-list-wrapper w-full h-full flex flex-row relative">
          <div className="pet-sitter-filter w-1/3 h-full ">
            <div className="pet-sitter-list-box rounded-lg shadow-custom w-10/12 h-1/4 sticky top-[130px] left-[60px] p-5 pt-7 ">
              <div className="w-full h-1/4 ">
                <label htmlFor="search for pet sitter">
                  <h1>Search</h1>
                </label>
                <input
                  type="text"
                  value=""
                  className="border-gray-200 border-2 rounded-lg w-full h-[45px]"
                />
              </div>
              <div className="w-full h-1/4 ">
                <h1>Pet Type:</h1>
                <div className="flex flex-row justify-evenly mt-3">
                  <div className="flex flex-row gap-2 items-center">
                    <input
                      type="checkbox"
                      id="dog"
                      name="dog"
                      className="h-4 w-4 "
                    />
                    <label for="dog">Dog</label>
                  </div>
                  <div className="flex flex-row gap-2 items-center">
                    <input
                      type="checkbox"
                      id="cat"
                      name="cat"
                      className="h-4 w-4 "
                    />
                    <label for="dog">Cat</label>
                  </div>
                  <div className="flex flex-row gap-2 items-center">
                    <input
                      type="checkbox"
                      id="bird"
                      name="bird"
                      className="h-4 w-4 "
                    />
                    <label for="dog">Bird</label>
                  </div>
                  <div className="flex flex-row gap-2 items-center">
                    <input
                      type="checkbox"
                      id="rabbit"
                      name="rabbit"
                      className="h-4 w-4 "
                    />
                    <label for="dog">Rabbit</label>
                  </div>
                </div>
              </div>
              {/*<div className="w-full h-1/5 bg-pink-300">
                <h1>Rating:</h1>
  </div>*/}
              <div className="w-full h-1/4">
                <label for="dropdown">
                  <h1>Experience:</h1>
                </label>
                <select
                  id="experience"
                  name="experience"
                  class=" border-gray-200 border-2 rounded-lg w-full py-2 px-3 mt-3"
                >
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                  <option value="option4">Option 4</option>
                </select>
              </div>
              <div className="w-full h-1/4 flex flex-row gap-2 justify-center items-center">
                <button class="w-[150px] h-[50px] py-2  bg-orange-100 rounded-full hover:bg-orange-600 text-orange-500">
                  Clear
                </button>
                <button class="w-[150px] h-[50px] py-2 bg-orange-500 rounded-full hover:bg-orange-600 text-white">
                  Search
                </button>
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
