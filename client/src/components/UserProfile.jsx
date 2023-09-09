import { Button2 } from "./Button";
import React, { useState } from "react";
import profile_user from "../assets/icons/profile.svg";

function UserProfile() {
  return (
    <>
      <div className="w-full h-full flex flex-col justify-start shadow-custom3 rounded-lg p-12">
        <div className="text-headLine3">Profile</div>
        <form onSubmit="" className="flex flex-col gap-10">
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
            <label htmlFor="name">Your Name*</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="your name"
              value=""
              onChange=""
              className="invalid:border-red-500 border-primaryGray5 border-2 rounded-lg w-full h-[45px] mt-2 text-primaryGray2 pl-3 focus:outline-none focus:border-primaryOrange3"
            />
          </div>
          <div className="flex gap-8 flex-1 ">
            <div className="flex flex-col gap-1 flex-1">
              <label htmlFor="email">Email*</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="email"
                value=""
                onChange=""
                className="invalid:border-red-500 border-primaryGray5 border-2 rounded-lg w-full h-[45px] mt-2 text-primaryGray2 pl-3 focus:outline-none focus:border-primaryOrange3"
              />
            </div>
            <div className="flex flex-col gap-1 flex-1">
              <label htmlFor="phoneNumber">Phone*</label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                placeholder="phoneNumber"
                value=""
                onChange=""
                className="invalid:border-red-500 border-primaryGray5 border-2 rounded-lg w-full h-[45px] mt-2 text-primaryGray2 pl-3 focus:outline-none focus:border-primaryOrange3"
              />
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
                value=""
                onChange=""
                className="invalid:border-red-500 border-primaryGray5 border-2 rounded-lg w-full h-[45px] mt-2 text-primaryGray2 pl-3 focus:outline-none focus:border-primaryOrange3"
              />
            </div>
            <div className="flex flex-col gap-1 flex-1">
              <label htmlFor="dateOfBirth">Date Of Birth</label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                onChange=""
                className="invalid:border-red-500 border-primaryGray5 border-2 rounded-lg w-full h-[45px] mt-2 text-primaryGray2 pl-3 focus:outline-none focus:border-primaryOrange3"
              />
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
