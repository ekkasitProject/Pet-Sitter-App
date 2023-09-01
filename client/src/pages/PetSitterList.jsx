import { useState, useEffect } from "react";
import axios from "axios";
/*import { useDebouncedCallback } from "use-debounce";*/

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
          <div className="pet-sitter-list-section px-6 h-full w-3/5 flex flex-col items-center">
            <div className="pet-sitter-list-card shadow-custom2 w-full h-2/12  my-10 p-5 rounded-md flex flex-row">
              <div className="pet-sitter-image-card  w-1/3 h-full">
                <img
                  src="https://cdn.pic.in.th/file/picinth/test2b3994a0bf0671b1.jpeg"
                  className="rounded-lg w-[300px] h-[250px]"
                />
              </div>
              <div className="pet-sitter-image-card w-2/3 h-full pl-10 flex flex-col justify-around">
                <div className="flex flex-row gap-5">
                  <img
                    src="https://cdn.pic.in.th/file/picinth/test2b3994a0bf0671b1.jpeg"
                    className="rounded-full w-[60px] h-[60px]"
                  />
                  <div className="flex flex-col justify-center">
                    <h1 className="text-lg">Pet Sitter Shop Name</h1>
                    <h3 className="text-sm">By Pet Sitter Fullname</h3>
                  </div>
                </div>
                <div className="text-zinc-400">icon District, Province </div>
                <div className="flex flex-row gap-2">
                  <div className="inline-flex items-center border border-green-500 rounded-full px-3 py-1 text-green-500 bg-green-100">
                    <span class="text-sm font-semibold">Dog</span>
                  </div>
                  <div className="inline-flex items-center border border-pink-500 rounded-full px-3 py-1 text-pink-500 bg-pink-100">
                    <span class="text-sm font-semibold">Cat</span>
                  </div>
                  <div className="inline-flex items-center border border-blue-500 rounded-full px-3 py-1 text-blue-500 bg-blue-100">
                    <span class="text-sm font-semibold">Bird</span>
                  </div>
                  <div className="inline-flex items-center border border-orange-500 rounded-full px-3 py-1 text-orange-500 bg-orange-100">
                    <span class="text-sm font-semibold">Rabbit</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PetSitterList;
