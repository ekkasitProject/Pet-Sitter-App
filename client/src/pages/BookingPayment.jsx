import React, { useState } from "react";
import Header from "../components/Header";
import greenStar from "../assets/star/greenstar.svg";
import shapeBlue from "../assets/star/shapeblue.svg";
import dogFoot from "../assets/images/bill/Dogfoot.svg";
import { Link } from "react-router-dom";

const BookingPayment = () => {
  const [paymentType, setPaymentType] = useState("creditCard");
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility

  const handlePaymentChange = (type) => {
    setPaymentType(type);
  };

  const handleConfirmBooking = () => {
    setIsModalOpen(true); // Open the modal when "Confirm Booking" is clicked
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
  };

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
                <div className="bg-black text-[1.5rem] font-semibold text-[#FF7037] w-[3rem] h-[3rem] flex justify-center items-center rounded-full ">
                  2
                </div>
                <p className="text-[1.2rem] ml-4">Information</p>
              </div>
              <div className="flex  items-center pr-12">
                <div className="bg-[#FF7037] text-[1.5rem] font-semibold text-white w-[3rem] h-[3rem] flex justify-center items-center rounded-full ">
                  3
                </div>
                <p className="text-[1.2rem] ml-4 text-[#FF7037]">Payment</p>
              </div>
            </div>

            {/* Payment Credit Card or Cash */}

            <div className="bg-white h-[720px] rounded-xl p-12">
              <div className="flex justify-between">
                <button
                  onClick={() => handlePaymentChange("creditCard")}
                  className={`text-[1.2rem] w-[48%] h-[80px] rounded-full 
              ${
                paymentType === "creditCard"
                  ? "border border-orange-500 text-[#FF7037]"
                  : "border border-gray-300 text-black"
              }`}
                >
                  Credit Card
                </button>
                <button
                  onClick={() => handlePaymentChange("cash")}
                  className={`text-[1.2rem] w-[48%] h-[80px] rounded-full 
              ${
                paymentType === "cash"
                  ? "border border-orange-500 text-[#FF7037]"
                  : "border border-gray-300 text-black"
              }`}
                >
                  Cash
                </button>
              </div>
              {paymentType === "creditCard" ? (
                <>
                  <div className="mt-12 flex">
                    <div className="w-[50%] mr-12">
                      <label htmlFor="CardNumber">Card Number*</label>
                      <input
                        id="cardNumber"
                        name="cardNumber"
                        type="text"
                        placeholder="xxx-xxxx-x-xx-xx"
                        required
                        pattern="\d{3}-\d{4}-\d{1}-\d{2}-\d{2}"
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, ""); // Remove non-digit characters
                          const formattedValue = value
                            .match(/\d{1,4}/g)
                            .join("-")
                            .substr(0, 17); // Format as xxx-xxxx-x-xx-xx

                          e.target.value = formattedValue;
                        }}
                        className="mt-1 p-2 w-full h-14 block text-xl  rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div className="w-[50%]">
                      <label htmlFor="cardOwner">Card Owner*</label>
                      <input
                        id="cardOwner"
                        name="cardOwner"
                        type="text"
                        placeholder="Card owner name"
                        required
                        className="mt-1 p-2 w-full h-14 block placeholder:tracking-wide rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="mt-12 flex">
                    <div className="w-[50%] mr-12">
                      <label htmlFor="expiry">Expiry Date*</label>
                      <input
                        id="expiry"
                        name="expiry"
                        type="text"
                        placeholder="xxx-xxx-xxxx"
                        required
                        className="mt-1 p-2 w-full h-14 block rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div className="w-[50%]">
                      <label htmlFor="CardVerification">CVC/CVV*</label>
                      <input
                        id="CardVerification"
                        name="CardVerification"
                        type="text"
                        placeholder="xxx"
                        required
                        className="mt-1 p-2 w-full h-14 block rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="bg-[#F6F6F9] flex h-[281px] flex-col justify-center items-center rounded-2xl mt-12">
                    <img className="w-[100px]" src={dogFoot} alt="" />
                    <p className="mt-6 w-[300px] text-center text-[#3A3B46] tracking-wider">
                      If you want to pay by cash, you are required to make a
                      cash payment upon arrival at the pet sitter's location.
                    </p>
                  </div>
                </>
              )}

              <div className="absolute bottom-[10%] w-[60%]">
                <div className="flex justify-between">
                  <Link to="/booking/information">
                    <button className=" bg-[#FFF1EC] text-[#FF7037] px-10 py-3 rounded-3xl font-bold">
                      Back
                    </button>
                  </Link>

                  <button
                    onClick={handleConfirmBooking} // Open the modal
                    className=" bg-[#FF7037] text-white px-10 py-3 rounded-3xl font-bold"
                  >
                    Confirm Booking
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="w-1/4 mt-6 h-[484px] bg-white rounded-xl overflow-hidden">
            <h2 className="text-2xl font-medium px-8 pt-4">Booking Detail</h2>
            <hr className="mt-4" />
            <div className="px-8 pt-4">
              <h3 className="text-[#7B7E8F] tracking-wide">Pet Sitter:</h3>
              <p className="tracking-wide text-[#3A3B46]">
                Happy House! By Jane Maison
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
              <p className="tracking-wide text-[#3A3B46]">Mr. Ham, Bingsu</p>
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

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-50 bg-black bg-opacity-30">
          <div className="bg-white  rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold px-8 py-4">
              Booking Confirmation
            </h2>
            <hr />
            <p className="px-8 py-4 text-[#7B7E8F]">
              Are you sure to booking this pet sitter?
            </p>
            <div className="mt-4 flex justify-between px-8 pb-4">
              <button
                className="px-4 py-2 mr-2 bg-[#FFF1EC] text-sm text-[#FF7037]  rounded-full font-semibold"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
              <Link to="/booking/bill">
                <button className="px-4 py-2 bg-[#FF7037] text-sm text-white rounded-full font-semibold">
                  Yes i'm sure
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingPayment;
