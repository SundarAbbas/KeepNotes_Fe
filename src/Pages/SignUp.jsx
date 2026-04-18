import React, { useState } from "react";
import axios from "axios";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/signup/",
        formData,
      );
      console.log("Success", response.data);
      alert("SignUp SuccessFull");
      alert("Now You Can Login");

      setFormData({
        username: "",
        email: "",
        password: "",
      });
    } catch (error) {
      console.error("Error : ", error.response.data);
      alert("SignUp Failed : " + JSON.stringify(error.response.data));
    }
  };

  return (
    <div className="login-container bg-black flex justify-center flex-col items-center h-screen ">
      <h2 className="text-white text-5xl font-extrabold tracking-tight mb-10">
        Keep <span className="text-blue-500">Notes</span>{" "}
      </h2>

      <form
        className="bg-white shadow-lg rounded px-8 pt-10 pb-10 flex flex-col"
        onSubmit={handleSubmit}
      >
        <div className="mb-6">
          {/* <label className="block text-gray-700 font-bold text-md  mb-4">
            Username
          </label> */}
          <input
            type="text"
            placeholder="Username"
            value={formData.username}
            name="username"
            onChange={handleChange}
            className="mb-2  shadow appearance-none border border-gray-400  rounded w-full py-2 px-7 text-gray-700 leading-tight focus:ring-2 "
            required
          />
        </div>
        <div className="mb-6">
          {/* <label className="block text-gray-700 font-bold text-md  mb-4">
            Username
          </label> */}
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            name="email"
            onChange={handleChange}
            className="mb-2  shadow appearance-none border border-gray-400  rounded w-full py-2 px-7 text-gray-700 leading-tight focus:ring-2 "
            required
          />
        </div>
        <div className="mb-6">
          {/* <label className="text-gray-700 font-bold block text-md mb-4">
            Password
          </label> */}
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            name="password"
            onChange={handleChange}
            className="mb-2 shadow appearance-none border border-gray-400  rounded w-full py-2 px-7 text-gray-700 leading-tight focus:ring-2 "
            required
          />
          {/* <p className="italic text-red-500 text-sm">
            Please Enter Your Password
          </p> */}
        </div>
        <button
          className="bg-blue-400 hover:bg-blue-500 text-white font-bold transition px-6 py-2 w-full active:scale-95 transition-all"
          type="submit"
        >
          SignUp
        </button>
        <div className="flex items-center p-3 justify-between">
          <span className="text-sm">Already Have An Account ?</span>
          <a href="/login" className="font-bold text-sm underline">
            Login
          </a>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
