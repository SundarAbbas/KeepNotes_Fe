import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../Services/authService";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(username, password);
      navigate("/");
    } catch (err) {
      setError("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container bg-slate-50  flex justify-center flex-col items-center min-h-screen p-4 ">
      <div className="mb-8 text-center">
        <h2 className="text-slate-800 text-4xl  font-extrabold tracking-tight ">
          Keep <span className="text-blue-600">Notes</span>{" "}
        </h2>
        <p className="text-slate-500 mt-2">
          Login to Start Tracking Your Development
        </p>
      </div>

      <form
        className="bg-white border border-slate-200  shadow-xl shadow-blue-100/50 w-full max-w-md rounded-2xl p-8"
        onSubmit={handleSubmit}
      >
        <div className="space-y-5">
          <div>
            <label className="block text-slate-700 font-semibold text-sm  mb-1">
              Username
            </label>

            <input
              type="text"
              placeholder="name@example.com"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mb-2  shadow appearance-none border border-slate-300  rounded-xl w-full py-3 px-4 leading-tight outline-none transition-all focus:ring-2 focus:border-transparent focus:ring-blue-500 text-slate-700"
              required
            />
          </div>

          <div>
            <label className="text-slate-700 font-semibold block text-sm mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="*******"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mb-2  shadow appearance-none border border-slate-300  rounded-xl w-full py-3 px-4 leading-tight outline-none transition-all focus:ring-2 focus:border-transparent focus:ring-blue-500 text-slate-700"
              required
            />
          </div>
          <button
            // className="bg-blue-400 hover:bg-blue-500 text-white font-bold transition px-6 py-2 w-full active:scale-95 transition-all"
            className={`w-full py-3 rounded-xl text-lg font-bold text-white transitona-all shadow-;g activate-scale-[0.98] 
              ${loading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 hover:shadow-blue-200"}
              `}
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging In" : "Login"}
          </button>
        </div>
        <div className="border-t border-slate-100  mt-8 pt-6 justify-between">
          <span className="text-sm text-slate-600">Dont Have An Account ?</span>
          <a href="/signup" className="font-bold ms-1 text-blue-600 hover:underline">
            Signup
          </a>
        </div>
      </form>
    </div>
  );
}

export default Login;
