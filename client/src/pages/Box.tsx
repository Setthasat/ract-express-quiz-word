import { motion } from "framer-motion";
import { useStore } from "../store/store";
import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "../components/Navbar";

function Box() {
  const getUserId = useStore((state) => state.getUserId);
  const navigate = useNavigate();
  const userId = useStore((state) => state.user?.user_id);

  useEffect(() => {
    if (!getUserId()) {
      navigate("/login");
    }
  }, [getUserId, navigate]);

  console.log(userId)

  return (
    <>
      <Navbar />
      <div className="relative flex flex-col justify-center items-center border border-white bg-white/5 backdrop-blur-md w-[90%] sm:w-[70%] max-w-[80rem] min-h-[32rem] h-auto rounded-2xl shadow-inner p-6 sm:p-10 lg:p-16">        
        <div className="flex flex-wrap justify-center items-center text-white mt-12 gap-5">
          <Link
            to="/AddWord"
            className="flex justify-center items-center px-10 py-4 border-white rounded-md border hover:bg-white/20 duration-300"
          >
            Add
          </Link>
          <Link
            to="/WordList"
            className="flex justify-center items-center px-10 py-4 border-white rounded-md border hover:bg-white/20 duration-300"
          >
            List
          </Link>
          <Link
            to="/QuizWord"
            className="flex justify-center items-center px-10 py-4 border-white rounded-md border hover:bg-white/20 duration-300"
          >
            Quiz
          </Link>
        </div>
      </div>
    </>
  );
}

export default Box;
