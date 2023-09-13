import { Button2 } from "./Button";
import React, { useState, useContext } from "react";
import { ToggleContext } from "../pages/AuthenticatedApp";
import profile_user from "../assets/icons/profile.svg";
import fetchUserData from "../hooks/fetchUserData";
import { BackIcon } from "./Icons";

function CreatePet() {
  const { createPet, getAllPets } = fetchUserData();

  const [petname, setPetname] = useState("");
  const [petType, setPetType] = useState("");
  const [breed, setBreed] = useState("");
  const [sex, setSex] = useState("");
  const [age, setAge] = useState("");
  const [color, setColor] = useState("");
  const [weight, setWeight] = useState("");
  const [about, setAbout] = useState("");
  const [errors, setErrors] = useState({});
  const {
    toggleCreatePet,
    setToggleCreatePet,
    isAllPetChange,
    setIsAllPetChange,
  } = useContext(ToggleContext);

  const handleToggleCreatePet = () => {
    setToggleCreatePet(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      petname,
      pettype: petType,
      breed,
      sex,
      age,
      color,
      weight,
      about,
    };
    //console.log(data);
    createPet(data);
    handleToggleCreatePet();
  };

  /*
  const validateForm = () => {
    const newErrors = {};

    // Validate Name
    if (petname.length < 3) {
      newErrors.petname = "Petname must be more than 3 characters";
      let input = document.getElementById(`petname`);
      input.classList.add("border-red-500");
    } else {
      let input = document.getElementById(`petname`);
      input.classList.remove("border-red-500");
    }

    // Validate Pet Age

    if (age <= 0 || age >= 100) {
      newErrors.age = "age must be not more than 2 characters";
      let input = document.getElementById(`age`);
      input.classList.add("border-red-500");
    } else {
      let input = document.getElementById(`age`);
      input.classList.remove("border-red-500");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };*/

  return (
    <>
      <div className="w-full h-full flex flex-col justify-start shadow-custom3 rounded-lg p-12">
        <div className="flex gap-5">
          <button onClick={handleToggleCreatePet} className="text-primaryGray3">
            <BackIcon />
          </button>
          <div className="text-headLine3">Create Your Pet</div>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-10">
          <div className="flex justify-center relative items-center my-14 w-[220px] h-[220px] rounded-full bg-slate-200">
            <img className="object-fit" src={profile_user} alt="" />
            <button className="w-[60px] h-[60px] rounded-full bg-primaryOrange6 absolute bottom-[10px] right-0 flex justify-center items-center">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.875 10.875H13.125V4.125C13.125 3.82663 13.0065 3.54048 12.7955 3.32951C12.5845 3.11853 12.2984 3 12 3C11.7016 3 11.4155 3.11853 11.2045 3.32951C10.9935 3.54048 10.875 3.82663 10.875 4.125V10.875H4.125C3.82663 10.875 3.54048 10.9935 3.32951 11.2045C3.11853 11.4155 3 11.7016 3 12C3 12.2984 3.11853 12.5845 3.32951 12.7955C3.54048 13.0065 3.82663 13.125 4.125 13.125H10.875V19.875C10.875 20.1734 10.9935 20.4595 11.2045 20.6705C11.4155 20.8815 11.7016 21 12 21C12.2984 21 12.5845 20.8815 12.7955 20.6705C13.0065 20.4595 13.125 20.1734 13.125 19.875V13.125H19.875C20.1734 13.125 20.4595 13.0065 20.6705 12.7955C20.8815 12.5845 21 12.2984 21 12C21 11.7016 20.8815 11.4155 20.6705 11.2045C20.4595 10.9935 20.1734 10.875 19.875 10.875Z"
                  fill="#FF7037"
                />
              </svg>
            </button>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="petname">Pet Name*</label>
            <input
              id="petname"
              name="petname"
              type="petname"
              value={petname}
              onChange={(event) => setPetname(event.target.value)}
              placeholder="your pet name"
              required
              className="invalid:border-red-500 border-primaryGray5 border-2 rounded-lg w-full h-[45px] mt-2 text-primaryGray2 pl-3 focus:outline-none focus:border-primaryOrange3"
            />
            {errors.petname && (
              <p className="mt-2 text-sm text-red-600">{errors.petname}</p>
            )}
          </div>
          <div className="flex gap-8 flex-1 ">
            <div className="flex flex-col gap-1 flex-1">
              <label htmlFor="petType">Pet Type*</label>
              <select
                id="petType"
                name="petType"
                type="petType"
                value={petType}
                onChange={(event) => setPetType(event.target.value)}
                required
                className="invalid:border-red-500 border-primaryGray5 border-2 rounded-lg w-full h-[45px] mt-2 text-primaryGray2 pl-3 focus:outline-none focus:border-primaryOrange3"
              >
                <option disabled value="">
                  -- Select your pet type --
                </option>
                <option value="dog">Dog</option>
                <option value="cat">Cat</option>
                <option value="bird">Bird</option>
                <option value="rabbit">Rabbit</option>
              </select>
              {errors.petType && (
                <p className="mt-2 text-sm text-red-600">{errors.petType}</p>
              )}
            </div>
            <div className="flex flex-col gap-1 flex-1">
              <label htmlFor="breed">Breed*</label>
              <input
                id="breed"
                name="breed"
                type="text"
                value={breed}
                onChange={(event) => setBreed(event.target.value)}
                placeholder="Breed of your pet"
                required
                className="invalid:border-red-500 border-primaryGray5 border-2 rounded-lg w-full h-[45px] mt-2 text-primaryGray2 pl-3 focus:outline-none focus:border-primaryOrange3"
              />
              {errors.breed && (
                <p className="mt-2 text-sm text-red-600">{errors.breed}</p>
              )}
            </div>
          </div>
          <div className="flex gap-8 flex-1 ">
            <div className="flex flex-col gap-1 flex-1">
              <label htmlFor="sex">Sex*</label>
              <select
                id="sex"
                name="sex"
                required
                value={sex}
                onChange={(event) => setSex(event.target.value)}
                className="invalid:border-red-500 border-primaryGray5 border-2 rounded-lg w-full h-[45px] mt-2 text-primaryGray2 pl-3 focus:outline-none focus:border-primaryOrange3"
              >
                <option disabled value="">
                  -- Select sex of your pet --
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              {errors.sex && (
                <p className="mt-2 text-sm text-red-600">{errors.sex}</p>
              )}
            </div>
            <div className="flex flex-col gap-1 flex-1">
              <label htmlFor="age">Age(Year)*</label>
              <input
                type="number"
                id="age"
                name="age"
                required
                placeholder="0"
                value={age}
                onChange={(event) => setAge(event.target.value)}
                className="invalid:border-red-500 border-primaryGray5 border-2 rounded-lg w-full h-[45px] mt-2 text-primaryGray2 pl-3 focus:outline-none focus:border-primaryOrange3"
              />
            </div>
          </div>
          <div className="flex gap-8 flex-1 ">
            <div className="flex flex-col gap-1 flex-1">
              <label htmlFor="color">Color*</label>
              <input
                id="color"
                name="color"
                type="text"
                value={color}
                onChange={(event) => setColor(event.target.value)}
                placeholder="Describe color of your pet"
                required
                className="invalid:border-red-500 border-primaryGray5 border-2 rounded-lg w-full h-[45px] mt-2 text-primaryGray2 pl-3 focus:outline-none focus:border-primaryOrange3"
              />
              {errors.color && (
                <p className="mt-2 text-sm text-red-600">{errors.color}</p>
              )}
            </div>
            <div className="flex flex-col gap-1 flex-1">
              <label htmlFor="weight">Weight(Kilogram)*</label>
              <input
                id="weight"
                name="weight"
                type="number"
                value={weight}
                onChange={(event) => setWeight(event.target.value)}
                placeholder="Weight of your pet"
                required
                className="invalid:border-red-500 border-primaryGray5 border-2 rounded-lg w-full h-[45px] mt-2 text-primaryGray2 pl-3 focus:outline-none focus:border-primaryOrange3"
              />
              {errors.weight && (
                <p className="mt-2 text-sm text-red-600">{errors.weight}</p>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-1 flex-1">
            <label htmlFor="about">About</label>
            <textarea
              type="text"
              cols={20}
              rows={6}
              value={about}
              onChange={(event) => setAbout(event.target.value)}
              name="about"
              id="about"
              placeholder="Describe more about your pet"
              className="placeholder:pt-2 resize-none invalid:border-red-500 border-primaryGray5 border-2 rounded-lg w-full mt-2 text-primaryGray2 pl-3 focus:outline-none focus:border-primaryOrange3"
            />
          </div>
          <div className="flex justify-between items-center ">
            <button
              onClick={handleToggleCreatePet}
              className="px-8 py-3 bg-primaryOrange6 rounded-full active:text-primaryOrange1 text-primaryOrange2 hover:text-primaryOrange3 disabled:bg-primaryGray6 disabled:text-primaryGray5"
            >
              Cancel
            </button>
            <button
              type="submit"
              className=" h-[50px] px-5 py-1 bg-primaryOrange2 rounded-full active:bg-primaryOrange1 text-white hover:bg-primaryOrange3 disabled:bg-primaryGray4 disabled:text-primaryGray3"
            >
              Create Pet
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default CreatePet;
