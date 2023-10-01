import { useNavigate } from "react-router-dom";
import React, { useState, useContext, useEffect } from "react";
import { ToggleContext } from "./AuthenticatedApp";
import SideBarPetsitter from "../components/SideBarPetsitter";
import HeaderPetsitter from "../components/HeaderPetsitter";
import profile_user from "../assets/icons/profile.svg";
import { useParams } from "react-router-dom";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { PlusIcon, AddIcon, CloseIcon } from "../components/Icons";
import axios from "axios";
import jwtDecode from "jwt-decode";
import fetchUserData from "../hooks/fetchUserData";
function PetSitterProfile() {
  const { updatePetSitterProfile, isError, isLoading } = fetchUserData();
  const [fileGallery, setFileGallery] = useState([]);
  const [fileAvatar, setFileAvatar] = useState([]);
  const [formData, setFormData] = useState({
    avatars: [],
    username: "",
    idNumber: "",
    phone: "",
    email: "",
    introduction: "",
    tradename: "",
    experience: "",
    pettype: [],
    services: "",
    place: "",
    gallery: [],
    addressId: "",
    petsitterdetailId: "",
    address: "",
    district: "",
    subDistrict: "",
    province: "",
    postcode: "",
    petSitterId: null,
    isAlert: false,
  });
  const [formErrors, setFormErrors] = useState({
    fullName: "",
    idNumber: "",
    phone: "",
    email: "",
    address: "",
    district: "",
    subDistrict: "",
    province: "",
    postcode: "",
  });
  useEffect(() => {
    const token = localStorage.getItem("token");
    const getData = async () => {
      try {
        if (!token) {
          return;
        }
        const decodedToken = jwtDecode(token);
        // console.log("Decoded Token:", decodedToken);
        if (decodedToken.petsitterId) {
          const petSitterID = decodedToken.petsitterId;
          // console.log("petSitterID:", petSitterID);

          const result = await axios.get(
            `http://localhost:6543/petSitterUser/${petSitterID}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          //console.log(result.data.petSitterUser);

          setFormData((prevFormData) => ({
            ...prevFormData,
            petSitterId: petSitterID,
            avatars: result.data.petSitterUser.image_profile,
            fullName: result.data.petSitterUser.username,
            idNumber: result.data.petSitterUser.id_card_number,
            petsitterdetailId:
              result.data.petSitterUser.petsitterdetail[0].petsitterdetail_id,
            tradename:
              result.data.petSitterUser.petsitterdetail[0].pet_sitter_name,
            experience: result.data.petSitterUser.petsitterdetail[0].experience,
            pettype: result.data.petSitterUser.petsitterdetail[0].pet_type,
            place: result.data.petSitterUser.petsitterdetail[0].my_place,
            services: result.data.petSitterUser.petsitterdetail[0].services,
            gallery: result.data.petSitterUser.petsitterdetail[0].image_gallery,
            addressId: result.data.petSitterUser.addresses[0].address_id,
            address: result.data.petSitterUser.addresses[0].address_detail,
            district: result.data.petSitterUser.addresses[0].district,
            province: result.data.petSitterUser.addresses[0].province,
            subDistrict: result.data.petSitterUser.addresses[0].sub_district,
            postcode: result.data.petSitterUser.addresses[0].post_code,

            ...result.data.petSitterUser,
          }));
          setFileAvatar(result.data.petSitterUser.image_profile);
        } else {
          console.error("JWT does not contain petSitterID");
        }
      } catch (error) {
        console.error("An error occurred while fetching data:", error);
      }
    };

    getData();
  }, []);

  // update state
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Validate input on change
    validateInput(name, value);
  };
  let allPetString = formData.pettype.join(",");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newFormData = new FormData();

    newFormData.append("username", formData.fullName);
    newFormData.append("email", formData.email);
    newFormData.append("phone", formData.phone);
    newFormData.append("id_card_number", formData.idNumber);
    newFormData.append("avatar", fileAvatar);
    newFormData.append("introduction", formData.introduction);
    newFormData.append("pet_sitter_name", formData.tradename);
    newFormData.append("petsitterdetail_id", formData.petsitterdetailId);
    newFormData.append("services", formData.services);
    newFormData.append("my_place", formData.place);
    newFormData.append("experience", formData.experience);
    newFormData.append("address_id", formData.addressId);
    newFormData.append("address_detail", formData.address);
    newFormData.append("district", formData.district);
    newFormData.append("sub_district", formData.subDistrict);
    newFormData.append("province", formData.province);
    newFormData.append("post_code", formData.postcode);
    // newFormData.append("oldImageUrl", oldImageUrl);
    newFormData.append("pet_type", allPetString);

    for (let file of fileGallery) {
      newFormData.append("gallery", file);
    }
    // newFormData.forEach((value, key) => {
    //   console.log(`${key}: ${value}`);
    // });
    const isFormValid = Object.values(formErrors).every(
      (error) => error === ""
    );

    if (isFormValid) {
      // ถ้าข้อมูลถูกต้องทั้งหมดให้ดำเนินการส่งแบบฟอร์ม
      try {
        await updatePetSitterProfile(newFormData);

        // อัปเดตสถานะ isAlert เพื่อแสดงการแจ้งเตือน
        setFormData({ ...formData, isAlert: true });

        // กำหนดให้ isAlert เป็น false หลังจากผ่านเวลา 1 วินาที
        setTimeout(() => {
          setFormData({ ...formData, isAlert: false });
        }, 1000);
      } catch (error) {
        // จัดการข้อผิดพลาดที่เกิดขึ้นในการส่งข้อมูลไปยังเซิร์ฟเวอร์
        console.error("Error updating profile:", error);
      }
    } else {
      // ถ้าข้อมูลไม่ถูกต้อง ให้แสดงข้อความหรือทำอย่างอื่นตามที่คุณต้องการ
      console.error("Form contains errors. Please fix them before submitting.");
    }
  };

  useEffect(() => {
    const galleryImg = formData.gallery || [];
    const filesPromises = galleryImg.map(async (imageUrl) => {
      try {
        const response = await fetch(imageUrl);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const blob = await response.blob();
        const filename = imageUrl.substring(imageUrl.lastIndexOf("/") + 1);
        return new File([blob], filename, { type: blob.type });
      } catch (error) {
        console.error("Error loading file from URL:", error);
        return null;
      }
    });
    Promise.all(filesPromises)
      .then((files) => setFileGallery(files.filter((file) => file !== null)))
      .catch((error) => console.error("Error loading files from URLs:", error));
  }, [formData.gallery]);

  const handleRemovePet = (petName) => {
    const updatedPettype = formData.pettype.filter((pet) => pet !== petName);

    setFormData({
      ...formData,
      pettype: updatedPettype,
    });
  };

  const handleUpdatePet = (e) => {
    const selectedPetType = e.target.value;
    if (!formData.pettype.includes(selectedPetType)) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        pettype: [...prevFormData.pettype, selectedPetType],
      }));
    }
  };

  const remove = (index) => {
    let updatedFiles = [...fileGallery];
    updatedFiles.splice(index, 1);
    setFileGallery(updatedFiles);
  };

  const handleGalleryChange = (e) => {
    const newFiles = Array.from(e.target.files);
    const updatedFiles = [...fileGallery, ...newFiles];
    setFileGallery(updatedFiles);
  };
  const handleProfileChange = (event) => {
    const uniqueId = Date.now();
    const file = event.target.files[0];
    setFileAvatar(file);

    setFormData((prevFormData) => ({
      ...prevFormData,
      avatars: URL.createObjectURL(file),
    }));
  };

  // const validateForm = () => {
  //   const errors = {};

  //   if (formData.fullName.trim() === "") {
  //     errors.fullName = "Full name is required";
  //   }

  //   if (formData.idNumber.trim() === "" || formData.idNumber.length !== 13) {
  //     errors.idNumber = "ID Number must be 13 characters";
  //   }

  //   const phonePattern = /^[0-9]{10}$/;
  //   if (!phonePattern.test(formData.phone)) {
  //     errors.phone = "Invalid phone number format";
  //   }

  //   const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  //   if (!emailPattern.test(formData.email)) {
  //     errors.email = "Invalid email format";
  //   }

  //   if (formData.address.trim() === "") {
  //     errors.address = "Address Detail is required";
  //   }

  //   if (formData.district.trim() === "") {
  //     errors.district = "District is required";
  //   }

  //   if (formData.subDistrict.trim() === "") {
  //     errors.subDistrict = "Sub-district is required";
  //   }

  //   if (formData.province.trim() === "") {
  //     errors.province = "Province is required";
  //   }

  //   const postalCodePattern = /^[0-9]{5}$/;
  //   if (!postalCodePattern.test(formData.postcode)) {
  //     errors.postcode = "Invalid postcode format (should be 5 digits)";
  //   }

  //   setFormErrors(errors);

  //   // Check if there are no errors
  //   return Object.keys(errors).length === 0;
  // };

  const validateInput = (name, value) => {
    let error = "";

    if (name === "fullName") {
      if (value.trim() === "") {
        error = "Full name is required";
      }
    } else if (name === "idNumber") {
      if (value.length !== 13) {
        error = "ID Number must be 13 characters";
      }
    } else if (name === "phone") {
      if (!value.startsWith("0") || value.length !== 10) {
        error = "Invalid phone number format";
      }
    } else if (name === "email") {
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if (!emailPattern.test(value)) {
        error = "Invalid email format";
      }
    } else if (name === "address") {
      if (value.trim() === "") {
        error = "Address is required";
      }
    } else if (name === "district") {
      if (value.trim() === "") {
        error = "District is required";
      }
    } else if (name === "subDistrict") {
      if (value.trim() === "") {
        error = "Sub-district is required";
      }
    } else if (name === "province") {
      if (value.trim() === "") {
        error = "Province is required";
      }
    } else if (name === "postcode") {
      if (value.trim() === "") {
        error = "Postcode is required";
      }
    }

    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };
  return (
    <>
      <div className="w-screen h-auto flex flex-row justify-center font-satoshi">
        <SideBarPetsitter />
        <div className=" w-5/6 h-auto flex flex-col items-center ">
          <HeaderPetsitter />

          <form
            onSubmit={handleSubmit}
            className="min-h-[2900px] w-full px-14 flex flex-col pt-4 pb-20 bg-[#F6F6F9]"
          >
            {formData.isAlert ? (
              <div className="fixed top-24 right-[660px] z-10">
                <Alert severity="success">
                  <AlertTitle>Update Success!!</AlertTitle>
                </Alert>
              </div>
            ) : null}
            <div className="h-[100px] w-full flex justify-between items-center ">
              <div className="text-headLine3">Pet Sitter Profile</div>
              <button
                type="submit"
                className=" h-[50px] px-5 py-1 bg-primaryOrange2 rounded-full active:bg-primaryOrange1 text-white hover:bg-primaryOrange3 disabled:bg-primaryGray4 disabled:text-primaryGray3"
              >
                Update Profile
              </button>
            </div>
            <div className="h-[2500px] w-full flex flex-col gap-10 mt-1">
              <div className="flex flex-col justify-start items-start gap-6 w-full">
                <div className="bg-white w-full h-auto shadow-custom4 rounded-lg px-20 pt-12 pb-10 flex flex-col justify-start items-start gap-4">
                  <div className="text-headLine3 text-primaryGray4 w-full flex flex-row justify-start">
                    Basic Information
                  </div>
                  <div className="text-headLine4 w-full flex flex-row justify-start">
                    Profile Image
                  </div>
                  <div className="">
                    <div className="flex justify-center relative items-center my-8 w-[220px] h-[220px] rounded-full bg-slate-200">
                      <img
                        className="object-cover w-[220px] h-[220px] rounded-full"
                        src={formData.avatars}
                        alt=""
                      />

                      <label
                        htmlFor="upload1"
                        className="cursor-pointer w-[60px] h-[60px] text-primaryOrange2 rounded-full bg-primaryOrange6 absolute bottom-[10px] right-0 flex justify-center items-center"
                      >
                        <PlusIcon />
                        <input
                          id="upload1"
                          name="avatar"
                          type="file"
                          onChange={handleProfileChange}
                          hidden
                        />
                      </label>
                    </div>
                    <div className="">
                      {formData.avatars ? null : (
                        <div className="text-red-500">
                          Please, upload 1 of your photo
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-row gap-10 w-full">
                    <div className="flex-1">
                      <label htmlFor="fullName">Your full name*</label>
                      <input
                        id="fullName"
                        name="fullName"
                        type="text"
                        value={formData.fullName}
                        //placeholder="your fullName "
                        onChange={handleInputChange}
                        required
                        className="invalid:border-red-500 border-primaryGray5 border-2 rounded-lg w-full h-[45px] mt-2 text-primaryGray2 pl-3 focus:outline-none focus:border-primaryOrange3"
                      />
                      {formErrors.fullName && (
                        <p className="mt-2 text-sm text-red-600">
                          {formErrors.fullName}
                        </p>
                      )}
                    </div>
                    <div className="flex-1">
                      <label htmlFor="idNumber">ID Number*</label>
                      <input
                        type="tel"
                        id="idNumber"
                        name="idNumber"
                        maxLength={13}
                        value={formData.idNumber}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter your ID number"
                        className="invalid:border-red-500 border-primaryGray5 border-2 rounded-lg w-full h-[45px] mt-2 text-primaryGray2 pl-3 focus:outline-none focus:border-primaryOrange3"
                      />

                      {formErrors.idNumber && (
                        <p className="mt-2 text-sm text-red-600">
                          {formErrors.idNumber}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-10 flex-1 w-full">
                    <div className="flex flex-col w-full gap-1 flex-1">
                      <label htmlFor="phone">Phone Number*</label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        maxLength={10}
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Your phone number"
                        required
                        className="invalid:border-red-500 border-primaryGray5 border-2 rounded-lg w-full h-[45px] mt-2 text-primaryGray2 pl-3 focus:outline-none focus:border-primaryOrange3"
                      />
                      {formErrors.phone && (
                        <p className="mt-2 text-sm text-red-600">
                          {formErrors.phone}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col w-full gap-1 flex-1">
                      <label htmlFor="email">Email*</label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="example@email.com"
                        required
                        className="invalid:border-red-500 border-primaryGray5 border-2 rounded-lg w-full h-[45px] mt-2 text-primaryGray2 pl-3 focus:outline-none focus:border-primaryOrange3"
                      />
                      {formErrors.email && (
                        <p className="mt-2 text-sm text-red-600">
                          {formErrors.email}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col w-full gap-1 flex-1">
                    <label htmlFor="introduction">
                      Introduction* (Describe about yourself as pet sitter)
                    </label>
                    <textarea
                      type="text"
                      cols={20}
                      rows={6}
                      id="introduction"
                      name="introduction"
                      required
                      value={formData.introduction}
                      onChange={handleInputChange}
                      className="placeholder:pt-2 resize-none invalid:border-red-500 border-primaryGray5 border-2 rounded-lg w-full mt-2 text-primaryGray2 pl-3 focus:outline-none focus:border-primaryOrange3"
                    />
                  </div>
                </div>
                <div className="bg-white w-full h-auto shadow-custom4 rounded-lg px-20 pt-14 pb-10 flex flex-col justify-start items-start gap-8">
                  <div className="text-headLine4 text-primaryGray4 w-full flex flex-row justify-start">
                    Pet Sitter
                  </div>
                  <div className="flex gap-10 flex-1 w-full">
                    <div className="flex flex-col gap-1 flex-1">
                      <label htmlFor="address">
                        Pet Sitter name(Trade name)*
                      </label>
                      <input
                        id="tradename"
                        name="tradename"
                        type="text"
                        value={formData.tradename}
                        onChange={handleInputChange}
                        required
                        className="invalid:border-red-500 border-primaryGray5 border-2 rounded-lg w-full h-[45px] mt-2 text-primaryGray2 pl-3 focus:outline-none focus:border-primaryOrange3"
                      />
                      {formErrors.tradename && (
                        <p className="mt-2 text-sm text-red-600">
                          {formErrors.tradename}
                        </p>
                      )}
                    </div>
                    <div className="flex-1">
                      <label htmlFor="experience">
                        <h1>Experience* (years)</h1>
                      </label>
                      <input
                        id="experience"
                        name="experience"
                        type="number"
                        value={formData.experience}
                        onChange={handleInputChange}
                        placeholder="0"
                        required
                        min="0"
                        className="invalid:border-red-500 border-primaryGray5 border-2 rounded-lg w-full h-[45px] mt-2 text-primaryGray2 pl-3 focus:outline-none focus:border-primaryOrange3"
                      />
                    </div>
                  </div>

                  <div className="relative flex flex-col w-full gap-1 flex-1">
                    <label htmlFor="pettype">Pet Type*</label>
                    <select
                      id="pettype"
                      name="pettype"
                      className="text-white invalid:border-red-500 border-primaryGray5 border-2 rounded-lg w-full py-2 px-3 mt-2 h-[45px] focus:border-primaryOrange2 focus:outline-none"
                      value={formData.pettype}
                      onChange={handleUpdatePet}
                      //multiple={true}
                    >
                      <option disabled value=""></option>
                      <option className="text-black" value="dog">
                        Dog
                      </option>
                      <option className="text-black" value="cat">
                        Cat
                      </option>
                      <option className="text-black" value="bird">
                        Bird
                      </option>
                      <option className="text-black" value="rabbit">
                        Rabbit
                      </option>
                    </select>
                    <div className=" w-[1px] h-[38px] absolute top-10 left-3 flex flex-row items-center gap-2">
                      {formData.pettype.map((pet, index) => {
                        return (
                          <div
                            key={index}
                            className="h-[32px] w-auto z-10 text-primaryOrange2 bg-primaryOrange6 border-2 border-primaryOrange6 rounded-full  flex justify-between items-center px-3 gap-4"
                          >
                            <span>{pet}</span>

                            <button onClick={() => handleRemovePet(pet)}>
                              x
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="flex flex-col w-full gap-1 flex-1">
                    <label htmlFor="services">
                      Services* (Describe about your services)
                    </label>
                    <textarea
                      type="text"
                      cols={20}
                      rows={6}
                      id="services"
                      name="services"
                      required
                      value={formData.services}
                      onChange={handleInputChange}
                      className="placeholder:pt-2 resize-none invalid:border-red-500 border-primaryGray5 border-2 rounded-lg w-full mt-2 text-primaryGray2 pl-3 focus:outline-none focus:border-primaryOrange3"
                    />
                  </div>
                  <div className="flex flex-col w-full gap-1 flex-1">
                    <label htmlFor="place">
                      My place* (Describe your place)
                    </label>
                    <textarea
                      type="text"
                      cols={20}
                      rows={6}
                      id="place"
                      name="place"
                      required
                      value={formData.place}
                      onChange={handleInputChange}
                      className="placeholder:pt-2 resize-none invalid:border-red-500 border-primaryGray5 border-2 rounded-lg w-full mt-2 text-primaryGray2 pl-3 focus:outline-none focus:border-primaryOrange3"
                    />
                  </div>

                  <div className="flex flex-col w-full gap-3 flex-1">
                    <label htmlFor="place">
                      Image Gallery* (Maximum 10 images)
                    </label>
                    <div className="grid grid-cols-5 gap-4 ">
                      {fileGallery.map((gallery, index) => {
                        return (
                          <div
                            key={index}
                            className="image-preview-container relative flex justify-center items-center"
                          >
                            <div className="bg-primaryGray6 w-[180px] h-[180px] rounded-xl overflow-hidden ">
                              <img
                                className="image-preview object-contain w-[180px] h-[180px] "
                                src={URL.createObjectURL(gallery)}
                                alt=""
                              />
                            </div>

                            <button
                              className="image-remove-button z-10 absolute top-[-5px] right-[-5px] w-[24px] h-[24px] rounded-full bg-primaryGray3 text-white flex justify-center items-center"
                              onClick={() => remove(index)}
                            >
                              <span>x</span>
                            </button>
                          </div>
                        );
                      })}
                      {fileGallery && fileGallery.length <= 9 ? (
                        <label htmlFor="upload2">
                          <div className="relative cursor-pointer border-2  w-[180px] h-[180px] rounded-xl flex flex-col justify-center items-center hover:border-primaryOrange4 bg-primaryOrange6">
                            <div className=" cursor-pointer text-primaryOrange2">
                              <AddIcon />
                            </div>
                            <h1 className="text-lg text-primaryOrange2 flex flex-col justify-center items-center w-full">
                              Upload Image
                            </h1>
                          </div>
                          <input
                            id="upload2"
                            name="gallery"
                            type="file"
                            onChange={handleGalleryChange}
                            hidden
                          />
                        </label>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className="bg-white w-full h-auto shadow-custom4 rounded-lg px-20 pt-12 pb-10 flex flex-col justify-start items-start gap-4">
                  <div className="text-headLine4 text-primaryGray4 w-full flex flex-row justify-start">
                    Address
                  </div>
                  <div className="flex flex-col gap-1 w-full">
                    <label htmlFor="address">Address Detail*</label>
                    <input
                      id="address"
                      name="address"
                      type="text"
                      value={formData.address}
                      onChange={handleInputChange}
                      //placeholder="your username "
                      required
                      className="invalid:border-red-500 border-primaryGray5 border-2 rounded-lg w-full h-[45px] mt-2 text-primaryGray2 pl-3 focus:outline-none focus:border-primaryOrange3"
                    />
                    {formErrors.address && (
                      <p className="mt-2 text-sm text-red-600">
                        {formErrors.address}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-row gap-10 w-full">
                    <div className="flex-1">
                      <label htmlFor="district">District*</label>
                      <input
                        id="district"
                        name="district"
                        type="district"
                        value={formData.district}
                        onChange={handleInputChange}
                        // placeholder="your district "
                        required
                        className="invalid:border-red-500 border-primaryGray5 border-2 rounded-lg w-full h-[45px] mt-2 text-primaryGray2 pl-3 focus:outline-none focus:border-primaryOrange3"
                      />
                      {formErrors.district && (
                        <p className="mt-2 text-sm text-red-600">
                          {formErrors.district}
                        </p>
                      )}
                    </div>
                    <div className="flex-1">
                      <label htmlFor="subDistrict">Sub-district*</label>
                      <input
                        id="subDistrict"
                        name="subDistrict"
                        type="subDistrict"
                        value={formData.subDistrict}
                        onChange={handleInputChange}
                        //  placeholder="your subDistrict "
                        required
                        className="invalid:border-red-500 border-primaryGray5 border-2 rounded-lg w-full h-[45px] mt-2 text-primaryGray2 pl-3 focus:outline-none focus:border-primaryOrange3"
                      />
                      {formErrors.subDistrict && (
                        <p className="mt-2 text-sm text-red-600">
                          {formErrors.subDistrict}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-10 flex-1 w-full">
                    <div className="flex flex-col w-full gap-1 flex-1">
                      <label htmlFor="province">Province*</label>
                      <input
                        id="province"
                        name="province"
                        type="text"
                        value={formData.province}
                        onChange={handleInputChange}
                        required
                        className="invalid:border-red-500 border-primaryGray5 border-2 rounded-lg w-full h-[45px] mt-2 text-primaryGray2 pl-3 focus:outline-none focus:border-primaryOrange3"
                      />
                      {formErrors.province && (
                        <p className="mt-2 text-sm text-red-600">
                          {formErrors.province}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col w-full gap-1 flex-1">
                      <label htmlFor="postcode">Post code*</label>
                      <input
                        id="postcode"
                        name="postcode"
                        type="text"
                        value={formData.postcode}
                        onChange={handleInputChange}
                        //placeholder="example@postcode.com"
                        required
                        className="invalid:border-red-500 border-primaryGray5 border-2 rounded-lg w-full h-[45px] mt-2 text-primaryGray2 pl-3 focus:outline-none focus:border-primaryOrange3"
                      />
                      {formErrors.postcode && (
                        <p className="mt-2 text-sm text-red-600">
                          {formErrors.postcode}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default PetSitterProfile;
