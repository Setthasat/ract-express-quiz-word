import { MoveUpRight } from "lucide-react";

function Home() {
  return (
    <div className="flex justify-center items-center flex-col w-screen h-screen">
      <h1 className="text-5xl font-bold text-white">
        GET START WITH <span className="text-yellow-500">"QUIZ WORD"</span>
      </h1>
      <div className="flex justify-center items-center text-center mt-4">
        <p className="text-xl flex justify-center items-center  gap-2 text-gray-100">
          <span className="bg-white text-yellow-500 p-2 rounded-md flex gap-2 text-xl">
            Level up <MoveUpRight />
          </span>{" "}
          your English vocabulary in a fun and simple way !
        </p>
      </div>
      <div className="flex justify-center items-center text-center fixed bottom-4">
        <p className="text-2xl text-white underline underline-offset-8 fade-loop">Click screen to get start</p>
      </div>
    </div>
  );
}

export default Home;
