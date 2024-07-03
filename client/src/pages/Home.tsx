import React from "react";
import Body from "../components/Home/Body/Body";
import Popup from "./Popup";
import { useStore } from "../store/store";

function Home() {
  const { isPopupOpen, togglePopup } = useStore();

  return (
    <div className="flex justify-center items-center w-screen h-screen relative">
      {isPopupOpen && (
        <Popup
          // @ts-ignore
          setTogglePopup={togglePopup}
        />
      )}
      <Body togglePopup={togglePopup} setTogglePopup={togglePopup} />
    </div>
  );
}

export default Home;
