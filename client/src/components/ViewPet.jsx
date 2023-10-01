import { Button2 } from "./Button";
import React, { useState, useContext, useEffect } from "react";
import { ToggleContext } from "../pages/AuthenticatedApp";
import profile_user from "../assets/icons/profile.svg";
import DeleteModal from "../components/DeleteModal";
import fetchUserData from "../hooks/fetchUserData";
import { BinIcon, BackIcon, PlusIcon } from "./Icons";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

function ViewPet() {
  const { getPetByID, petDetail, setPetDetail, updatePet, getAllPets } =
    fetchUserData();
  const [petname, setPetname] = useState("");
  const [petType, setPetType] = useState("");
  const [breed, setBreed] = useState("");
  const [sex, setSex] = useState("");
  const [age, setAge] = useState("");
  const [color, setColor] = useState("");
  const [weight, setWeight] = useState("");
  const [about, setAbout] = useState("");
  const [errors, setErrors] = useState({});
  const [isAlert, setIsAlert] = useState(false);
  const [avatars, setAvatars] = useState("");
  const [photo, setPhoto] = useState("");

  const {
    toggleViewPet,
    setToggleViewPet,
    toggleDeletePet,
    setToggleDeletePet,
    petID,
    setPetID,
    isAllPetChange,
    setIsAllPetChange,
  } = useContext(ToggleContext);

  const handleToggleViewPet = () => {
    setToggleViewPet(false);
  };

  const toggleDeleteModal = () => {
    setToggleDeletePet(true);
  };

  useEffect(() => {
    getPetByID();
    // console.log(petID);
    // console.log(petDetail);
  }, [petID]);

  useEffect(() => {
    if (petDetail) {
      setPetname(petDetail.petname);
      setPetType(petDetail.pettype);
      setBreed(petDetail.breed);
      setSex(petDetail.sex);
      setAge(petDetail.age);
      setColor(petDetail.color);
      setWeight(petDetail.weight);
      setAbout(petDetail.about);
      setPhoto(petDetail.image_profile);
    }
  }, [petDetail]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("petname", petname);
    formData.append("pettype", petType);
    formData.append("breed", breed);
    formData.append("sex", sex);
    formData.append("age", age);
    formData.append("color", color);
    formData.append("weight", weight);
    formData.append("about", about);
    //formData.append("image_profile", avatars);
    formData.append("avatar", avatars);

    formData.forEach((value, key) => {
      console.log(`Field: ${key}, Value: ${value}`);
    });

    console.log(avatars);
    console.log(formData);
    /*
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
    */
    // console.log(data);
    updatePet(formData);
    // setToggleViewPet(false);
    setIsAlert(true);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    //setAvatars(URL.createObjectURL(file));
    setAvatars(file);
    setPhoto(URL.createObjectURL(file));
    console.log(avatars);
  };

  setTimeout(() => {
    setIsAlert(false);
  }, 3000);

  return (
    <>
      <div className="relative w-full flex flex-col justify-start shadow-custom3 rounded-lg p-12 mr-20 ">
        {isAlert ? (
          <div className="fixed top-24 right-[660px] z-10">
            <Alert severity="success">
              <AlertTitle>Update Success!!</AlertTitle>
            </Alert>
          </div>
        ) : null}
        <div className="flex gap-5">
          <button onClick={handleToggleViewPet} className="text-primaryGray3">
            <BackIcon />
          </button>
          <div className="text-headLine3">Your Pet</div>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-10">
          <div className="flex justify-center relative items-center my-14 w-[220px] h-[220px] rounded-full bg-slate-200">
            <img
              className="object-cover w-[220px] h-[220px] rounded-full"
              src={photo}
              alt="pet photo"
            />
            <label
              htmlFor="upload"
              className="cursor-pointer w-[60px] h-[60px] text-primaryOrange2 rounded-full bg-primaryOrange6 absolute bottom-[10px] right-0 flex justify-center items-center"
            >
              <PlusIcon />
              <input
                id="upload"
                name="avatar"
                type="file"
                onChange={handleFileChange}
                hidden
              />
            </label>
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
          <div className=" w-full h-[10px]"></div>
          <div className="flex justify-between items-center ">
            <button
              onClick={handleToggleViewPet}
              className="px-8 py-3 bg-primaryOrange6 rounded-full active:text-primaryOrange1 text-primaryOrange2 hover:text-primaryOrange3 disabled:bg-primaryGray6 disabled:text-primaryGray5"
            >
              Cancel
            </button>
            <button
              type="submit"
              className=" h-[50px] px-5 py-1 bg-primaryOrange2 rounded-full active:bg-primaryOrange1 text-white hover:bg-primaryOrange3 disabled:bg-primaryGray4 disabled:text-primaryGray3"
            >
              Update Pet
            </button>
          </div>
        </form>
        <div className="absolute bottom-[130px] left-[45px]">
          <button
            onClick={toggleDeleteModal}
            className="flex text-primaryOrange2"
          >
            <BinIcon />
            Delete Pet
          </button>
        </div>
      </div>
    </>
  );
}

export default ViewPet;
