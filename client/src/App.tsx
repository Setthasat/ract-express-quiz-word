import AddWord from "./components/Box/AddWord";
import QuizWord from "./components/Box/QuizWord";
import WordList from "./components/Box/WordList";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/Home";
import Box from "./pages/Box";
import { Routes, Route } from "react-router-dom";
import Background from "./components/Background";

function App() {



  return (
    <div className="flex justify-between items-center w-screen h-screen">
      {/* background */}
      <div className="absolute h-screen w-screen">
        {/* @ts-ignore */}
        <Background />
      </div>
      {/* main div */}
      <div className="flex items-center justify-center  w-screen h-screen">
        <Routes>
          <Route index element={<Home />} />
          <Route path="/Homepage" element={<Box />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/AddWord" element={<AddWord />} />
          <Route path="/WordList" element={<WordList />} />
          <Route path="/QuizWord" element={<QuizWord />} />
        </Routes>
      </div>
    </div>

  );
}

export default App;