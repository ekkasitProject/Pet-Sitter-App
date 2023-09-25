import React, { useState } from "react";
import Frame_427321178 from "../assets/images/elements/Frame_427321178.svg";
import Frame_427320934 from "../assets/images/elements/Frame_427320934.svg";
import { useAuth } from "../context/authentication";

function RegistrationForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [petOwner, setPetOwner] = useState(false);
  const [petSitter, setPetSitter] = useState(false);
  const [errors, setErrors] = useState({});

  const { register } = useAuth();

  const handlePetOwnerChange = (e) => {
    setPetOwner(e.target.checked);
  };

  const handlePetSitterChange = (e) => {
    setPetSitter(e.target.checked);
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate Name
    if (username.length < 6 || username.length > 20) {
      newErrors.username = "Username must be between 6 and 20 characters";
    }

    // Validate Email
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!email.match(emailPattern)) {
      newErrors.email = "Invalid email format";
    }

    // Validate Phone
    const phonePattern = /^0[0-9]{9}$/;
    if (!phone.match(phonePattern)) {
      newErrors.phone = "Invalid phone number format";
    }

    // Validate Password
    if (password.length <= 12) {
      newErrors.password = "Password must be longer than 12 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const data = {
        username,
        email,
        phone,
        password,
        petOwner,
        petSitter,
      };
      register(data);

      if (petOwner) {
        console.log("User selected Pet Owner role");
      }

      if (petSitter) {
        console.log("User selected Pet Sitter role");
      }
    }
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
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                placeholder="your username "
                required
                className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors.username && (
                <p className="mt-2 text-sm text-red-600">{errors.username}</p>
              )}
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
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="example@email.com"
                required
                className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-600">{errors.email}</p>
              )}
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
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                placeholder="Your phone number"
                required
                className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors.phone && (
                <p className="mt-2 text-sm text-red-600">{errors.phone}</p>
              )}
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
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Create your password..."
                required
                className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors.password && (
                <p className="mt-2 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            <div className="flex items-center mt-4 space-x-4">
              <label className="block text-sm font-medium text-gray-700">
                Role Selection:
              </label>
              <div className="flex space-x-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="role"
                    // checked={petOwner}
                    // onChange={handlePetOwnerChange}
                    className="form-checkbox h-4 w-4 accent-orange-600"
                  />
                  <span className="ml-2 text-sm text-gray-600">Pet Owner</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="role"
                    //  checked={petSitter}
                    //  onChange={handlePetSitterChange}
                    className="form-checkbox h-4 w-4 accent-orange-600"
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
          {/* <div className="mt-6">
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
          </div> */}
          <div className="mt-6">
            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <a
                href="/login"
                className="font-medium text-orange-600 hover:text-orange-100"
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
