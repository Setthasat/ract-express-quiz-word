import { useStore } from "../store/store";
import { useState, useEffect } from "react";
import { LogOut } from "lucide-react";

function Navbar() {
  const getUserId = useStore((state) => state.getUserId);
  const userId = getUserId();
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) setUsername(storedUsername);
  }, [userId]);

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      <nav className="flex justify-between items-center">
        <div className="w-screen px-12 py-2">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <a
                href="/home"
                className="text-4xl font-bold text-white flex justify-center items-center gap-2"
              >
                QUIZ WORD
              </a>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex space-x-4 items-center justify-center h-full text-white text-2xl">
                <h1 className=" flex justify-center items-center gap-4 px-3 py-2 rounded-md font-medium duration-300">
                  {username}
                </h1>
                <button className="px-3 py-2 rounded-md font-medium duration-300 hover:rotate-180 ">
                  <LogOut />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
