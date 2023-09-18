import Header from "../components/Header";
import greenCircle from "../assets/images/bill/greencircle.svg";
import dogFoot from "../assets/images/bill/Dogfoot.svg";
import blueStar from "../assets/images/bill/blueStar.svg";
import catYellow from "../assets/images/bill/catyellow.svg";
import { Link } from "react-router-dom";

const BillBooking = () => {
  return (
    <div className="w-full relative">
      <Header />
      <div className="w-[50%] mx-auto">
        <div className="mx-auto w-[584px] mt-6 h-[560px] bg-white rounded-xl drop-shadow-lg overflow-hidden">
          <div className="flex flex-col justify-center items-center mx-auto px-4 py-8 bg-black text-white ">
            <h2 className="text-3xl font-medium  ">Thank you For Booking</h2>
            <p className="mt-2 text-[#AEB1C3] tracking-wide">
              We will send your booking information to Pet Sitter.
            </p>
          </div>
          <div className="px-8 mt-6">
            <p className="text-[#AEB1C3] tracking-wide">
              Transaction Date: Tue, 16 Oct 2022
            </p>
            <p className="text-[#AEB1C3] tracking-wide">
              Transaction No. : 122312
            </p>
          </div>
          <div className="px-8 mt-6">
            <h3 className="text-[#7B7E8F] tracking-wide">Pet Sitter:</h3>
            <p className="tracking-wide text-[#3A3B46]">
              Happy House! By Jane Maison
            </p>
          </div>

          <div className="px-8 mt-6  flex items-center">
            <div className="">
              <h3 className="text-[#7B7E8F] tracking-wide">Date & Time:</h3>
              <p className="tracking-wide text-[#3A3B46]">
                25 Aug, 2023 | 7 AM - 10 AM
              </p>
            </div>
            <div className="ml-12 mt-6">
              <h3 className="text-[#7B7E8F] tracking-wide">Duration:</h3>
              <p className="tracking-wide text-[#3A3B46]">3 hours</p>
            </div>
          </div>

          <div className="px-8 mt-4">
            <h3 className="text-[#7B7E8F] tracking-wide">Pet:</h3>
            <p className="tracking-wide text-[#3A3B46]">Mr. Ham, Bingsu</p>
            <hr className="mt-6" />
          </div>
          <div className="py-8  mt-2s  flex  justify-between">
            <p className="mx-8 ">Total</p>
            <p className="mx-8 ">900.00 THB</p>
          </div>
        </div>
        <div className="w-full flex justify-center mt-6">
          <div className="mt-4 flex  px-8 pb-4">
            <button className="px-6 py-3 mr-2 text-sm bg-[#FFF1EC]  text-[#FF7037]  rounded-full font-semibold">
              Booking Detail
            </button>
            <Link to="/">
              <button className="px-6 py-3 bg-[#FF7037] text-sm text-white rounded-full font-semibold">
                Back To Home
              </button>
            </Link>
          </div>
        </div>
      </div>
      <img className="absolute top-[20%] left-4" src={greenCircle} alt="" />
      <img className="absolute top-[38%] left-[10%]" src={dogFoot} alt="" />
      <img className="absolute bottom-[40%] right-[5%]" src={blueStar} alt="" />
      <img className="absolute bottom-[5%] right-[5%]" src={catYellow} alt="" />
    </div>
  );
};

export default BillBooking;
