import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NotFoundPage from "./pages/NotFoundPage";
import WordList from "./pages/WordList";

function App() {
  return (
    <div className="flex justify-center items-center h-screen w-screen bg-gradient-to-br from-violet-500 to-violet-800">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/words' element={<WordList />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
