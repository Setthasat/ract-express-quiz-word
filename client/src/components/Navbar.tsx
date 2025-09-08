import { useStore } from "../store/store";
import { LogOut } from "lucide-react";
import { Link } from "react-router-dom";

function Navbar() {
  const user = useStore((state) => state.user);
  const logout = useStore((state) => state.logout);
  

  const username = user?.username || "";

  return (
    <div className="absolute top-1 left-0 w-full z-50">
      <nav className="flex justify-between items-center px-4 sm:px-12 py-2">
        <div className="flex justify-between w-full h-16">
          <a
            href="/home"
            className="text-2xl sm:text-4xl font-bold text-white flex justify-center items-center gap-2"
          >
            QUIZ WORD
          </a>
          <div className="flex items-center space-x-4 text-white text-2xl">
            <h1 className="px-3 py-2 rounded-md font-medium">{username}</h1>
            <Link
              to="/login"
              onClick={logout}
              className="px-3 py-2 rounded-md font-medium "

            >
              <LogOut />
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
