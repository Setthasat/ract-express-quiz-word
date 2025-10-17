import QuizWord from "./components/Box/QuizWord";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/Home";
import Box from "./pages/Box";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="flex justify-between items-center w-full max-w-screen min-h-screen">
      {/* main div */}
      <div className="flex items-center justify-center w-full min-h-screen">
        <Routes>
          <Route index element={<Home />} />
          <Route path="/Homepage" element={<Box />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/QuizWord" element={<QuizWord />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
