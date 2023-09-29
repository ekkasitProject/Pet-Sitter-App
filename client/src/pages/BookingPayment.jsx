import React, { useState, useContext, useEffect } from "react";
import HeaderAuth from "../components/HeaderAuth";
import greenStar from "../assets/star/greenstar.svg";
import shapeBlue from "../assets/star/shapeblue.svg";
import dogFoot from "../assets/images/bill/Dogfoot.svg";
import { Link } from "react-router-dom";
import { ToggleContext } from "./AuthenticatedApp";
import fetchUserData from "../hooks/fetchUserData";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../components/calculateDate";

const BookingPayment = () => {
  const navigate = useNavigate();
  const { submitBooking } = fetchUserData();
  const [paymentType, setPaymentType] = useState("creditCard");
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
  const [newStartDate, setNewStartDate] = useState("");
  const [newEndDate, setNewEndDate] = useState("");
  const [errors, setErrors] = useState({});

  const {
    selectedPets,

    messageAdditional,

    selectedPetsitterID,

    selectedPetsitterName,

    selectedPetsitterUser,

    selectedDate,

    startTime,

    endTime,

    prices,

    selectedPetsName,
  } = useContext(ToggleContext);

  const duration = (start, end) => {
    const startTime = new Date(`2023-09-15 ${start}`);
    const endTime = new Date(`2023-09-15 ${end}`);
    const durationInHours = (endTime - startTime) / (1000 * 60 * 60);
    return durationInHours;
  };

  const handlePaymentChange = (type) => {
    setPaymentType(type);
  };

  const handleConfirmBooking = () => {
    if (paymentType === "creditCard") {
      if (!creditCardNumber || !expiry || !cvv) {
        alert("กรุณากรอข้อมูลให้ครบ");
        return;
      }
    }
    setIsModalOpen(true); // Open the modal when "Confirm Booking" is clicked
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  const changeFormat = (date, time) => {
    const newDate = formatDate(date); // Date in YYYY-MM-DD format
    const newTime = new Date(`${newDate} ${time}`);
    return newTime;
  };

  useEffect(() => {
    setNewStartDate(changeFormat(selectedDate, startTime));
    setNewEndDate(changeFormat(selectedDate, endTime));
  }, []);

  const validateForm = () => {
    const newErrors = {};

    // Validate Name
    if (fullname.length < 6 && fullname) {
      newErrors.fullname = "please insert your full name";
    }
    const fullnamePattern = /^[a-zA-Z\s]+$/;
    if (!fullname.match(fullnamePattern)) {
      newErrors.fullname = "Invalid fullname format";
    }

    // Validate creditCardNumber
    if (creditCardNumber.length < 19) {
      newErrors.creditCardNumber = "Invalid credit Card Number format";
    }

    // Validate cvv
    if (cvv.length < 3) {
      newErrors.cvv = "Invalid cvv format";
    }

    // Validate expiry
    if (expiry.length < 5) {
      newErrors.expiry = "Invalid expiry format";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (paymentType == "creditCard") {
      if (validateForm()) {
        const data = {
          petDetailIds: selectedPets,
          petSitterId: selectedPetsitterID,
          datetime: newStartDate,
          startTime: newStartDate,
          endTime: newEndDate,
          additionalMessage: messageAdditional,
          totalPrice: prices,
        };
        submitBooking(data);
        console.log(data);
        navigate(`/booking/bill`);
      }
    } else {
      const data = {
        petDetailIds: selectedPets,
        petSitterId: selectedPetsitterID,
        datetime: newStartDate,
        startTime: newStartDate,
        endTime: newEndDate,
        additionalMessage: messageAdditional,
        totalPrice: prices,
      };
      submitBooking(data);
      console.log(data);
      navigate(`/booking/bill`);
    }
  };

  const [creditCardNumber, setCreditCardNumber] = useState("");
  const [fullname, setFullname] = useState("");
  const handleCreditCardChange = (e) => {
    let input = e.target.value;
    input = input.replace(/\D/g, ""); // Remove non-numeric characters

    if (input.length > 16) {
      input = input.slice(0, 16);
    }

    let formattedInput = "";
    for (let i = 0; i < input.length; i++) {
      if (i > 0 && i % 4 === 0) {
        formattedInput += "-";
      }
      formattedInput += input[i];
    }

    setCreditCardNumber(formattedInput);
  };

  const [expiry, setExpiry] = useState("");

  const handleExpiryChange = (e) => {
    let input = e.target.value;
    input = input.replace(/\D/g, ""); // Remove non-numeric characters

    if (input.length > 4) {
      input = input.slice(0, 4);
    }

    if (input.length >= 2) {
      input = input.slice(0, 2) + "/" + input.slice(2);
    }

    setExpiry(input);
  };

  const [cvv, setCvv] = useState("");
  const handleCvvChange = (e) => {
    let input = e.target.value;

    // Remove non-numeric characters
    input = input.replace(/\D/g, "");

    // Limit the CVV length to 3 characters
    if (input.length > 3) {
      input = input.slice(0, 3);
    }

    // Update the state with the new CVV value
    setCvv(input);
  };
  return (
    <div>
      <HeaderAuth />
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
                <form>
                  <div className="mt-12 flex">
                    <div className="w-[50%] mr-12">
                      <label htmlFor="CardNumber">Card Number*</label>
                      <input
                        id="cardNumber"
                        name="cardNumber"
                        type="text"
                        placeholder="xxxx-xxxx-xxxx-xxxx"
                        required
                        value={creditCardNumber}
                        onChange={handleCreditCardChange}
                        maxLength={19} // Adjust maxLength to include hyphens
                        className="mt-1 p-2 w-full h-14 block text-xl rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                      {errors.creditCardNumber && (
                        <p className="mt-2 text-sm text-red-600">
                          {errors.creditCardNumber}
                        </p>
                      )}
                    </div>
                    <div className="w-[50%]">
                      <label htmlFor="cardOwner">Card Owner*</label>
                      <input
                        id="cardOwner"
                        name="cardOwner"
                        type="text"
                        onChange={(e) => {
                          setFullname(e.target.value);
                        }}
                        maxLength={13}
                        placeholder="Card owner name"
                        required
                        className="mt-1 p-2 w-full h-14 block placeholder:tracking-wide rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                      {errors.fullname && (
                        <p className="mt-2 text-sm text-red-600">
                          {errors.fullname}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-12 flex">
                    <div className="w-[50%] mr-12">
                      <label htmlFor="expiry">Expiry Date*</label>
                      <input
                        id="expiry"
                        name="expiry"
                        type="text"
                        placeholder="MM/YY"
                        required
                        value={expiry}
                        onChange={handleExpiryChange}
                        className="mt-1 p-2 w-full h-14 block rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                      {errors.expiry && (
                        <p className="mt-2 text-sm text-red-600">
                          {errors.expiry}
                        </p>
                      )}
                    </div>
                    <div className="w-[50%]">
                      <label htmlFor="CardVerification">CVC/CVV*</label>
                      <input
                        id="CardVerification"
                        name="CardVerification"
                        type="text"
                        placeholder="xxx"
                        required
                        value={cvv}
                        onChange={handleCvvChange}
                        maxLength={3}
                        className="mt-1 p-2 w-full h-14 block rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                      {errors.cvv && (
                        <p className="mt-2 text-sm text-red-600">
                          {errors.cvv}
                        </p>
                      )}
                    </div>
                  </div>
                </form>
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

          <div className="w-1/4 mt-6 h-[484px] relative bg-white rounded-xl overflow-hidden">
            <h2 className="text-2xl font-medium px-8 pt-4">Booking Detail</h2>
            <hr className="mt-4" />
            <div className="px-8 pt-4">
              <h3 className="text-[#7B7E8F] tracking-wide">Pet Sitter:</h3>
              <p className="tracking-wide text-[#3A3B46]">
                {selectedPetsitterName} By {selectedPetsitterUser}
              </p>
            </div>

            <div className="px-8  mt-4 ">
              <h3 className="text-[#7B7E8F] tracking-wide">Date & Time:</h3>
              <p className="tracking-wide text-[#3A3B46]">
                {formatDate(selectedDate)} | {startTime} - {endTime}
              </p>
            </div>

            <div className="px-8  mt-4">
              <h3 className="text-[#7B7E8F] tracking-wide">Duration:</h3>
              <p className="tracking-wide text-[#3A3B46]">
                {duration(startTime, endTime)} hours
              </p>
            </div>

            <div className="px-8  mt-4">
              <h3 className="text-[#7B7E8F] tracking-wide">Pet:</h3>
              <p className="tracking-wide text-[#3A3B46]">
                {selectedPetsName.map((pet, index) => {
                  return (
                    <span key={index}>
                      {pet}
                      {index < selectedPetsName.length - 1 && ", "}
                    </span>
                  );
                })}
              </p>
            </div>
            <div className="px-8  mt-4">
              <h3 className="text-[#7B7E8F] tracking-wide">Additional:</h3>
              <p className="tracking-wide text-[#3A3B46]">
                {messageAdditional}
              </p>
            </div>
            <div className="absolute flex w-[100%] bottom-0 py-4 mt-12 justify-between bg-black ">
              <p className="mx-8  text-white">Total</p>
              <p className="mx-8  text-white">{prices}.00 THB</p>
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
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-[#FF7037] text-sm text-white rounded-full font-semibold"
                >
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
