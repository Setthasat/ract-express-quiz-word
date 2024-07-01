import React from "react";
import Body from "../components/Home/Body/Body";
import Popup from "./Popup";

function Home() {
  const [togglePopup, setTogglePopup] = React.useState<Boolean>(false);

  return (
    <div className="flex justify-center items-center w-screen h-screen">
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
