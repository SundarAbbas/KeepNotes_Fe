import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../Services/authService";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      navigate("/");
    } catch (err) {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="login-container bg-black flex justify-center flex-col items-center h-screen ">
      <h2 className="text-white text-5xl font-extrabold tracking-tight mb-10">Keep <span className="text-blue-500">Notes</span> </h2>

      <form
        className="bg-white shadow-lg rounded px-8 pt-10 pb-10 flex flex-col"
        onSubmit={handleSubmit}
      >
        {error && <div className="error">{error}</div>}
        <div className="mb-6">
          {/* <label className="block text-gray-700 font-bold text-md  mb-4">
            Username
          </label> */}
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
