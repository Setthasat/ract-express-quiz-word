import { useState } from "react";
import useStore from "../Store/Word";

function Popup(props: any) {

  const addWord = useStore((state) => state.addWord);
  const getWords = useStore((state) => state.getWords);

  const handleClosePopup = () => {
    props.setTogglePopup(!props.togglePopup);
  };

  const [Word, setWord] = useState({
    Word: "",
    part_of_speech: ""
  });

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setWord((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    addWord(Word);
    console.log(getWords());
    setWord({
      Word: "",
      part_of_speech: ""
    });
    handleClosePopup();
  };

  return (
    <div className="absolute items-center bg-black/30 justify-center backdrop-blur-sm w-screen h-screen">
      <div className="flex items-center justify-center w-screen h-screen">
        <div
          className="
          bg-gradient-to-t
          bg-violet-200
          w-[40rem]
          h-[20rem]"
        >
          <div className="flex justify-end items-center bg-opacity-75 bg-blue-300 w-[40rem] h-[2rem] font-bold">
            <button
              onClick={handleClosePopup}
              className="flex bg-red-500 rounded-sm w-[2rem] h-full justify-center items-center text-white"
            >
              x
            </button>
          </div>
          <div className="flex justify-center items-center mt-[2rem]">
            <form onSubmit={onSubmit}>
              <input onChange={onChangeInput}
                className="w-[25rem] flex justify-center items-center font-thin border-white border-b-[1px] placeholder:text-white placeholder:font-thin focus:outline-none text-white bg-transparent h-[3rem]"
                name="Word"
                type="text"
                value={Word.Word}
                placeholder="Word" />
              <select onChange={onChangeInput}
                className="w-[25rem] flex justify-center items-center font-thin border-white border-b-[1px] placeholder:text-white placeholder:font-thin focus:outline-none text-white bg-transparent h-[3rem]"
                name="part_of_speech"
                value={Word.part_of_speech}>
                <option value="" disabled>Part of Speech</option>
                <option value="noun">Noun</option>
                <option value="verb">Verb</option>
                <option value="adjective">Adjective</option>
                <option value="adverb">Adverb</option>
              </select>
              <button type="submit"
                className="mt-[2rem] bg-transparent h-full w-full text-white border py-2 px-4  rounded-lg">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Popup;
