import React, { useEffect } from "react";
import Header from "../components/Header";
import greenStar from "../assets/star/greenstar.svg";
import shapeBlue from "../assets/star/shapeblue.svg";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const BookingInformation = () => {
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const token = localStorage.getItem("token");
      const id = localStorage.getItem("id");
      const res = await axios.get(`http://localhost:6543/petOwnerUser/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(res.data.petOwnerUser);
    } catch (error) {
      console.log("request error" + error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Header />
      <section className="w-[100%] overflow-hidden  relative bg-[#F5F5F5]">
        <div className="w-[90%]   flex  mx-auto ">
          <div className=" mt-6 mx-auto w-3/4 mr-8 mb-16">
            <div className="flex justify-center items-center  h-[96px] bg-white mb-4 rounded-xl">
              <div className="flex  items-center pr-12">
                <div className="bg-black text-[1.5rem] font-semibold text-[#FF7037] w-[3rem] h-[3rem] flex justify-center items-center rounded-full ">
                  1
                </div>
                <p className="text-[1.2rem] ml-4">Your Pet</p>
              </div>
              <div className="flex items-center pr-12">
                <div className="bg-[#FF7037] text-[1.5rem] font-semibold text-white w-[3rem] h-[3rem] flex justify-center items-center rounded-full ">
                  2
                </div>
                <p className="text-[1.2rem] ml-4 text-[#FF7037]">Information</p>
              </div>
              <div className="flex  items-center pr-12">
                <div className="bg-[#F6F6F9] text-[1.5rem] text-[#7B7E8F] font-semibold w-[3rem] h-[3rem] flex justify-center items-center rounded-full ">
                  3
                </div>
                <p className="text-[1.2rem] ml-4 text-[#7B7E8F]">Payment</p>
              </div>
            </div>

            {/* form */}

            <div className="bg-white h-[720px] rounded-xl p-12">
              <form action="">
                <label htmlFor="userName">Your Name*</label>
                <input
                  id="userName"
                  name="userName"
                  type="text" // Update this to "text" if it's a user's name
                  placeholder="Full name"
                  readOnly
                  value={data.username || ""}
                  disabled
                  className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <div className="mt-12 flex">
                  <div className="w-[50%] mr-12">
                    <label htmlFor="email">Email*</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="youremail@company.com"
                      readOnly
                      value={data.email || ""}
                      disabled
                      className="mt-1 p-2 w-full block rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div className="w-[50%]">
                    <label htmlFor="phoneNumber">Phone*</label>
                    <input
                      id="phoneNumber"
                      name="phoneNumber"
                      type="number"
                      placeholder="xxx-xxx-xxxx"
                      readOnly
                      value={data.phone || ""}
                      disabled
                      className="mt-1 p-2 w-full block rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
                <hr className="mt-12" />
                <div className="mt-12">
                  <label htmlFor="userName">
                    Additional Message (To pet sitter){" "}
                  </label>
                  <textarea
                    id="additionalMessage"
                    name="additionalMessage"
                    required
                    className="mt-1 p-2 block w-full h-[140px] rounded-xl border  border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="mt-[8rem] flex justify-between">
                  <button className=" bg-[#FFF1EC] text-[#FF7037] px-10 py-3 rounded-3xl font-bold">
                    Back
                  </button>

                  <Link to="/booking/payment">
                    <button className=" bg-[#FF7037] text-white px-10 py-3 rounded-3xl font-bold">
                      Next
                    </button>
                  </Link>
                </div>
              </form>
            </div>
          </div>
          <div className="w-1/4 mt-6 h-[484px] bg-white rounded-xl overflow-hidden">
            <h2 className="text-2xl font-medium px-8 pt-4">Booking Detail</h2>
            <hr className="mt-4" />
            <div className="px-8 pt-4">
              <h3 className="text-[#7B7E8F] tracking-wide">Pet Sitter:</h3>
              <p className="tracking-wide text-[#3A3B46]">
                Happy House! By jane Maison
              </p>
            </div>

            <div className="px-8 pt-4 mt-4 ">
              <h3 className="text-[#7B7E8F] tracking-wide">Date & Time:</h3>
              <p className="tracking-wide text-[#3A3B46]">
                25 Aug, 2023 | 7 AM - 10 AM
              </p>
            </div>

            <div className="px-8 pt-4 mt-4">
              <h3 className="text-[#7B7E8F] tracking-wide">Duration:</h3>
              <p className="tracking-wide text-[#3A3B46]">3 hours</p>
            </div>

            <div className="px-8 pt-4 mt-4">
              <h3 className="text-[#7B7E8F] tracking-wide">Pet:</h3>
              <p className="tracking-wide text-[#3A3B46]">Mr.Ham, Bingsu</p>
            </div>
            <div className="py-8  pt-4 flex mt-12 justify-between bg-black ">
              <p className="mx-8 text-white">Total</p>
              <p className="mx-8 text-white">900.00 THB</p>
            </div>
          </div>
        </div>
        <img
          className="absolute bottom-[25%] right-10"
          src={shapeBlue}
          alt=""
        />
        <img
          className="absolute bottom-[-14%] right-10"
          src={greenStar}
          alt=""
        />
      </section>
    </div>
  );
};

export default BookingInformation;
