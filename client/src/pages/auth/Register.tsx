import React, { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import emailjs from "emailjs-com";

function Register() {
  const emailRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const otpRef = useRef<HTMLInputElement>(null);

  const [showOTPField, setShowOTPField] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  // Generate OTP
  const generateOTP = (): string => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const sendOTPEmail = (email: string, otp: string) => {
    emailjs.send(
      "service_y8rwj9p",
      "template_1fgk7me",
      {
        user_email: email,
        otp_code: otp,
      },
      "TBtoUmfuso6NDg03O"
    )
      .then(
        (result) => {
          console.log("OTP email sent:", result.text);
        },
        (error) => {
          console.log("Error sending OTP:", error.text);
        }
      );
  };

  // Handle form submission for registration
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const inputEmail = emailRef.current?.value || "";
    const username = usernameRef.current?.value || "";
    const password = passwordRef.current?.value || "";
    const confirmPassword = confirmPasswordRef.current?.value || "";

    console.log("Email:", inputEmail);
    console.log("Username:", username);
    console.log("Password:", password);
    console.log("Confirm Password:", confirmPassword);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setTimeout(() => setError(""), 3000);
      return;
    }

    try {
      // Generate OTP in frontend
      const otp = generateOTP();

      // Send OTP to backend and save OTP in the database
      await axios.post("http://localhost:8888/api/auth/register", {
        user_id: uuidv4(),
        email: inputEmail,
        username,
        password,
        otp,
      });

      sendOTPEmail(inputEmail, otp);

      setEmail(inputEmail);
      setShowOTPField(true);
    } catch (err) {
      setError("Registration failed. Try again.");
      setTimeout(() => setError(""), 3000);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();

    const otp = otpRef.current?.value || "";

    console.log("Received email:", email);
    console.log("Received OTP:", otp);

    try {
      await axios.post("http://localhost:8888/api/auth/verify-email", {
        email: email,
        otp: otp,
      });

      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
        navigate("/login");
      }, 3000);
    } catch (err) {
      setError("Invalid OTP. Try again.");
      setTimeout(() => setError(""), 3000);
    }
  };

  return (
    <div className="flex flex-col justify-start items-center border border-white bg-white/10 backdrop-blur-md w-[36%] h-auto py-[2rem] bg-white rounded-2xl shadow-inner sm:py-12 md:py-16 lg:py-[3rem] px-[3rem]">
      <div className="flex justify-center items-start h-auto w-full">
        <h1 className="text-white text-[4rem]">Register</h1>
      </div>
      {!showOTPField ? (
        <>
          <div className="mt-[4rem] w-[66%]">
            <form
              onSubmit={handleSubmit}
              className="flex gap-[3rem] text-[1.5rem] text-white flex-col justify-center items-center"
            >
              <div className="relative w-full">
                <input
                  ref={emailRef}
                  className="w-full h-[4rem] bg-transparent focus:outline-none border-b-2 border-white text-white text-lg placeholder-transparent peer"
                  type="email"
                  placeholder="Email"
                />
                <label className="absolute left-0 text-[1.25rem] text-gray-400 transition-all duration-300 transform -translate-y-6 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-500 peer-focus:-translate-y-6 peer-focus:text-white">
                  email
                </label>
              </div>
              <div className="relative w-full">
                <input
                  ref={usernameRef}
                  className="w-full h-[4rem] bg-transparent focus:outline-none border-b-2 border-white text-white text-lg placeholder-transparent peer"
                  type="text"
                  placeholder="Username"
                />
                <label className="absolute left-0 text-[1.25rem] text-gray-400 transition-all duration-300 transform -translate-y-6 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-500 peer-focus:-translate-y-6 peer-focus:text-white">
                  username
                </label>
              </div>
              <div className="relative w-full">
                <input
                  ref={passwordRef}
                  className="w-full h-[4rem] bg-transparent focus:outline-none border-b-2 border-white text-white text-lg placeholder-transparent peer"
                  type="password"
                  placeholder="Password"
                />
                <label className="absolute left-0 text-[1.25rem] text-gray-400 transition-all duration-300 transform -translate-y-6  peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-500 peer-focus:-translate-y-6 peer-focus:text-white">
                  password
                </label>
              </div>
              <div className="relative w-full">
                <input
                  ref={confirmPasswordRef}
                  className="w-full h-[4rem] bg-transparent focus:outline-none border-b-2 border-white text-white text-lg placeholder-transparent peer"
                  type="password"
                  placeholder="Confirm Password"
                />
                <label className="absolute left-0 text-[1.25rem] text-gray-400 transition-all duration-300 transform -translate-y-6 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-500 peer-focus:-translate-y-6 peer-focus:text-white">
                  confirm password
                </label>
              </div>
              {error && <p className="text-red-500 text-[1.25rem]">{error}</p>}
              <button
                type="submit"
                className="w-full border-[1px] p-2 rounded-full mt-[2rem] hover:bg-white/15 duration-300"
              >
                Register
              </button>
            </form>
          </div>
          <a
            href="/login"
            className="mt-6 text-white underline-offset-4 underline text-end w-[66%]"
          >
            Already have an account?
          </a>
        </>
      ) : (
        <form onSubmit={handleVerifyOTP} className="w-full flex flex-col gap-4">
          <h2 className="text-white text-xl font-semibold text-center">Enter OTP</h2>
          <h2 className="text-white text-xl font-semibold text-center">OTP is sending to {email}</h2>
          <input ref={otpRef} className="w-full h-12 bg-transparent border-b-2 border-white text-white text-2xl text-center placeholder-gray-500 focus:outline-none" type="text" maxLength={6} placeholder="" />
          {error && <p className="text-red-500 text-center">{error}</p>}
          <button type="submit" className="w-full bg-violet-600 hover:bg-violet-700 text-white py-2 rounded-full transition duration-300 text-lg font-semibold">Verify OTP</button>
        </form>
      )}

      {showPopup && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center">
          <div className="bg-white border rounded-lg shadow-lg p-6 w-[48%] text-center">
            <h2 className="text-violet-600 text-2xl mb-4">Registration Successful!</h2>
            <p className="text-violet-400">Redirecting to login . . .</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Register;