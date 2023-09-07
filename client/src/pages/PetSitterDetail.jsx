import { useState, useEffect } from "react";
import LocationIcon from "../assets/icons/icon_location.svg";
import Header from "../components/Header";
import AdvancedCarousel from "../components/Carousel";
import { useParams } from "react-router-dom";
import useFilter from "../hooks/useFilter";
import {
  ChipsOrange,
  ChipsPink,
  ChipsGreen,
  ChipsBlue,
} from "../components/Chips.jsx";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const PetSitterDetail = () => {
  const { petsister_id } = useParams();
  const { petSitter, getPetSitterById } = useFilter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getPetSitterById(petsister_id);
        setLoading(false);
      } catch (error) {
        // Handle error here
        console.error("Error fetching pet sitter data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [petsister_id, getPetSitterById]);
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
    
  const getPost = async () => {
    const results = await axios(
      `http://localhost:4000/petsitteruser/${params.petSitterId}`
    );
    setPost(results.data.data);
  };
  if (loading) {
    // Optionally, you can render a loading indicator here
    return <div>Loading...</div>;
  }

  if (
    !petSitter ||
    !petSitter.petsisterdetail ||
    petSitter.petsisterdetail.length === 0
  ) {
    // Handle the case when petSitter data is not available or empty
    return <div>No data available for this pet sitter.</div>;
  }

  const petSisterDetail = petSitter.petsisterdetail[0];

  useEffect(() => {
    getPost();
  }, []);

  return (
    <div className="flex-row">
      <Header />
      <div>
        <AdvancedCarousel />
      </div>

      <div className="flex p-10 bg-white">
        <div className="flex-1 py-8 bg-white p-10">
          <h1 className="text-5xl font-bold text-black">
            {petSisterDetail.pet_sister_name}
          </h1>
          <section className="mt-4">
            <h2 className="text-xl font-semibold">Introduction</h2>
            <p className="text-gray-700 mt-2">{petSitter.introduction}</p>
          </section>
          <section className="mt-8">
            <h2 className="text-xl font-semibold">Service</h2>
            <p className="text-gray-700 mt-2">{petSisterDetail.services}</p>
          </section>
          <section className="mt-8">
            <h3 className="text-xl font-semibold">My Place</h3>
            <p className="text-gray-700 mt-2">{petSisterDetail.my_place}</p>
          </section>
        </div>

        <div className="sticky w-3/12 border  shadow-lg rounded-lg ">
          <div className="flex-2 bg-white py-6 p-5 ">
            <div className="flex items-center justify-center">
              <img
                src={petSitter.image_profile}
                alt="profileImg"
                className="w-32 h-32"
              />
            </div>
            <div className="text-center mt-4">
              <h1 className="text-2xl font-semibold">
                {petSisterDetail.pet_sister_name}
              </h1>
              <div className="mt-2">
                <h2 className="text-lg">{petSitter.username}</h2>
                <h2 className="text-sm">1.5 Years Exp.</h2>
              </div>
              <div className="flex items-center justify-center mt-2 p-5">
                <img
                  src={LocationIcon}
                  alt="locationIcon"
                  className="w-5 h-5"
                />
                <h3 className="text-gray-700 ml-2">
                  {petSisterDetail.my_place}
                </h3>
              </div>
              <div className="mt-4 ">
                {petSisterDetail.pet_type.map((pet, index) => (
                  <span className="mx-1" key={index}>
                    {handleChip(pet)}
                  </span>
                ))}
              </div>

              <div className="p-5 flex justify-center">
                <button className="w-[300px] h-[50px] py-2 bg-primaryOrange2 rounded-full active:bg-primaryOrange1 text-white hover:bg-primaryOrange3 disabled:bg-primaryGray4 disabled:text-primaryGray3">
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
}

export default PetSitterDetail;
