import React, { useState } from "react";
import Frame_427321178 from "../assets/images/elements/Frame_427321178.svg";
import Frame_427320934 from "../assets/images/elements/Frame_427320934.svg";


function RegistrationForm() {
  const [formData, setFormData] = useState({
    email: "",
    userName: "",
    phoneNumber: "",
    password: "",
    petOwner: false, // Initially set to false
    petSitter: false, // Initially set to false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // If the input is a checkbox, handle it differently
    if (type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="relative">
      <div className="absolute top-0 right-0">
        <img src={Frame_427321178} alt="" />
      </div>

      <div className="min-h-screen flex items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h1 className="mt-6 text-center text-5xl font-bold text-gray-900">
              Join us!
            </h1>
            <h2 className="mt-6 text-center text-2xl font-extrabold text-gray-500">
              Find your perfect pet sitter with us
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="userName"
                className="block text-sm font-medium text-gray-700"
              >
                Name:
              </label>
              <input
                id="userName"
                name="userName"
                type="userName"
                value={formData.userName}
                onChange={handleChange}
                placeholder="your username "
                required
                className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email:
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@email.com"
                required
                className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number:
              </label>
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Your phone number"
                required
                className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password:
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create your password..."
                required
                className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div className="flex items-center mt-4 space-x-4">
              <label className="block text-sm font-medium text-gray-700">
                Role Selection:
              </label>
              <div className="flex space-x-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="petOwner"
                    checked={formData.petOwner}
                    onChange={handleChange}
                    className="form-checkbox h-4 w-4 text-indigo-600"
                  />
                  <span className="ml-2 text-sm text-gray-600">Pet Owner</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="petSitter"
                    checked={formData.petSitter}
                    onChange={handleChange}
                    className="form-checkbox h-4 w-4 text-indigo-600"
                  />
                  <span className="ml-2 text-sm text-gray-600">Pet Sitter</span>
                </label>
              </div>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-full text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              >
                Register
              </button>
            </div>
          </form>
          <div className="mt-6">
            <p className="text-center text-sm text-gray-600">
              Or continue with
            </p>
            <div className="flex justify-center mt-2">
              <button
                type="button"
                className="group relative w-full flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Facebook
              </button>
              <button
                type="button"
                className="ml-3 group relative w-full flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Gmail
              </button>
            </div>
          </div>
          <div className="mt-6">
            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <a
                href="/login"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Login
              </a>
            </p>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0">
        <img className="flex items-start" src={Frame_427320934} alt="" />
      </div>
    </div>
  );
}

export default RegistrationForm;
