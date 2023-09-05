import React, { useState } from "react";
import Frame_427321178 from "../assets/images/elements/Frame_427321178.svg"
import Frame_427320934 from "../assets/images/elements/Frame_427320934.svg";
import Facebook_logo from"../assets/images/elements/Facebook_logo.svg"
import google_logo from "../assets/images/elements/google_logo.svg"


function LoginPage() {
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
    console.log(formData);
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
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
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
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="rememberMe"
                  name="rememberMe"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                />
                <label
                  htmlFor="rememberMe"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-orange-600 hover:text-orange-500"
                >
                  Forgot your password?
                </a>
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
              Or continue with
            </p>
            <div className="flex justify-center mt-2">
              <button
                type="button"
                className="group relative w-full flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-full text-gray-700 bg-gray-100 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
               <icon src={Facebook_logo} alt="" /> Facebook
              </button>
              <button
                src={google_logo}
                type="button"
                className="ml-3 group relative w-full flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-full text-gray-700 bg-gray-100 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
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
                className="font-medium text-orange-600 hover:text-orange-500"
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

export default LoginPage;
