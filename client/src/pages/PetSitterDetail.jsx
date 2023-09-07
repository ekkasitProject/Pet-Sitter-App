import React, { useState } from "react";
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

const PetSitterDetail = () => {
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

  return (
    <div className="flex-row">
      <Header />
      <div>
        <AdvancedCarousel />
      </div>

      <div className="flex p-10 bg-white">
        <div className="flex-1 py-8 bg-white p-10">
          <h1 className="text-5xl font-bold text-black">Happy House!</h1>
          <section className="mt-4">
            <h2 className="text-xl font-semibold">Introduction</h2>
            <p className="text-gray-700 mt-2">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure
              dolorem accusantium quidem labore beatae similique officiis
              laboriosam explicabo illum! Quia soluta inventore ea saepe
              quibusdam earum. Explicabo hic est tempore?
            </p>
          </section>
          <section className="mt-8">
            <h2 className="text-xl font-semibold">Service</h2>
            <p className="text-gray-700 mt-2">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odit
              culpa vero, minima laudantium atque temporibus sed voluptate illo
              debitis quam eius facere tempora quisquam sunt facilis. Quibusdam
              fugiat quae optio!
            </p>
          </section>
          <section className="mt-8">
            <h3 className="text-xl font-semibold">My Place</h3>
            <p className="text-gray-700 mt-2">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nihil
              nisi quibusdam ducimus nulla, iusto reiciendis inventore sed,
              illo, omnis velit quaerat ipsa vitae amet mollitia. Deserunt,
              distinctio? Sunt, blanditiis similique.
            </p>
          </section>
        </div>

        <div className="sticky w-3/12 border  shadow-lg rounded-lg ">
          <div className="flex-2 bg-white py-6 p-5 ">
            <div className="flex items-center justify-center">
              <img
                src={Frame427321006}
                alt="profileImg"
                className="w-32 h-32"
              />
            </div>
            <div className="text-center mt-4">
              <h1 className="text-2xl font-semibold">Happy House!</h1>
              <div className="mt-2">
                <h2 className="text-lg">Jane Maison</h2>
                <h2 className="text-sm">1.5 Years Exp.</h2>
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
                <h3 className="text-gray-700 ml-2">Senanikom, Bangkok</h3>
              </div>
              <div className="mt-4">
                {/*
              {petSitter.pet_type.map((pet) => {
                      return <>{handleChip(pet)}</>;
                    })}
                 */}
                <button className="px-4 py-2 mx-1 bg-green-300 text-white rounded-full hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                  Dog
                </button>
                <button className="px-4 py-2 mx-1 bg-red-300 text-white rounded-full hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                  Cat
                </button>
                <button className="px-4 py-2 mx-1 bg-orange-300 text-white rounded-full hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
                  Rabbit
                </button>
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

export default PetSitterDetail;
