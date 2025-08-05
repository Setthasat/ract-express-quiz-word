import axios from "axios";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../store/store";

function Login() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const setUser = useStore((state) => state.setUser);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const user = {
      email: emailRef.current?.value || "",
      password: passwordRef.current?.value || "",
    };

    try {
      const response = await axios.post("http://localhost:8888/api/auth/login", user);
      const userData = response.data.data;

      setUser({
        user_id: userData.user_id,
        email: user.email,
      });

      setShowPopup(true);

      setTimeout(() => {
        setShowPopup(false);
        navigate("/Homepage");
      }, 3000);
    } catch (error) {
      console.error("Login error:", error);
    }

    if (emailRef.current) emailRef.current.value = "";
    if (passwordRef.current) passwordRef.current.value = "";
  };

  return (
    <div className="flex flex-col justify-start items-center border border-white bg-white/10 backdrop-blur-md w-[36%] h-auto py-[2rem] bg-white rounded-2xl shadow-inner sm:py-12 md:py-16 lg:py-[3rem] px-[3rem]">
      <div className="flex justify-center items-start h-auto w-full">
        <h1 className="text-white text-[4rem]">Login</h1>
      </div>
      <div className="mt-[4rem] w-[66%]">
        <form
          onSubmit={handleSubmit}
          className="flex gap-[3rem] text-[1.5rem] text-white flex-col justify-center items-center"
        >
          <div className="relative justify-center items-center">
            <input
              ref={emailRef}
              className="w-full h-[4rem] bg-transparent focus:outline-none border-b-2 border-white text-white text-lg placeholder-transparent peer"
              type="email"
              placeholder="Email"
            />
            <label
              className="absolute left-0 text-[1.25rem] text-gray-400 transition-all duration-300 transform -translate-y-6 scale-75 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-500 peer-focus:-translate-y-6 peer-focus:text-white"
            >
              email
            </label>

          </div>

          <div className="relative justify-center items-center">
            <input
              ref={passwordRef}
              className="w-full h-[4rem] bg-transparent focus:outline-none border-b-2 border-white text-white text-lg placeholder-transparent peer"
              type="password"
              placeholder="Password"
            />
            <label
              className="absolute left-0 text-[1.25rem] text-gray-400 transition-all duration-300 transform -translate-y-6 scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-500 peer-focus:-translate-y-6 peer-focus:text-white"
            >
              password
            </label>
          </div>
          <button
            type="submit"
            className="w-full border-[1px] p-2 rounded-full mt-[2rem] hover:bg-white/15 duration-300"
          >
            Login
          </button>
        </form>
      </div>
      <a
        href="/register"
        className="mt-6 text-white underline-offset-4 underline text-end w-[66%]"
      >
        Create an account?
      </a>

      {/* Popup */}
      {showPopup && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center">
          <div className="bg-white border rounded-lg shadow-lg p-6 w-[48%] text-center">
            <h2 className="text-violet-600 text-2xl mb-4">Login Successful!</h2>
            <p className="text-violet-400">Redirecting to Home . . .</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
