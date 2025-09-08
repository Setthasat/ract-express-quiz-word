import { useNavigate } from "react-router-dom";
import { MoveUpRight } from "lucide-react";
import Background from "../components/Background";

function Home() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/login");
  };

  return (
    <div
      className="flex justify-center items-center flex-col w-screen h-screen cursor-pointer px-4"
      onClick={handleClick}
    >
      <div className="absolute h-screen w-screen z-[-1]">
        {/* @ts-ignore */}
        <Background />
      </div>
      {/* Heading */}
      <h1 className="text-xl sm:text-3xl md:text-5xl font-bold text-white text-center">
        GET START WITH <span className="text-yellow-500">"QUIZ WORD"</span>
      </h1>

      {/* Subtext - single line without overflow */}
      <div className="mt-4 w-full">
        <p className="text-sm sm:text-base md:text-lg text-gray-100 flex justify-center items-center gap-2 truncate">
          <span className="bg-white text-yellow-500 py-1 px-2 rounded-md flex items-center gap-1 text-xs sm:text-base md:text-lg">
            Level up <MoveUpRight size={16} />
          </span>
          your English vocabulary in a fun and simple way!
        </p>
      </div>

      {/* Bottom animation text */}
      <div className="flex justify-center items-center text-center fixed bottom-4 w-full">
        <p className="text-sm sm:text-base md:text-xl text-white underline underline-offset-8 fade-loop">
          Click anywhere to get started
        </p>
      </div>
    </div>
  );
}

export default Home;
