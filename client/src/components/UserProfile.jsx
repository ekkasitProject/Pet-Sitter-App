import { Button2 } from "./Button";
import React, { useState, useEffect, useContext } from "react";
import profile_user from "../assets/icons/profile.svg";
import { useParams } from "react-router-dom";
import fetchUserData from "../hooks/fetchUserData";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { PlusIcon } from "./Icons";
import Datepicker from "react-tailwindcss-datepicker";
import { ToggleContext } from "../pages/AuthenticatedApp";

function UserProfile() {
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
  const {
    getPetOwnerProfile,
    petOwnerProfile,
    setPetOwnerProfile,
    updatePetOwnerProfile,
    isError,
    isLoading,
  } = fetchUserData();
  const params = useParams();
  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  });
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [idNumber, setIDNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState();
  const [errors, setErrors] = useState({});
  const [isAlert, setIsAlert] = useState(false);
  const [avatars, setAvatars] = useState("");
  const [photo, setPhoto] = useState("");

  useEffect(() => {
    getPetOwnerProfile();
    // console.log(petOwnerProfile);
  }, []);

  function formatDate(isoDate) {
    const date = new Date(isoDate);

    // Extract year, month, and day components
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Adding 1 to month (zero-indexed) and zero-padding
    const day = String(date.getDate()).padStart(2, "0"); // Zero-padding day

    // Construct the formatted date string
    const formattedDate = `${day}-${month}-${year}`;

    return formattedDate;
  }

  useEffect(() => {
    if (petOwnerProfile) {
      setUsername(petOwnerProfile.username);
      setEmail(petOwnerProfile.email);
      setPhone(petOwnerProfile.phone);
      setIDNumber(petOwnerProfile.id_card_number);
      const newDate = formatDate(petOwnerProfile.date_of_birth);
      setDateOfBirth(newDate);
      setPhoto(petOwnerProfile.image_profile);
      setValue({ ...value, startDate: petOwnerProfile.date_of_birth });
      /*  const uniqueId = Date.now();
      setAvatars({
        [uniqueId]: petOwnerProfile.image_profile,
      });*/
    }
  }, [petOwnerProfile]);

  const validateForm = () => {
    const newErrors = {};

    // Validate Name
    if (username.length < 6 || username.length > 20) {
      newErrors.username = "Username must be between 6 and 20 characters";
      let input = document.getElementById(`userName`);
      input.classList.add("border-red-500");
    } else {
      let input = document.getElementById(`userName`);
      input.classList.remove("border-red-500");
    }

    // Validate Email
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!email.match(emailPattern)) {
      newErrors.email = "Invalid email format";
      let input = document.getElementById(`email`);
      input.classList.add("border-red-500");
    } else {
      let input = document.getElementById(`email`);
      input.classList.remove("border-red-500");
    }

    // Validate Phone
    const phonePattern = /^0[0-9]{9}$/;
    if (!phone.match(phonePattern)) {
      newErrors.phone = "Invalid phone number format";
      let input = document.getElementById(`phoneNumber`);
      input.classList.add("border-red-500");
    } else {
      let input = document.getElementById(`phoneNumber`);
      input.classList.remove("border-red-500");
    }

    // Validate ID Number
    const idNumberPattern = /^\d{13}$/;
    if (!idNumberPattern.test(idNumber)) {
      newErrors.idNumber = "ID Number must be 13 characters";
      let input = document.getElementById(`idNumber`);
      input.classList.add("border-red-500");
    } else {
      let input = document.getElementById(`idNumber`);
      input.classList.remove("border-red-500");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleValueChange = (newValue) => {
    console.log(newValue);
    setValue(newValue);
    setDateOfBirth(value.startDate);
    console.log(dateOfBirth);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(dateOfBirth);
    /*
    if (validateForm()) {
      const data = {
        username,
        email,
        phone,
        id_card_number: idNumber,
        date_of_birth: dateOfBirth,
      };
      console.log(data);
      updatePetOwnerProfile(data);
      setIsAlert(true);
    }
*/
    if (validateForm()) {
      const formData = new FormData();
      const newDate = new Date(value.startDate);

      formData.append("username", username);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("id_card_number", idNumber);
      formData.append("date_of_birth", newDate);
      formData.append("avatar", avatars);
      console.log(newDate);

      //console.log(avatars);
      //console.log(formData);
      updatePetOwnerProfile(formData);

      setIsAlert(true);
    }
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
      <div className="w-full h-full flex flex-col justify-start shadow-custom3 rounded-lg p-12">
        <div className="text-headLine3">Profile</div>
        {isAlert ? (
          <div className="fixed top-24 right-[660px] z-10">
            <Alert severity="success">
              <AlertTitle>Update Success!!</AlertTitle>
            </Alert>
          </div>
        ) : null}
        {isError ? <h1>Request failed. Please, try again later</h1> : null}
        {isLoading ? <h1>Loading ....</h1> : null}
        <form onSubmit={handleSubmit} className="flex flex-col gap-10">
          <div className="flex justify-center relative items-center my-14 w-[220px] h-[220px] rounded-full bg-slate-200">
            <img
              className="object-cover w-[220px] h-[220px] rounded-full"
              src={photo}
              alt="Profile Avatar"
            />
            {/*
            {Object.keys(avatars).map((avatarKey) => {
              const file = avatars[avatarKey];
              return (
                <div key={avatarKey} className="image-preview-container">
                  <img
                    className="object-cover w-[220px] h-[220px] rounded-full z-10"
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                  />
                </div>
              );
            })}
            */}
            {/* 
             <img
              className="object-cover"
              src={profile_user}
              //src={petOwnerProfile.image_profile}
              alt=""
            />
            */}

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
            {/*
          <button className="w-[60px] h-[60px] text-primaryOrange2 rounded-full bg-primaryOrange6 absolute bottom-[10px] right-0 flex justify-center items-center">
              <PlusIcon />
            </button>
          */}
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="userName">Your Name*</label>
            <input
              id="userName"
              name="userName"
              type="userName"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="your username "
              required
              className="invalid:border-red-500 border-primaryGray5 border-2 rounded-lg w-full h-[45px] mt-2 text-primaryGray2 pl-3 focus:outline-none focus:border-primaryOrange3"
            />
            {errors.username && (
              <p className="mt-2 text-sm text-red-600">{errors.username}</p>
            )}
          </div>
          <div className="flex gap-8 flex-1 ">
            <div className="flex flex-col gap-1 flex-1">
              <label htmlFor="email">Email*</label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="example@email.com"
                required
                className="invalid:border-red-500 border-primaryGray5 border-2 rounded-lg w-full h-[45px] mt-2 text-primaryGray2 pl-3 focus:outline-none focus:border-primaryOrange3"
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-600">{errors.email}</p>
              )}
            </div>
            <div className="flex flex-col gap-1 flex-1">
              <label htmlFor="phoneNumber">Phone*</label>
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                placeholder="Your phone number"
                required
                className="invalid:border-red-500 border-primaryGray5 border-2 rounded-lg w-full h-[45px] mt-2 text-primaryGray2 pl-3 focus:outline-none focus:border-primaryOrange3"
              />
              {errors.phone && (
                <p className="mt-2 text-sm text-red-600">{errors.phone}</p>
              )}
            </div>
          </div>
          <div className="flex gap-8 flex-1 ">
            <div className="flex flex-col gap-1 flex-1">
              <label htmlFor="idNumber">ID Number</label>
              <input
                type="text"
                id="idNumber"
                name="idNumber"
                placeholder="Enter your ID number"
                value={idNumber}
                onChange={(event) => setIDNumber(event.target.value)}
                className="invalid:border-red-500 border-primaryGray5 border-2 rounded-lg w-full h-[45px] mt-2 text-primaryGray2 pl-3 focus:outline-none focus:border-primaryOrange3"
              />

              {errors.idNumber && (
                <p className="mt-2 text-sm text-red-600">{errors.idNumber}</p>
              )}
            </div>
            <div className="flex flex-col gap-1 flex-1 ">
              <label htmlFor="dateOfBirth">Date Of Birth</label>
              <Datepicker
                id="dateOfBirth"
                name="dateOfBirth"
                value={value}
                onChange={handleValueChange}
                primaryColor={"orange"}
                useRange={false}
                asSingle={true}
                displayFormat={"DD/MM/YYYY"}
                placeholder={dateOfBirth}
                inputClassName="invalid:border-red-500 border-primaryGray5 border-2 rounded-lg w-full h-[45px] mt-2 text-primaryGray2 pl-3 focus:outline-none focus:border-primaryOrange3"
              />
              {/* 
              <label htmlFor="dateOfBirth">Date Of Birth</label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={dateOfBirth}
                onChange={(event) => setDateOfBirth(event.target.value)}
                className="invalid:border-red-500 border-primaryGray5 border-2 rounded-lg w-full h-[45px] mt-2 text-primaryGray2 px-3 focus:outline-none focus:border-primaryOrange3"
              />
              */}
            </div>
          </div>
          <div className="flex justify-end items-center ">
            <button
              type="submit"
              className=" h-[50px] px-5 py-1 bg-primaryOrange2 rounded-full active:bg-primaryOrange1 text-white hover:bg-primaryOrange3 disabled:bg-primaryGray4 disabled:text-primaryGray3"
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default UserProfile;
