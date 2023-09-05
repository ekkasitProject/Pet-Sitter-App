import React from "react";
import { petsData } from "../data/petData";
import cat from "../assets/images/elements/catpriority.svg";
import connect from "../assets/images/elements/connect.svg";
import better from "../assets/images/elements/better.svg";
import calling from "../assets/images/elements/calling.svg";

const PetPriority = () => {
  return (
    <main>
      <h1 className="mt-[9rem] text-center font-semibold text-3xl">
        "Your Pets, Our Priority: Perfect Care, Anytime, Anywhere."
      </h1>

      <div className="w-[70%]  mx-auto mt-[3.5rem] flex mb-[5rem] justify-center">
        <div className="w-[50%]">
          {petsData.map((pet, index) => (
            <div key={index} className="mt-[3rem]   mb-8">
              <div className="flex">
                <img src={pet.star} alt="" />
                <h2 className="ml-2 font-semibold text-xl">{pet.title}</h2>
              </div>
              <p className="ml-8 mt-4 pr-16 text-[#5B5D6F] tracking-wide">
                {pet.description}
              </p>
            </div>
          ))}
        </div>

        <div className="w-[45%] ">
          <img className="w-[100%] object-cover" src={cat} alt="" />
        </div>
      </div>

      <div className="flex w-[80%] mx-auto mt-[7rem] mb-[5rem]">
        <div className="flex flex-col justify-center items-center w-[35%]">
          <img src={better} alt="" />
          <h2 className="mt-[2.5rem] font-semibold text-xl">
            <span className="text-[#1ecd83]">Connect</span> With Sitters
          </h2>
          <p className="mt-[1rem] px-10 text-[#5B5D6F] tracking-wide">
            Find a verified and reviewed sitter who’ll keep your pets company
            and give time.
          </p>
        </div>

        <div className="flex flex-col justify-center items-center w-[35%]">
          <img src={connect} alt="" />
          <h2 className="mt-[2.5rem] font-semibold text-xl">
            <span className="text-[#76d0fc]">Better</span> For Your Pets
          </h2>
          <p className="mt-[1rem] px-10 text-[#5B5D6F] tracking-wide">
            Pets stay happy at home with a sitter who gives them loving care and
            companionship.
          </p>
        </div>

        <div className="flex flex-col justify-center items-center w-[35%]">
          <img src={calling} alt="" />
          <h2 className="mt-[2.5rem] font-semibold text-xl">
            <span className="text-[#ff7038]">Calling</span> All Pets
          </h2>
          <p className="mt-[1rem] px-10 text-[#5B5D6F] tracking-wide">
            Stay for free with adorable animals in unique homes around the
            world.
          </p>
        </div>
      </div>
    </main>
  );
};

export default PetPriority;
