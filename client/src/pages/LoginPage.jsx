import React, { useState, useEffect } from "react";
import Frame_427321178 from "../assets/images/elements/Frame_427321178.svg";
import Frame_427320934 from "../assets/images/elements/Frame_427320934.svg";
import Facebook_logo from "../assets/images/elements/Facebook_logo.svg";
import google_logo from "../assets/images/elements/google_logo.svg";
import { useAuth } from "../context/authentication";

function LoginPage() {
  const [role, setRole] = useState("");
  const { loginPetowner, loginPetsitter, logout } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (role == "petowner") {
      loginPetowner({
        email,
        password,
      });
    }

    if (role == "petsitter") {
      loginPetsitter({
        email,
        password,
      });
    }

    if (role == "") {
      alert("please choose role");
    }
  };

  return (
    <div className="relative">
      <div className="absolute top-0 right-0">
        <img src={Frame_427321178} alt="" />
      </div>

      <div className="min-h-screen flex items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8 ">
        <div className="max-w-md w-full space-y-8 ">
          <div>
            <h1 className="mt-6 text-center text-5xl font-black text-gray-900">
              Welcome back!
            </h1>
            <h2 className="mt-6 text-center text-xl font-light text-gray-900">
              Find your perfect pet sitter with us
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div>
              <h2>Email</h2>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <h2>Password</h2>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={formData.password}
                onChange={handleChange}
                className="appearance-none  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>

            <div className="flex items-center gap-4">
              <label className="block text-sm font-medium text-gray-700">
                Role Selection:
              </label>
              <div className="flex space-x-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="role"
                    value="petowner"
                    onClick={(e) => {
                      setRole(e.target.value);
                    }}
                    className="form-checkbox h-4 w-4 accent-orange-600"
                  />
                  <span className="ml-2 text-sm text-gray-600">Pet Owner</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="role"
                    value="petsitter"
                    onClick={(e) => {
                      setRole(e.target.value);
                    }}
                    className="form-checkbox h-4 w-4 accent-orange-600"
                  />
                  <span className="ml-2 text-sm text-gray-600">Pet Sitter</span>
                </label>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              >
                Sign in
              </button>
            </div>
          </form>

          <div className="mt-6">
            <p className="text-center text-sm text-gray-600">
              Didn't have an account?{" "}
              <a
                href="/register"
                className="font-medium text-orange-600 hover:text-orange-500"
              >
                Register
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

export default LoginPage;
