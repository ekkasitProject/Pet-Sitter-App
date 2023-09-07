import Star2 from "../assets/icons/Star_2.svg";
import LocationIcon from "../assets/icons/icon_location.svg";
import Frame427321006 from "../assets/images/elements/Frame_427321006.svg";
import AdvancedCarousel from "../components/Carousel";
import Header from "../components/Header";

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
  const [post, setPost] = useState({});
  const params = useParams();
  const navigate = useNavigate();

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
            {post.petSitterTitle}
          </h1>
          <section className="mt-4">
            <h2 className="text-xl font-semibold">Introduction</h2>
            <p className="text-gray-700 mt-2">{post.petSitterIntro}</p>
          </section>
          <section className="mt-8">
            <h2 className="text-xl font-semibold">Service</h2>
            <p className="text-gray-700 mt-2">{post.petSitterService}</p>
          </section>
          <section className="mt-8">
            <h3 className="text-xl font-semibold">My Place</h3>
            <p className="text-gray-700 mt-2">{post.petSitterPlace}</p>
          </section>
        </div>

        <div className="sticky w-3/12 border  shadow-lg rounded-lg ">
          <div className="flex-2 bg-white py-6 p-5 ">
            <div className="flex items-center justify-center">
              <img
                src={post.petSitterProfileImage}
                alt="profileImg"
                className="w-32 h-32"
              />
            </div>
            <div className="text-center mt-4">
              <h1 className="text-2xl font-semibold">{post.petSitterTitle}</h1>
              <div className="mt-2">
                <h1 className="text-lg">{post.petSitterName}</h1>
                <h3 className="text-sm">{post.petSitterFullName}</h3>
                <h2 className="text-sm">{post.PetSitterExperience}</h2>
              </div>
              {/* 
              <div className="flex justify-center mt-2">
                {[1, 2, 3, 4, 5].map((_, index) => (
                  <img key={index} src={Star2} alt="star" className="w-5 h-5" />
                ))}
              </div>
              */}
              <div className="flex items-center justify-center mt-2 p-5">
                <img
                  src={LocationIcon}
                  alt="locationIcon"
                  className="w-5 h-5"
                />
                <h3 className="text-gray-700 ml-2">
                  {post.district} {post.province}
                </h3>
              </div>
              <div className="mt-4">
                {/*
              {petSitter.pet_type.map((pet) => {
                      return <>{handleChip(pet)}</>;
                    })}
                //  */}
               
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
