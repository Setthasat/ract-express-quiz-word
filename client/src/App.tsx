import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NotFoundPage from "./pages/NotFoundPage";
import WordList from "./pages/WordList";
import SideBar from "./components/SideBar";
import { FiMenu } from 'react-icons/fi';
import { useState } from 'react';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="relative flex h-screen w-screen bg-gradient-to-br bg-[#F3F8FF] overflow-hidden">
      <div className="absolute z-50">
        <button onClick={toggleSidebar} className="fixed top-4 left-4 text-3xl text-white z-50 focus:outline-none">
          <FiMenu color="black" />
        </button>
        <SideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        {isSidebarOpen && (
          <div
            className="fixed top-0 left-0 w-full h-full bg-black/40 z-40"
            onClick={toggleSidebar}
          />
        )}

        <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-[20rem]' : 'ml-0'}`}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/words' element={<WordList />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </div>
      <svg className="absolute bottom-0 z-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path fill="#7E30E1 " fill-opacity="1" d="M0,32L30,37.3C60,43,120,53,180,74.7C240,96,300,128,360,122.7C420,117,480,75,540,96C600,117,660,203,720,250.7C780,299,840,309,900,266.7C960,224,1020,128,1080,122.7C1140,117,1200,203,1260,197.3C1320,192,1380,96,1410,48L1440,0L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"></path>
      </svg>
    </div>
  );
}

export default App;
