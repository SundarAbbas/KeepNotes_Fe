import React, { useState } from "react";
import axios from "axios";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/signup/",
        formData,
      );
      alert("Success! You can now login.");
      setFormData({ username: "", email: "", password: "" });
    } catch (error) {
      console.error("Error:", error.response?.data);
      alert("Registration failed. Please check your details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-4">
      {/* Brand Header */}
      <div className="mb-8 text-center">
        <h2 className="text-4xl font-extrabold text-slate-800 tracking-tight">
          Keep <span className="text-blue-600">Notes</span>
        </h2>
        <p className="text-slate-500 mt-2">
          Create your account to get started
        </p>
      </div>

      {/* Form Card */}
      <form
        className="bg-white border border-slate-200 shadow-xl shadow-blue-100/50 w-full max-w-md rounded-2xl p-8 transition-all"
        onSubmit={handleSubmit}
      >
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Username
            </label>
            <input
              type="text"
              placeholder="Enter your username"
              value={formData.username}
              name="username"
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-slate-700"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="name@example.com"
              value={formData.email}
              name="email"
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-slate-700"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={formData.password}
              name="password"
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-slate-700"
              required
            />
          </div>

          <button
            disabled={loading}
            className={`w-full py-3 rounded-xl text-white font-bold text-lg shadow-lg transition-all active:scale-[0.98] 
              ${loading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 hover:shadow-blue-200"}`}
            type="submit"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-100 justify-between">
          <p className="text-slate-600 text-sm">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-blue-600 font-bold hover:underline"
            >
              Log in
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
