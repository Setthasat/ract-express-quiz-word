import Home from "./pages/Home";
import Box from "./pages/Box";
import { useState } from "react";

function App() {

  const [changeBox, setChageBox] = useState({
    AddWord: false,
    WordList: false,
    QuizWord: false
  });

  return (
    <div className="flex items-center mx-[10rem] h-screen">
      <Home setChageBox={setChageBox} changeBox={changeBox}/>
      <Box  changeBox={changeBox}/>
    </div>
  );
}

export default App;
