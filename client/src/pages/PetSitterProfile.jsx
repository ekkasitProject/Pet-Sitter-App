import { useNavigate } from "react-router-dom";
import React, { useState, useContext, useEffect } from "react";
import { ToggleContext } from "./AuthenticatedApp";
import SideBarPetsitter from "../components/SideBarPetsitter";
import HeaderPetsitter from "../components/HeaderPetsitter";
import profile_user from "../assets/icons/profile.svg";
import { useParams } from "react-router-dom";
import fetchUserData from "../hooks/fetchUserData";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { PlusIcon, AddIcon, CloseIcon } from "../components/Icons";
import Datepicker from "react-tailwindcss-datepicker";

function PetSitterProfile() {
  const { petSitterID, setPetSitterID } = useContext(ToggleContext);
  const navigate = useNavigate();

  const {
    petsitterProfile,
    setPetsitterProfile,
    getPetsitterProfile,
    updatePetSitterProfile,
    isError,
    isLoading,
  } = fetchUserData();
  const params = useParams();
  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  });
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [idNumber, setIDNumber] = useState("");
  // const [dateOfBirth, setDateOfBirth] = useState();
  const [errors, setErrors] = useState({});
  const [isAlert, setIsAlert] = useState(false);
  const [avatars, setAvatars] = useState("");
  const [photo, setPhoto] = useState("");
  const [experience, setExperience] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [address, setAddress] = useState("");
  const [district, setDistrict] = useState("");
  const [subDistrict, setSubDistrict] = useState("");
  const [province, setProvince] = useState("");
  const [postcode, setPostcode] = useState("");
  const [tradename, setTradename] = useState("");
  const [services, setServices] = useState("");
  const [place, setPlace] = useState("");
  const [pettype, setPettype] = useState("");
  const [allpets, setAllpets] = useState([]);
  const [petsitterdetailId, setPetsitterdetailId] = useState("");
  const [addressId, setAddressId] = useState("");
  const [gallery, setGallery] = useState({});
  const [oldImageUrl, setOldImageUrl] = useState("");
  const [showGallery, setShowGallery] = useState([]);

  useEffect(() => {
    getPetsitterProfile();
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
    if (petsitterProfile) {
      setFullname(petsitterProfile.username);
      setEmail(petsitterProfile.email);
      setPhone(petsitterProfile.phone);
      setPetsitterdetailId(
        petsitterProfile.petsitterdetail[0].petsitterdetail_id
      );
      setAddressId(petsitterProfile.addresses[0].address_id);
      setIDNumber(petsitterProfile.id_card_number);
      setExperience(petsitterProfile.petsitterdetail[0].experience);
      setPhoto(petsitterProfile.image_profile);
      setShowGallery(petsitterProfile.petsitterdetail[0].image_gallery);
      setOldImageUrl(petsitterProfile.image_profile);
      setIntroduction(petsitterProfile.introduction);
      setAddress(petsitterProfile.addresses[0].address_detail);
      setDistrict(petsitterProfile.addresses[0].district);
      setSubDistrict(petsitterProfile.addresses[0].sub_district);
      setProvince(petsitterProfile.addresses[0].province);
      setPostcode(petsitterProfile.addresses[0].post_code);
      setTradename(petsitterProfile.petsitterdetail[0].pet_sitter_name);
      setServices(petsitterProfile.petsitterdetail[0].services);
      setPlace(petsitterProfile.petsitterdetail[0].my_place);
      setAllpets(petsitterProfile.petsitterdetail[0].pet_type);
      /*  const uniqueId = Date.now();
      setAvatars({
        [uniqueId]: petsitterProfile.image_profile,
      });*/
    }
  }, [petsitterProfile]);

  const validateForm = () => {
    const newErrors = {};

    /* Validate Name
    if (username.length < 6 || username.length > 20) {
      newErrors.username = "Username must be between 6 and 20 characters";
      let input = document.getElementById(`userName`);
      input.classList.add("border-red-500");
    } else {
      let input = document.getElementById(`userName`);
      input.classList.remove("border-red-500");
    }*/

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
      updatepetsitterProfile(data);
      setIsAlert(true);
    }
