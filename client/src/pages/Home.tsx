import React from "react";
import Body from "../components/Home/Body";
import Popup from "./Popup";

function Home() {
  const [togglePopup, setTogglePopup] = React.useState<Boolean>(false);

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gradient-to-t from-violet-400 to-violet-600">
      {togglePopup ? (
        <Popup
          togglePopup={togglePopup}
          setTogglePopup={setTogglePopup}
        ></Popup>
      ) : (
        <></>
      )}
      <Body togglePopup={togglePopup} setTogglePopup={setTogglePopup} />
    </div>
  );
}

export default Home;
