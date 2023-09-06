import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useFilter from "../hooks/useFilter.js";
import PetSitterCard from "../components/PetSitterCard.jsx";
import Pagination from "@mui/material/Pagination";
import Checkbox from "../components/Checkbox.jsx";
import Header from "../components/Header";
import Footer from "../components/Footer";

import {
  ChipsOrange,
  ChipsPink,
  ChipsGreen,
  ChipsBlue,
} from "../components/Chips.jsx";

function PetSitterList() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [petType, setPetType] = useState("");
  const [keywords, setKeywords] = useState("");
  const [experience, setExperience] = useState("");
  const [isSearch, setIsSearch] = useState(true);

  const {
    petSitterLists,
    totalPages,
    getPetSitterLists,
    getPetSitterById,
    isError,
    isLoading,
  } = useFilter();

  // console.log(totalPages);

  useEffect(() => {
    //console.log(petType);
    console.log(petSitterLists);
    getPetSitterLists({ petType, keywords, experience, page });
  }, [isSearch]);

  const handleSearch = () => {
    if (isSearch) {
      setIsSearch(false);
    } else {
      setIsSearch(true);
    }
    if (petType.charAt(0) === " ") {
      let tempData = petType.slice(1);
      setPetType(tempData);
    }
  };
  {
    /*
  const handlePetType = (value, id) => {
    const activeData = document.getElementById(id).checked;
    let newData = [...petType];
    if (activeData) {
      newData.push(value);
      setPetType(newData);
    } else {
      newData = petType.filter((item) => item !== value);
      setPetType(newData);
    }
  };
 */
  }

  const handlePetType = (value, id) => {
    let newData = petType;
    const activeData = document.getElementById(id).checked;
    if (activeData) {
      if (newData === "") {
        setPetType(`${value}`);
      } else if (newData.charAt(0) === " ") {
        let tempData = newData.slice(1);
        setPetType(tempData + ` ${value}`);
      } else {
        setPetType(newData + ` ${value}`);
      }
    } else {
      let tempData = newData
        .replaceAll(` ${value}`, "")
        .replaceAll(`${value}`, "");
      setPetType(tempData);
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
    setPetType([]); // Clear the petType checkboxes
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
  };

  return (
    <>
      <Header />
      <div className="pet-sitter-page-wrapper w-screen h-auto font-satoshi flex flex-col ">
        <header className="w-screen h-auto  py-10 mb-10 px-16">
          <h1 className="text-headLine3 text-primaryGray2">
            Search For Pet Sitter
          </h1>
        </header>
        <div className="pet-sitter-list-wrapper w-full h-full flex flex-row relative justify-center ">
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
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-primaryGray4 absolute top-11 right-3"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M11 4C7.13401 4 4 7.13401 4 11C4 14.866 7.13401 18 11 18C12.8844 18 14.5949 17.2554 15.8533 16.0443C15.8806 16.0085 15.9106 15.9741 15.9433 15.9413C15.9759 15.9087 16.0103 15.8788 16.046 15.8516C17.2561 14.5934 18 12.8836 18 11C18 7.13401 14.866 4 11 4ZM18.0328 16.6166C19.2639 15.0771 20 13.1245 20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20C13.1255 20 15.0789 19.2632 16.6188 18.031L20.2933 21.7055C20.6838 22.0961 21.317 22.0961 21.7075 21.7055C22.098 21.315 22.098 20.6819 21.7075 20.2913L18.0328 16.6166Z"
                  />
                </svg>
              </div>
              <div className="w-full h-1/4 mt-4">
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
              {/*<div className="w-full h-1/5 bg-pink-300">
                <h1>Rating:</h1>
  </div>*/}
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
                  <option value={0}>0 Year</option>
                  <option value={1}>1 Year</option>
                  <option value={2}>2 Year</option>
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
            {isError ? <h1>Request failed</h1> : null}
            {isLoading ? <h1>Loading ...</h1> : null}

            {petSitterLists.map((petSitter) => {
              return (
                <PetSitterCard
                  petSitterName={petSitter.pet_sister_name}
                  province={petSitter.my_place}
                  petSitterImage={petSitter.image_gallery[1]}
                  petSitterProfileImage={petSitter.image_gallery[0]}
                  onClick={() =>
                    navigate(`/petsitter/view/${petSitter.petsister_id}`)
                  }
                >
                  {petSitter.pet_type.map((pet) => {
                    return <>{handleChip(pet)}</>;
                  })}
                </PetSitterCard>
              );
            })}
            {/* 
            <div className="pet-sitter-list-card shadow-custom2 w-full h-2/12  my-10 p-5 rounded-md flex flex-row cursor-pointer hover:border-2 hover:border-primaryOrange4">
              <div
                onClick={() =>
                  navigate(`/petsitterProfile/view/${petSitter.petsitter_id}`)
                }
                className="pet-sitter-image-card  w-1/3 h-full cursor-pointer"
              >
                <img
                  src="https://cdn.pic.in.th/file/picinth/test2b3994a0bf0671b1.jpeg"
                  className="rounded-lg w-[300px] h-[250px] object-fill "
                  alt="pet sitter picture"
                />
              </div>
              <div className="pet-sitter-profile w-2/3 h-auto pl-10 flex flex-col justify-around">
                <div className="flex flex-row gap-5">
                  <img
                    src="https://cdn.pic.in.th/file/picinth/test2b3994a0bf0671b1.jpeg"
                    className="rounded-full w-[60px] h-[60px]"
                    alt="pet sitter profile picture"
                  />
                  <div className="flex flex-col justify-center">
                    <h1 className="text-lg">Pet Sitter Shop Name</h1>
                    <h3 className="text-sm">By Pet Sitter Fullname</h3>
                  </div>
                </div>
                <div className="text-primaryGray3 flex flex-row items-center gap-2">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="fill-primaryGray3"
                  >
                    <path d="M12 2C9.87827 2 7.84344 2.84285 6.34315 4.34315C4.84285 5.84344 4 7.87827 4 10C4 15.4 11.05 21.5 11.35 21.76C11.5311 21.9149 11.7616 22.0001 12 22.0001C12.2384 22.0001 12.4689 21.9149 12.65 21.76C13 21.5 20 15.4 20 10C20 7.87827 19.1571 5.84344 17.6569 4.34315C16.1566 2.84285 14.1217 2 12 2ZM12 19.65C9.87 17.65 6 13.34 6 10C6 8.4087 6.63214 6.88258 7.75736 5.75736C8.88258 4.63214 10.4087 4 12 4C13.5913 4 15.1174 4.63214 16.2426 5.75736C17.3679 6.88258 18 8.4087 18 10C18 13.34 14.13 17.66 12 19.65ZM12 6C11.2089 6 10.4355 6.2346 9.77772 6.67412C9.11992 7.11365 8.60723 7.73836 8.30448 8.46927C8.00173 9.20017 7.92252 10.0044 8.07686 10.7804C8.2312 11.5563 8.61216 12.269 9.17157 12.8284C9.73098 13.3878 10.4437 13.7688 11.2196 13.9231C11.9956 14.0775 12.7998 13.9983 13.5307 13.6955C14.2616 13.3928 14.8864 12.8801 15.3259 12.2223C15.7654 11.5645 16 10.7911 16 10C16 8.93913 15.5786 7.92172 14.8284 7.17157C14.0783 6.42143 13.0609 6 12 6ZM12 12C11.6044 12 11.2178 11.8827 10.8889 11.6629C10.56 11.4432 10.3036 11.1308 10.1522 10.7654C10.0009 10.3999 9.96126 9.99778 10.0384 9.60982C10.1156 9.22186 10.3061 8.86549 10.5858 8.58579C10.8655 8.30608 11.2219 8.1156 11.6098 8.03843C11.9978 7.96126 12.3999 8.00087 12.7654 8.15224C13.1308 8.30362 13.4432 8.55996 13.6629 8.88886C13.8827 9.21776 14 9.60444 14 10C14 10.5304 13.7893 11.0391 13.4142 11.4142C13.0391 11.7893 12.5304 12 12 12Z" />
                  </svg>
                  <span>District, Province</span>
                </div>
                <div className="flex flex-row gap-2">
                  <div className="inline-flex items-center border border-secondaryGreen1 rounded-full px-3 py-1 text-secondaryGreen1 bg-secondaryGreen2">
                    <span className="text-sm font-semibold">Dog</span>
                  </div>
                  <div className="inline-flex items-center border border-secondaryPink1 rounded-full px-3 py-1 text-secondaryPink1 bg-secondaryPink2">
                    <span className="text-sm font-semibold">Cat</span>
                  </div>
                  <div className="inline-flex items-center border border-secondaryBlue1 rounded-full px-3 py-1 text-secondaryBlue1 bg-secondaryBlue2">
                    <span className="text-sm font-semibold">Bird</span>
                  </div>
                  <div className="inline-flex items-center border border-primaryOrange3 rounded-full px-3 py-1 text-primaryOrange3 bg-primaryOrange6">
                    <span className="text-sm font-semibold">Rabbit</span>
                  </div>
                </div>
              </div>
            </div>
             */}
          </div>
        </div>

        <Pagination
          className="flex items-center justify-center my-16"
          color="secondary"
          count={10} // ต้องใส่total page ที่รับข้อมูลมาจากฝั่งserver
          // page={page}
          onChange={handlePage}
        ></Pagination>
      </div>

      <Footer />
    </>
  );
}

export default PetSitterList;
