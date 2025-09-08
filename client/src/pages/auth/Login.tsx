import axios from "axios";
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../store/store";
import Background from "../../components/Background";

function Login() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const setUser = useStore((state) => state.setUser);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const user = {
      email: emailRef.current?.value || "",
      password: passwordRef.current?.value || "",
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/auth/login`,
        user
      );
      const userData = response.data.data;

      setUser({
        username: userData.username,
        user_id: userData.user_id,
        email: user.email,
      });

      navigate("/Homepage");
    } catch (error) {
      console.error("Login error:", error);
    }

    if (emailRef.current) emailRef.current.value = "";
    if (passwordRef.current) passwordRef.current.value = "";
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <Background />
      <div
        className="flex flex-col justify-start items-center bg-black/5 backdrop-blur-md 
        w-[90%] sm:w-[48%] max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-4xl 
        py-8 sm:py-12 md:py-16 lg:py-20 
        px-6 sm:px-8 md:px-12 lg:px-16 
        rounded-2xl shadow-inner"
      >
        {/* Header */}
        <div className="flex justify-center items-start w-full">
          <h1 className="text-white text-4xl sm:text-5xl md:text-6xl">Login</h1>
        </div>
        {/* Form */}
        <div className="mt-8 sm:mt-12 w-full sm:w-3/4">
          <form
            onSubmit={handleSubmit}
            className="flex gap-8 text-lg sm:text-xl text-white flex-col justify-center items-center"
          >
            {/* Email */}
            <div className="relative w-full">
              <input
                ref={emailRef}
                className="w-full h-12 sm:h-14 bg-transparent focus:outline-none border-b-2 border-gray-200 text-white text-base sm:text-lg placeholder-transparent peer"
                type="email"
                placeholder="Email"
              />
              <label
                className="absolute left-0 text-base sm:text-lg text-gray-400 transition-all duration-300 transform 
                -translate-y-6 scale-75 
                peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-200 
                peer-focus:-translate-y-6 peer-focus:text-white"
              >
                email
              </label>
            </div>

            {/* Password */}
            <div className="relative w-full">
              <input
                ref={passwordRef}
                className="w-full h-12 sm:h-14 bg-transparent focus:outline-none border-b-2 border-gray-200 text-white text-base sm:text-lg placeholder-transparent peer"
                type="password"
                placeholder="Password"
              />
              <label
                className="absolute left-0 text-base sm:text-lg text-gray-400 transition-all duration-300 transform 
                -translate-y-6 scale-75 
                peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-200 
                peer-focus:-translate-y-6 peer-focus:text-white"
              >
                password
              </label>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full border p-2 sm:p-3 rounded-full mt-6 sm:mt-8 hover:bg-white/15 duration-300"
            >
              Login
            </button>
          </form>
        </div>

        {/* Register Link */}
        <p
          onClick={() => navigate("/register")}
          className="mt-6 text-white cursor-pointer underline-offset-4 underline text-sm sm:text-base text-end w-full sm:w-3/4"
        >
          Create an account?
        </p>
      </div>
    </div>
  );
}

export default Login;
