import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Home() {
  const QuizHeadText = ["Q", "U", "I", "Z", "•", "W", "O", "R", "D"];

  return (
    <div className="flex justify-center items-center flex-col w-screen h-screen">
      <h1 className="text-5xl font-bold text-white">
        GET START WITH "QUIZ WORD"
      </h1>
      <p></p>
    </div>
  );
}

export default Home;
