import Body from "../components/Home/Body/Body";
import Popup from "./Popup";
import { useStore } from "../store/store";
import { motion } from 'framer-motion';

function Home() {
  const { isPopupOpen, togglePopup } = useStore();

  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen relative">
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="mb-[2rem] text-[5rem] font-bold text-[#7E30E1] ">WORD QUIZ</motion.h1>
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
};

export default Home;
