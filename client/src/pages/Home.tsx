import React from "react";
import Body from "../components/Home/Body/Body";
import Popup from "./Popup";
import { useStore } from "../store/store";

function Home() {
  const { isPopupOpen, togglePopup } = useStore();

  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen relative">
      <h1 className="mb-[2rem] text-[5rem] font-bold">WORD QUIZ</h1>
      <div>
        {isPopupOpen && (
          <Popup
            // @ts-ignore
            setTogglePopup={togglePopup}
          />
        )}
        <Body togglePopup={togglePopup} setTogglePopup={togglePopup} />
      </div>
    </div>
  );
}

export default Home;
