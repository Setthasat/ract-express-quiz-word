import React, { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import emailjs from "emailjs-com";
import Background from "../../components/Background";

function Register() {
  const emailRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const otpRef = useRef<HTMLInputElement>(null);

  const [showOTPField, setShowOTPField] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("Verify OTP");

  const [pendingUser, setPendingUser] = useState<{
    user_id: string;
    email: string;
    username: string;
    password: string;
    otp: string;
  } | null>(null);

  const navigate = useNavigate();

  // Generate OTP
  const generateOTP = (): string => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const sendOTPEmail = (email: string, otp: string) => {
    emailjs
      .send(
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const inputEmail = emailRef.current?.value || "";
    const username = usernameRef.current?.value || "";
    const password = passwordRef.current?.value || "";
    const confirmPassword = confirmPasswordRef.current?.value || "";

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setTimeout(() => setError(""), 3000);
      return;
    }

    const otp = generateOTP();

    setPendingUser({
      user_id: uuidv4(),
      email: inputEmail,
      username,
      password,
      otp,
    });

    sendOTPEmail(inputEmail, otp);
    setEmail(inputEmail);
    setShowOTPField(true);
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("Verifying...");

    const otp = otpRef.current?.value || "";

    if (!pendingUser) {
      setError("No registration data found.");
      return;
    }

    if (otp !== pendingUser.otp) {
      setError("Invalid OTP. Try again.");
      setMessage("Verify OTP");
      setTimeout(() => setError(""), 3000);
      return;
    }

    try {
      await axios.post(`${import.meta.env.VITE_SERVER_URL}/auth/register`, {
        ...pendingUser,
      });

      await axios.post(`${import.meta.env.VITE_SERVER_URL}/auth/verify-email`, {
        email,
        otp,
      });

      setMessage("Registration successful!");
      setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      setMessage("Registration failed.");
      setError("Something went wrong.");
      setTimeout(() => setError(""), 3000);
    }
  };

  return (
    <div className="flex justify-center items-center w-full min-h-screen">
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
          <h1 className="text-white text-4xl sm:text-5xl md:text-6xl">
            Register
          </h1>
        </div>

        {!showOTPField ? (
          <>
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
                  <label className="absolute left-0 text-base sm:text-lg text-gray-200 transition-all duration-300 transform -translate-y-6 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-200 peer-focus:-translate-y-6 peer-focus:text-white">
                    email
                  </label>
                </div>

                {/* Username */}
                <div className="relative w-full">
                  <input
                    ref={usernameRef}
                    className="w-full h-12 sm:h-14 bg-transparent focus:outline-none border-b-2 border-gray-200 text-white text-base sm:text-lg placeholder-transparent peer"
                    type="text"
                    placeholder="Username"
                  />
                  <label className="absolute left-0 text-base sm:text-lg text-gray-200 transition-all duration-300 transform -translate-y-6 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-200 peer-focus:-translate-y-6 peer-focus:text-white">
                    username
                  </label>
                </div>

                {/* Password */}
                <div className="flex justify-between gap-6">
                  <div className="relative w-full">
                    <input
                      ref={passwordRef}
                      className="w-full h-12 sm:h-14 bg-transparent focus:outline-none border-b-2 border-gray-200 text-white text-base sm:text-lg placeholder-transparent peer"
                      type="password"
                      placeholder="Password"
                    />
                    <label className="absolute left-0 text-base sm:text-lg text-gray-200 transition-all duration-300 transform -translate-y-6 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-200 peer-focus:-translate-y-6 peer-focus:text-white">
                      password
                    </label>
                  </div>

                  {/* Confirm Password */}
                  <div className="relative w-full">
                    <input
                      ref={confirmPasswordRef}
                      className="w-full h-12 sm:h-14 bg-transparent focus:outline-none border-b-2 border-gray-200 text-white text-base sm:text-lg placeholder-transparent peer"
                      type="password"
                      placeholder="Confirm Password"
                    />
                    <label className="absolute left-0 text-base sm:text-lg text-gray-200 transition-all duration-300 transform -translate-y-6 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-200 peer-focus:-translate-y-6 peer-focus:text-white">
                      confirm password
                    </label>
                  </div>
                </div>

                {error && (
                  <p className="text-red-500 text-base sm:text-lg">{error}</p>
                )}

                <button
                  type="submit"
                  className="w-full border p-2 sm:p-3 rounded-full mt-6 sm:mt-8 hover:bg-white/15 duration-300"
                >
                  Register
                </button>
              </form>
            </div>

            <p
              onClick={() => navigate("/login")}
              className="mt-6 text-white cursor-pointer underline-offset-4 underline text-sm sm:text-base text-end w-full sm:w-3/4"
            >
              Already have an account?
            </p>
          </>
        ) : (
          <form
            onSubmit={handleVerifyOTP}
            className="w-full sm:w-3/4 flex flex-col gap-4 sm:gap-6 mt-6"
          >
            <h2 className="text-white text-sm sm:text-lg text-center">
              OTP is sent to : {email}
            </h2>
            <input
              ref={otpRef}
              className="w-full h-12 bg-transparent border-b-2 border-gray-200 text-white text-xl sm:text-2xl text-center placeholder-gray-500 focus:outline-none"
              type="text"
              maxLength={6}
              placeholder="Enter OTP here"
              onInput={(e) => {
                const target = e.target as HTMLInputElement;
                target.value = target.value.replace(/\D/g, "");
              }}
            />

            {error && <p className="text-red-500 text-center">{error}</p>}
            <button
              type="submit"
              className="w-full bg-black/20 hover:bg-violet-700 text-white py-2 border  rounded-full transition duration-300 text-base sm:text-lg font-semibold"
            >
              {message}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Register;
