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
    <div className="relative flex h-screen w-screen bg-gradient-to-br from-violet-500 to-violet-800 overflow-hidden">
      <button onClick={toggleSidebar} className="fixed top-4 left-4 text-3xl text-white z-50 focus:outline-none">
        <FiMenu />
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
  );
}

export default App;