*/
    if (validateForm()) {
      const formData = new FormData();

      formData.append("username", fullname);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("id_card_number", idNumber);
      formData.append("avatar", avatars);
      formData.append("introduction", introduction);
      formData.append("pet_sitter_name", tradename);
      formData.append("petsitterdetail_id", petsitterdetailId);
      formData.append("services", services);
      formData.append("my_place", place);
      formData.append("experience", experience);
      formData.append("address_id", addressId);
      formData.append("address_detail", address);
      formData.append("district", district);
      formData.append("sub_district", subDistrict);
      formData.append("province", province);
      formData.append("post_code", postcode);
      formData.append("oldImageUrl", oldImageUrl);
      // formData.append("pet_type", allpets);
      /* allpets.forEach((pet) => {
        formData.append("pet_type", pet);
      });*/
      for (let key in gallery) {
        formData.append("gallery", gallery[key]);
      }
      // formData.append("gallery", gallery);

      console.log(allpets);
      //console.log(avatars);
      //console.log(formData);
      updatePetSitterProfile(formData);
      setIsAlert(true);

      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setAvatars(file);
    setPhoto(URL.createObjectURL(file));
    console.log(avatars);
  };

  setTimeout(() => {
    setIsAlert(false);
  }, 3000);

  useEffect(() => {
    //console.log(pettype);
    if (petsitterProfile) {
      const petsArray = [...allpets];
      if (!allpets.includes(pettype) && pettype !== "") {
        petsArray.push(pettype);
        setAllpets(petsArray);
      }

      //  console.log(allpets);
    }
  }, [pettype]);

  const handleRemovePet = (pet) => {
    if (allpets.includes(pet)) {
      setAllpets(
        allpets.filter((item) => {
          return item !== pet;
        })
      );
    }
  };

  const handleGalleryChange = (event) => {
    const uniqueId = Date.now();
    setGallery({
      ...gallery,
      [uniqueId]: event.target.files[0],
    });
    console.log(event.target.files[0]);
  };

  const handleRemoveImage = (event, galleryKey) => {
    event.preventDefault();
    delete gallery[galleryKey];
    setGallery({ ...gallery });
  };

  //console.log(gallery);

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
            {/* 
           {isAlert ? (
              <div className="fixed top-24 right-[660px] z-10">
                <Alert severity="success">
                  <AlertTitle>Update Success!!</AlertTitle>
                </Alert>
              </div>
            ) : null}
           */}
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
                        className="object-fit w-[220px] h-[220px] rounded-full"
                        src={photo}
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
                          onChange={handleFileChange}
                          hidden
                        />
                      </label>
                    </div>
                    <div className="">
                      {avatars ? null : (
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
                        type="fullName"
                        value={fullname}
                        onChange={(event) => setFullname(event.target.value)}
                        //placeholder="your fullname "
                        required
                        className="invalid:border-red-500 border-primaryGray5 border-2 rounded-lg w-full h-[45px] mt-2 text-primaryGray2 pl-3 focus:outline-none focus:border-primaryOrange3"
                      />
                      {errors.fullName && (
                        <p className="mt-2 text-sm text-red-600">
                          {errors.fullName}
                        </p>
                      )}
                    </div>
                    <div className="flex-1">
                      <label htmlFor="idNumber">ID Number*</label>
                      <input
                        type="text"
                        id="idNumber"
                        name="idNumber"
                        required
                        placeholder="Enter your ID number"
                        value={idNumber}
                        onChange={(event) => setIDNumber(event.target.value)}
                        className="invalid:border-red-500 border-primaryGray5 border-2 rounded-lg w-full h-[45px] mt-2 text-primaryGray2 pl-3 focus:outline-none focus:border-primaryOrange3"
                      />

                      {errors.idNumber && (
                        <p className="mt-2 text-sm text-red-600">
                          {errors.idNumber}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-10 flex-1 w-full">
                    <div className="flex flex-col w-full gap-1 flex-1">
                      <label htmlFor="phoneNumber">Phone Number*</label>
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
                        <p className="mt-2 text-sm text-red-600">
                          {errors.phone}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col w-full gap-1 flex-1">
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
                        <p className="mt-2 text-sm text-red-600">
                          {errors.email}
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
                      value={introduction}
                      onChange={(event) => setIntroduction(event.target.value)}
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
                        value={tradename}
                        required
                        onChange={(event) => setTradename(event.target.value)}
                        //placeholder="your username "

                        className="invalid:border-red-500 border-primaryGray5 border-2 rounded-lg w-full h-[45px] mt-2 text-primaryGray2 pl-3 focus:outline-none focus:border-primaryOrange3"
                      />
                      {errors.tradename && (
                        <p className="mt-2 text-sm text-red-600">
                          {errors.tradename}
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
                        value={experience}
                        onChange={(event) => setExperience(event.target.value)}
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
                      value={pettype}
                      required
                      onChange={(e) => {
                        setPettype(e.target.value);
                      }}
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
                      {allpets
                        ? allpets.map((pet, index) => {
                            return (
                              <div
                                key={index}
                                className="h-[32px] w-auto z-10 text-primaryOrange2 bg-primaryOrange6 border-2 border-primaryOrange6 rounded-full  flex justify-between items-center px-3 gap-4"
                              >
                                <span>{pet}</span>

                                <button
                                  onClick={() => {
                                    handleRemovePet(pet);
                                  }}
                                >
                                  x
                                </button>
                              </div>
                            );
                          })
                        : null}
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
                      value={services}
                      onChange={(event) => setServices(event.target.value)}
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
                      value={place}
                      onChange={(event) => setPlace(event.target.value)}
                      className="placeholder:pt-2 resize-none invalid:border-red-500 border-primaryGray5 border-2 rounded-lg w-full mt-2 text-primaryGray2 pl-3 focus:outline-none focus:border-primaryOrange3"
                    />
                  </div>

                  <div className="flex flex-col w-full gap-3 flex-1">
                    <label htmlFor="place">
                      Image Gallery* (Maximum 10 images)
                    </label>
                    <div className="grid grid-cols-5 gap-4 ">
                      {Object.keys(gallery).map((galleryKey) => {
                        const file = gallery[galleryKey];
                        return (
                          <div
                            key={galleryKey}
                            className="image-preview-container relative flex justify-center items-center"
                          >
                            <div className="bg-primaryGray6 w-[180px] h-[180px] rounded-xl overflow-hidden ">
                              <img
                                className="image-preview object-contain w-[180px] h-[180px] "
                                src={URL.createObjectURL(file)}
                                alt={file.name}
                              />
                            </div>

                            <button
                              className="image-remove-button z-10 absolute top-[-5px] right-[-5px] w-[24px] h-[24px] rounded-full bg-primaryGray3 text-white flex justify-center items-center"
                              onClick={(event) =>
                                handleRemoveImage(event, galleryKey)
                              }
                            >
                              <span>x</span>
                            </button>
                          </div>
                        );
                      })}
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
                      value={address}
                      onChange={(event) => setAddress(event.target.value)}
                      //placeholder="your username "
                      required
                      className="invalid:border-red-500 border-primaryGray5 border-2 rounded-lg w-full h-[45px] mt-2 text-primaryGray2 pl-3 focus:outline-none focus:border-primaryOrange3"
                    />
                    {errors.address && (
                      <p className="mt-2 text-sm text-red-600">
                        {errors.address}
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
                        value={district}
                        onChange={(event) => setDistrict(event.target.value)}
                        // placeholder="your district "
                        required
                        className="invalid:border-red-500 border-primaryGray5 border-2 rounded-lg w-full h-[45px] mt-2 text-primaryGray2 pl-3 focus:outline-none focus:border-primaryOrange3"
                      />
                      {errors.district && (
                        <p className="mt-2 text-sm text-red-600">
                          {errors.district}
                        </p>
                      )}
                    </div>
                    <div className="flex-1">
                      <label htmlFor="subDistrict">Sub-district*</label>
                      <input
                        id="subDistrict"
                        name="subDistrict"
                        type="subDistrict"
                        value={subDistrict}
                        onChange={(event) => setSubDistrict(event.target.value)}
                        //  placeholder="your subDistrict "
                        required
                        className="invalid:border-red-500 border-primaryGray5 border-2 rounded-lg w-full h-[45px] mt-2 text-primaryGray2 pl-3 focus:outline-none focus:border-primaryOrange3"
                      />
                      {errors.district && (
                        <p className="mt-2 text-sm text-red-600">
                          {errors.district}
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
                        value={province}
                        onChange={(event) => setProvince(event.target.value)}
                        //placeholder="Your phone number"
                        required
                        className="invalid:border-red-500 border-primaryGray5 border-2 rounded-lg w-full h-[45px] mt-2 text-primaryGray2 pl-3 focus:outline-none focus:border-primaryOrange3"
                      />
                      {errors.province && (
                        <p className="mt-2 text-sm text-red-600">
                          {errors.province}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col w-full gap-1 flex-1">
                      <label htmlFor="postcode">Post code*</label>
                      <input
                        id="postcode"
                        name="postcode"
                        type="text"
                        value={postcode}
                        onChange={(event) => setPostcode(event.target.value)}
                        //placeholder="example@postcode.com"
                        required
                        className="invalid:border-red-500 border-primaryGray5 border-2 rounded-lg w-full h-[45px] mt-2 text-primaryGray2 pl-3 focus:outline-none focus:border-primaryOrange3"
                      />
                      {errors.postcode && (
                        <p className="mt-2 text-sm text-red-600">
                          {errors.postcode}
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
