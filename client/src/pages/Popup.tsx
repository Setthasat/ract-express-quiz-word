import axios from 'axios';
import { useState } from 'react';
import { useStore } from '../store/store';

function Popup() {
  const { isPopupOpen, togglePopup } = useStore(); // Access Zustand store

  const [Word, setWord] = useState({
    word: '',
    part_of_speech: '',
  });

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setWord((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const wordData = {
      word: Word.word,
      part_of_speech: Word.part_of_speech,
    };

    try {
      const api = await axios.post('http://localhost:8888/api/create/word', wordData);
      if (!api.data.data) {
        console.log('Cannot get api');
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
      word: '',
      part_of_speech: '',
    });

    togglePopup();
  };

  const handleClosePopup = () => {
    togglePopup();
  };

  return (
    <div className={`fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm ${isPopupOpen ? 'visible' : 'hidden'}`}>
      <div className="bg-white rounded-lg shadow-lg w-[40rem] h-[25rem]">
        <div className="flex justify-between items-center p-4 bg-gradient-to-r from-purple-500 to-violet-500 rounded-t-lg">
          <h2 className="text-xl font-bold text-white">Add New Word</h2>
          <button onClick={handleClosePopup} className="text-white text-2xl">
            &times;
          </button>
        </div>
        <div className="p-6">
          <form onSubmit={onSubmit} className="space-y-4">
            <input
              onChange={onChangeInput}
              className="w-full p-2 border-b-2 border-gray-300 placeholder:text-black focus:outline-none focus:border-violet-500"
              name="word"
              type="text"
              value={Word.word}
              placeholder="Word"
            />
            <select
              onChange={onChangeInput}
              className="w-full p-2 border-b-2 border-gray-300 focus:outline-none focus:border-violet-500"
              name="part_of_speech"
              value={Word.part_of_speech}
            >
              <option value="" disabled>
                Part of Speech
              </option>
              <option value="noun">Noun</option>
              <option value="verb">Verb</option>
              <option value="adjective">Adjective</option>
              <option value="adverb">Adverb</option>
            </select>
            <button
              type="submit"
              className="w-full py-2 bg-gradient-to-r from-purple-500 to-violet-500 text-white font-bold rounded-lg shadow-lg hover:from-purple-600 hover:to-violet-600 transition-all"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Popup;
