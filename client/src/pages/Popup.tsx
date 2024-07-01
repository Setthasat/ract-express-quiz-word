import axios from "axios";
import { useState } from "react";

function Popup(props: any) {


  const handleClosePopup = () => {
    props.setTogglePopup(!props.togglePopup);
  };

  const [Word, setWord] = useState({
    word: "",
    part_of_speech: ""
  });

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setWord((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const wordData = {
      word: Word.word,
      part_of_speech: Word.part_of_speech
    };

    try {
      const api = await axios.post("http://localhost:8888/api/create/word", wordData,);
      if (!api.data.data) {
        console.log("Cannot get api");
        return;
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error:', error.response?.data);
      } else {
        console.error('Unexpected error:', error);
      }
    }

    setWord({
      word: "",
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
                name="word"
                type="text"
                value={Word.word}
                placeholder="word" />
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
