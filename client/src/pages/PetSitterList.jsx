import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import useFilter from "../hooks/useFilter.js";
import PetSitterCard from "../components/PetSitterCard.jsx";
import Pagination from "@mui/material/Pagination";
import HeaderAuth from "../components/HeaderAuth";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import { FilterContext } from "../App";
import { SearchIcon } from "../components/Icons.jsx";

import {
  ChipsOrange,
  ChipsPink,
  ChipsGreen,
  ChipsBlue,
} from "../components/Chips.jsx";

function PetSitterList() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [keywords, setKeywords] = useState("");

  const [isSearch, setIsSearch] = useState(true);
  const { petsitter_id } = useParams();
  const [selectedAnimals, setSelectedAnimals] = useState([]);
  const {
    petSitterLists,
    totalPages,
    getPetSitterLists,
    getPetSitterById,
    isError,
    isLoading,
  } = useFilter();
  const { petType, setPetType, experience, setExperience } =
    useContext(FilterContext);

  const getFilter = (pets) => {
    pets.map((pet) => {
      if (petType.includes(pet)) {
        const checkbox = document.getElementById(pet);
        checkbox.checked = true;
      }
    });
  };

  useEffect(() => {
    console.log(petType);
    console.log(petSitterLists);
    getFilter(["dog", "cat", "rabbit", "bird"]);
    getPetSitterLists({ petType, keywords, experience, page });
  }, [isSearch]);
  //ไม่สามารถใส่getPetSitterLists()ไว้ในhandleSearchเลยได้ จะเกิดbugไม่สามารถใช้filterได้ จึงต้องมี isSearch
  const handleSearch = () => {
    if (isSearch) {
      setIsSearch(false);
    } else {
      setIsSearch(true);
    }
    let tempPetType = selectedAnimals.join(" ");
    setPetType(tempPetType);
    console.log(petType);
    if (petType.charAt(0) === " ") {
      let tempData = petType.slice(1);
      setPetType(tempData);
    }
    console.log(keywords);
    console.log(petType);
    console.log(experience);
  };

  const handlePetType = (value, id) => {
    const activeData = document.getElementById(id).checked;
    if (activeData) {
      setSelectedAnimals([...selectedAnimals, value]);
    } else {
      setSelectedAnimals(selectedAnimals.filter((pet) => pet !== value));
    }
  };

  const handleChip = (pet) => {
    if (pet === "dog") {
      return <ChipsGreen petType="Dog" />;
    }
    if (pet === "cat") {
      return <ChipsPink petType="Cat" />;
    }
    if (pet === "bird") {
      return <ChipsBlue petType="Bird" />;
    }
    if (pet === "rabbit") {
      return <ChipsOrange petType="Rabbit" />;
    }
  };

  const handlePage = (e, p) => {
    setPage(p);
  };

  const handleClear = () => {
    setKeywords(""); // Clear the keywords input
    setExperience(""); // Clear the experience dropdown
    setPetType(""); // Clear the petType checkboxes
    setSelectedAnimals([]);
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
  };

  return (
    <>
      <HeaderAuth />
      <div className="pet-sitter-page-wrapper w-screen h-auto font-satoshi flex flex-col ">
        <header className="w-screen h-auto  py-10 mb-10 px-16">
          <h1 className="text-headLine3 text-primaryGray2 w-[85%] mx-auto">
            Search For Pet Sitter
          </h1>
        </header>
        <div className="pet-sitter-list-wrapper mb-10 w-full h-full flex flex-row relative justify-center ">
          <div className="pet-sitter-filter w-1/4 h-full flex justify-center">
            <div className="pet-sitter-list-box rounded-lg shadow-custom w-10/12 h-1/4 sticky top-[130px] left-[60px] p-5 pt-5 ">
              <div className="w-full h-1/4 relative">
                <label htmlFor="search for pet sitter">
                  <h1>Search</h1>
                </label>
                <input
                  type="text"
                  className="border-primaryGray5 border-2 rounded-lg w-full h-[45px] mt-2 text-primaryGray2 pl-3 focus:outline-none focus:border-primaryOrange3 "
                  value={keywords}
                  onChange={(e) => {
                    setKeywords(e.target.value);
                  }}
                />
                <div className="fill-primaryGray4 text-primaryGray4 absolute top-11 right-3">
                  <SearchIcon />
                </div>
              </div>
              <div className="w-full h-1/4 mt-4 ">
                <h1>Pet Type:</h1>

                <div className="flex flex-row justify-evenly mt-3">
                  <div className="flex flex-row gap-1 items-center">
                    <input
                      type="checkbox"
                      id="dog"
                      name="dog"
                      value="dog"
                      className=" h-5 w-5 peer relative shrink-0 appearance-none rounded border-2 border-primaryGray4 focus:outline-none checked:bg-primaryOrange2 checked:border-primaryOrange4 hover:border-primaryOrange4 after:absolute after:left-0 after:top-0 after:h-full after:w-full after:bg-[url('data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9JzMwMHB4JyB3aWR0aD0nMzAwcHgnICBmaWxsPSIjZmZmZmZmIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgdmVyc2lvbj0iMS4xIiB4PSIwcHgiIHk9IjBweCI+PHRpdGxlPmljb25fYnlfUG9zaGx5YWtvdjEwPC90aXRsZT48ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz48ZyBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48ZyBmaWxsPSIjZmZmZmZmIj48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyNi4wMDAwMDAsIDI2LjAwMDAwMCkiPjxwYXRoIGQ9Ik0xNy45OTk5ODc4LDMyLjQgTDEwLjk5OTk4NzgsMjUuNCBDMTAuMjI2Nzg5MSwyNC42MjY4MDE0IDguOTczMTg2NDQsMjQuNjI2ODAxNCA4LjE5OTk4Nzc5LDI1LjQgTDguMTk5OTg3NzksMjUuNCBDNy40MjY3ODkxNCwyNi4xNzMxOTg2IDcuNDI2Nzg5MTQsMjcuNDI2ODAxNCA4LjE5OTk4Nzc5LDI4LjIgTDE2LjU4NTc3NDIsMzYuNTg1Nzg2NCBDMTcuMzY2ODIyOCwzNy4zNjY4MzUgMTguNjMzMTUyOCwzNy4zNjY4MzUgMTkuNDE0MjAxNCwzNi41ODU3ODY0IEw0MC41OTk5ODc4LDE1LjQgQzQxLjM3MzE4NjQsMTQuNjI2ODAxNCA0MS4zNzMxODY0LDEzLjM3MzE5ODYgNDAuNTk5OTg3OCwxMi42IEw0MC41OTk5ODc4LDEyLjYgQzM5LjgyNjc4OTEsMTEuODI2ODAxNCAzOC41NzMxODY0LDExLjgyNjgwMTQgMzcuNzk5OTg3OCwxMi42IEwxNy45OTk5ODc4LDMyLjQgWiI+PC9wYXRoPjwvZz48L2c+PC9nPjwvc3ZnPg==')] after:bg-[length:40px] after:bg-center after:bg-no-repeat after:content-[''] "
                      onChange={(e) => {
                        handlePetType(e.target.value, e.target.value);
                      }}
                    />
                    <label htmlFor="dog">Dog</label>
                  </div>
                  <div className="flex flex-row gap-1 items-center">
                    <input
                      type="checkbox"
                      id="cat"
                      name="cat"
                      value="cat"
                      className="h-5 w-5 peer relative shrink-0 appearance-none rounded border-2 border-primaryGray4 focus:outline-none checked:bg-primaryOrange2 checked:border-primaryOrange4 hover:border-primaryOrange4 after:absolute after:left-0 after:top-0 after:h-full after:w-full after:bg-[url('data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9JzMwMHB4JyB3aWR0aD0nMzAwcHgnICBmaWxsPSIjZmZmZmZmIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgdmVyc2lvbj0iMS4xIiB4PSIwcHgiIHk9IjBweCI+PHRpdGxlPmljb25fYnlfUG9zaGx5YWtvdjEwPC90aXRsZT48ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz48ZyBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48ZyBmaWxsPSIjZmZmZmZmIj48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyNi4wMDAwMDAsIDI2LjAwMDAwMCkiPjxwYXRoIGQ9Ik0xNy45OTk5ODc4LDMyLjQgTDEwLjk5OTk4NzgsMjUuNCBDMTAuMjI2Nzg5MSwyNC42MjY4MDE0IDguOTczMTg2NDQsMjQuNjI2ODAxNCA4LjE5OTk4Nzc5LDI1LjQgTDguMTk5OTg3NzksMjUuNCBDNy40MjY3ODkxNCwyNi4xNzMxOTg2IDcuNDI2Nzg5MTQsMjcuNDI2ODAxNCA4LjE5OTk4Nzc5LDI4LjIgTDE2LjU4NTc3NDIsMzYuNTg1Nzg2NCBDMTcuMzY2ODIyOCwzNy4zNjY4MzUgMTguNjMzMTUyOCwzNy4zNjY4MzUgMTkuNDE0MjAxNCwzNi41ODU3ODY0IEw0MC41OTk5ODc4LDE1LjQgQzQxLjM3MzE4NjQsMTQuNjI2ODAxNCA0MS4zNzMxODY0LDEzLjM3MzE5ODYgNDAuNTk5OTg3OCwxMi42IEw0MC41OTk5ODc4LDEyLjYgQzM5LjgyNjc4OTEsMTEuODI2ODAxNCAzOC41NzMxODY0LDExLjgyNjgwMTQgMzcuNzk5OTg3OCwxMi42IEwxNy45OTk5ODc4LDMyLjQgWiI+PC9wYXRoPjwvZz48L2c+PC9nPjwvc3ZnPg==')] after:bg-[length:40px] after:bg-center after:bg-no-repeat after:content-[''] "
                      onChange={(e) => {
                        handlePetType(e.target.value, e.target.value);
                      }}
                    />
                    <label htmlFor="cat">Cat</label>
                  </div>
                  <div className="flex flex-row gap-1 items-center">
                    <input
                      type="checkbox"
                      id="bird"
                      name="bird"
                      value="bird"
                      className="h-5 w-5 peer relative shrink-0 appearance-none rounded border-2 border-primaryGray4 focus:outline-none checked:bg-primaryOrange2 checked:border-primaryOrange4 hover:border-primaryOrange4 after:absolute after:left-0 after:top-0 after:h-full after:w-full after:bg-[url('data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9JzMwMHB4JyB3aWR0aD0nMzAwcHgnICBmaWxsPSIjZmZmZmZmIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgdmVyc2lvbj0iMS4xIiB4PSIwcHgiIHk9IjBweCI+PHRpdGxlPmljb25fYnlfUG9zaGx5YWtvdjEwPC90aXRsZT48ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz48ZyBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48ZyBmaWxsPSIjZmZmZmZmIj48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyNi4wMDAwMDAsIDI2LjAwMDAwMCkiPjxwYXRoIGQ9Ik0xNy45OTk5ODc4LDMyLjQgTDEwLjk5OTk4NzgsMjUuNCBDMTAuMjI2Nzg5MSwyNC42MjY4MDE0IDguOTczMTg2NDQsMjQuNjI2ODAxNCA4LjE5OTk4Nzc5LDI1LjQgTDguMTk5OTg3NzksMjUuNCBDNy40MjY3ODkxNCwyNi4xNzMxOTg2IDcuNDI2Nzg5MTQsMjcuNDI2ODAxNCA4LjE5OTk4Nzc5LDI4LjIgTDE2LjU4NTc3NDIsMzYuNTg1Nzg2NCBDMTcuMzY2ODIyOCwzNy4zNjY4MzUgMTguNjMzMTUyOCwzNy4zNjY4MzUgMTkuNDE0MjAxNCwzNi41ODU3ODY0IEw0MC41OTk5ODc4LDE1LjQgQzQxLjM3MzE4NjQsMTQuNjI2ODAxNCA0MS4zNzMxODY0LDEzLjM3MzE5ODYgNDAuNTk5OTg3OCwxMi42IEw0MC41OTk5ODc4LDEyLjYgQzM5LjgyNjc4OTEsMTEuODI2ODAxNCAzOC41NzMxODY0LDExLjgyNjgwMTQgMzcuNzk5OTg3OCwxMi42IEwxNy45OTk5ODc4LDMyLjQgWiI+PC9wYXRoPjwvZz48L2c+PC9nPjwvc3ZnPg==')] after:bg-[length:40px] after:bg-center after:bg-no-repeat after:content-[''] "
                      onChange={(e) => {
                        handlePetType(e.target.value, e.target.value);
                      }}
                    />
                    <label htmlFor="bird">Bird</label>
                  </div>
                  <div className="flex flex-row gap-1 items-center">
                    <input
                      type="checkbox"
                      id="rabbit"
                      name="rabbit"
                      value="rabbit"
                      className="h-5 w-5 peer relative shrink-0 appearance-none rounded border-2 border-primaryGray4 focus:outline-none checked:bg-primaryOrange2 checked:border-primaryOrange4 hover:border-primaryOrange4 after:absolute after:left-0 after:top-0 after:h-full after:w-full after:bg-[url('data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9JzMwMHB4JyB3aWR0aD0nMzAwcHgnICBmaWxsPSIjZmZmZmZmIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgdmVyc2lvbj0iMS4xIiB4PSIwcHgiIHk9IjBweCI+PHRpdGxlPmljb25fYnlfUG9zaGx5YWtvdjEwPC90aXRsZT48ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz48ZyBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48ZyBmaWxsPSIjZmZmZmZmIj48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyNi4wMDAwMDAsIDI2LjAwMDAwMCkiPjxwYXRoIGQ9Ik0xNy45OTk5ODc4LDMyLjQgTDEwLjk5OTk4NzgsMjUuNCBDMTAuMjI2Nzg5MSwyNC42MjY4MDE0IDguOTczMTg2NDQsMjQuNjI2ODAxNCA4LjE5OTk4Nzc5LDI1LjQgTDguMTk5OTg3NzksMjUuNCBDNy40MjY3ODkxNCwyNi4xNzMxOTg2IDcuNDI2Nzg5MTQsMjcuNDI2ODAxNCA4LjE5OTk4Nzc5LDI4LjIgTDE2LjU4NTc3NDIsMzYuNTg1Nzg2NCBDMTcuMzY2ODIyOCwzNy4zNjY4MzUgMTguNjMzMTUyOCwzNy4zNjY4MzUgMTkuNDE0MjAxNCwzNi41ODU3ODY0IEw0MC41OTk5ODc4LDE1LjQgQzQxLjM3MzE4NjQsMTQuNjI2ODAxNCA0MS4zNzMxODY0LDEzLjM3MzE5ODYgNDAuNTk5OTg3OCwxMi42IEw0MC41OTk5ODc4LDEyLjYgQzM5LjgyNjc4OTEsMTEuODI2ODAxNCAzOC41NzMxODY0LDExLjgyNjgwMTQgMzcuNzk5OTg3OCwxMi42IEwxNy45OTk5ODc4LDMyLjQgWiI+PC9wYXRoPjwvZz48L2c+PC9nPjwvc3ZnPg==')] after:bg-[length:40px] after:bg-center after:bg-no-repeat after:content-[''] "
                      onChange={(e) => {
                        handlePetType(e.target.value, e.target.value);
                      }}
                    />
                    <label htmlFor="rabbit">Rabbit</label>
                  </div>
                </div>
              </div>

              <div className="w-full h-1/4 mt-4 ">
                <label htmlFor="dropdown">
                  <h1>Experience:</h1>
                </label>
                <select
                  id="experience"
                  name="experience"
                  className=" border-primaryGray5 border-2 rounded-lg w-full py-2 px-3 mt-3 focus:border-primaryOrange2 focus:outline-none"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                >
                  <option disabled value="">
                    -- Select a experience --
                  </option>
                  <option value="0-2 Years">0-2 Years</option>
                  <option value="3-5 Years">3-5 Years</option>
                  <option value="5+ Years">5+ Years</option>
                </select>
              </div>
              <div className="w-full h-1/4 flex flex-row gap-2 justify-center items-center mt-7 mb-3">
                <button
                  onClick={handleClear}
                  className="w-[150px] h-[50px] py-2  bg-primaryOrange6 rounded-full active:text-primaryOrange1 text-primaryOrange2 hover:text-primaryOrange3 disabled:bg-primaryGray6 disabled:text-primaryGray5"
                >
                  Clear
                </button>
                <button
                  onClick={() => {
                    handleSearch();
                  }}
                  className="w-[150px] h-[50px] py-2 bg-primaryOrange2 rounded-full active:bg-primaryOrange1 text-white hover:bg-primaryOrange3 disabled:bg-primaryGray4 disabled:text-primaryGray3"
                >
                  Search
                </button>
              </div>
            </div>
          </div>
          {/* Pet Sitter List Section */}
          <div className="pet-sitter-list-section px-6 h-full w-3/5 flex flex-col items-center">
            {isError ? <h1>Request failed. Please, try again later</h1> : null}
            {isLoading ? <h1>Loading ....</h1> : null}

            {petSitterLists.map((petSitter) => {
              return (
                <PetSitterCard
                  key={petSitter.petsitter_id}
                  petsitterId={petSitter.petsitter_id}
                  petSitterName={petSitter.pet_sitter_name}
                  petSitterusername={petSitter.petsitter.username}
                  experience={petSitter.experience}
                  province={petSitter.my_place}
                  petSitterImage={petSitter.image_gallery[0]}
                  petSitterProfileImage={petSitter.petsitter.image_profile}
                >
                  {petSitter.pet_type.map((pet, index) => {
                    return <span key={index}>{handleChip(pet)}</span>;
                  })}
                </PetSitterCard>
              );
            })}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default PetSitterList;
