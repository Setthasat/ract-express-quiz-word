import axios from "axios";
import { useState, useEffect } from "react";
import { useStore } from "../../store/store";
import { useNavigate } from "react-router-dom";

const partOfSpeechOptions = ["noun", "verb", "adjective", "adverb"];

interface Word {
  id: string;
  user_id: string;
  word: string;
  part_of_speech: string;
  definition: string;
  isOptimistic?: boolean;
}

interface AddWordProps {
  onAddWord: (word: Word) => void;
  onRemoveWord: (wordId: string) => void;
  onReplaceWord: (tempId: string, realWord: Word) => void;
}

function AddWord({ onAddWord, onRemoveWord, onReplaceWord }: AddWordProps) {
  const getUserId = useStore((state) => state.getUserId);
  const navigate = useNavigate();
  const userID = getUserId();

  useEffect(() => {
    if (!userID) {
      navigate("/login");
      return;
    }
  }, [userID, navigate]);

  const [isComplete, setIsComplete] = useState(false);
  const [isError, setIsError] = useState(false);
  const [Word, setWord] = useState({
    user_id: userID || "",
    word: "",
    part_of_speech: "",
  });

  useEffect(() => {
    if (userID) {
      setWord((prev) => ({ ...prev, user_id: userID }));
    }
  }, [userID]);

  if (!userID) {
    return (
      <div className="p-6 w-full flex flex-col sm:flex-row justify-between items-start gap-6 bg-[#333446] mt-[8rem]">
        <div className="bg-slate-900 w-full rounded-3xl shadow-xl shadow-black/40 p-6 flex flex-col min-h-[25rem]">
          <div className="flex justify-center items-center flex-grow">
            <p className="text-white text-center">
              Loading user information...
            </p>
          </div>
        </div>
      </div>
    );
  }

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setWord((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePartOfSpeechChange = (part: string) => {
    setWord((prev) => ({
      ...prev,
      part_of_speech: part,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!userID) {
      console.error("User ID is not available");
      return;
    }

    const wordData = {
      user_id: userID,
      word: Word.word,
      part_of_speech: Word.part_of_speech,
    };

    let definition = "Definition not available";
    if (dictData) {
      const meaning = dictData.meanings?.find(
        (m: any) => m.partOfSpeech === Word.part_of_speech
      );
      if (meaning && meaning.definitions?.[0]?.definition) {
        definition = meaning.definitions[0].definition;
      }
    }

    const tempId = `temp-${Date.now()}`;
    const optimisticWord: Word = {
      id: tempId,
      user_id: userID,
      word: Word.word,
      part_of_speech: Word.part_of_speech,
      definition: definition,
      isOptimistic: true,
    };

    try {
      onAddWord(optimisticWord);

      const api = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/create/word`,
        wordData
      );

      if (!api.data.data) {
        // If API fails, remove the optimistic update
        onRemoveWord(tempId);
        setIsComplete(false);
        setIsError(true);
        setTimeout(() => setIsError(false), 2000);
      } else {
        // API success - replace optimistic update with real data
        const realWord: Word = {
          ...api.data.data,
          definition: definition, // Keep the definition we fetched
        };
        onReplaceWord(tempId, realWord);

        setIsComplete(true);
        setIsError(false);
        setTimeout(() => setIsComplete(false), 1000);
      }
    } catch (error) {
      console.error("Error:", error);
      // Remove optimistic update on error
      onRemoveWord(tempId);
      setIsComplete(false);
      setIsError(true);
      setTimeout(() => setIsError(false), 2000);
    }

    // Reset form
    setWord({
      user_id: userID,
      word: "",
      part_of_speech: "",
    });
  };

  const isFormValid = Word.word.trim() !== "" && Word.part_of_speech !== "";

  const [dictData, setDictData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!Word.word) {
      setDictData(null);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${Word.word}`
        );
        setDictData(res.data[0]);
      } catch (error) {
        setDictData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [Word.word, Word.part_of_speech]);

  return (
    <div className="p-6 w-full flex flex-col sm:flex-row justify-between items-start gap-6 bg-[#333446] mt-[8rem]">
      {/* LEFT SIDE - Dictionary Result */}
      <div className="bg-slate-900 w-full sm:w-1/3 h-[25rem] rounded-3xl shadow-xl shadow-black/40 p-6 flex flex-col">
        {loading || (Word.word && !Word.part_of_speech) ? (
          <div className="flex justify-center items-center flex-grow">
            <div className="w-12 h-12 border-4 border-t-transparent border-purple-400 rounded-full animate-spin"></div>
          </div>
        ) : dictData ? (
          <div className="flex flex-col space-y-4 flex-grow overflow-y-auto text-white">
            <h2 className="text-4xl font-extrabold text-purple-300 tracking-wide">
              {dictData.word}
            </h2>
            {(() => {
              const meaning = dictData.meanings?.find(
                (m: any) => m.partOfSpeech === Word.part_of_speech
              );

              if (!meaning) {
                return (
                  <p className="text-red-400 text-sm italic">
                    No definition found for "{Word.part_of_speech}"
                  </p>
                );
              }

              return (
                <>
                  <span className="inline-block bg-purple-600/20 text-purple-300 text-xs font-semibold px-3 py-1 rounded-full w-fit">
                    {meaning.partOfSpeech}
                  </span>

                  <div className="bg-white/5 p-4 rounded-xl shadow-inner whitespace-pre-wrap break-words leading-relaxed">
                    <p className="text-base text-gray-200">
                      {meaning.definitions?.[0]?.definition}
                    </p>
                  </div>
                </>
              );
            })()}
          </div>
        ) : (
          <div className="flex justify-center items-center flex-grow text-white/50 text-center">
            <p>
              Type a word & select a part of speech to see its definition...
            </p>
          </div>
        )}
      </div>

      {/* RIGHT SIDE - Create Word Form */}
      <div className="w-full sm:w-2/3 h-[25rem] bg-slate-900 rounded-3xl p-6 shadow-lg shadow-black/30 flex flex-col">
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-wide text-purple-300">
          ADD WORD
        </h1>
        <form
          className="flex flex-col justify-center items-center gap-6 flex-grow"
          onSubmit={handleSubmit}
        >
          <input
            onChange={onChangeInput}
            className="w-full h-[3.5rem] p-2 rounded-lg text-center shadow-xl focus:outline-none text-white bg-white/10 focus:bg-white/30 focus:duration-300 duration-300"
            name="word"
            type="text"
            value={Word.word}
            placeholder="Enter word"
          />

          <div className="grid grid-cols-2 gap-3 w-full">
            {partOfSpeechOptions.map((part) => (
              <button
                key={part}
                type="button"
                onClick={() => handlePartOfSpeechChange(part)}
                className={`flex justify-center items-center h-[3rem] rounded-lg text-white text-lg ${
                  Word.part_of_speech === part
                    ? "bg-gradient-to-r from-purple-500 to-violet-500 shadow-lg"
                    : "bg-white/10 hover:bg-white/20"
                } transition-all`}
              >
                {part.charAt(0).toUpperCase() + part.slice(1)}
              </button>
            ))}
          </div>

          {Word.part_of_speech && (
            <button
              type="submit"
              disabled={!isFormValid}
              className={`w-full h-[3rem] py-2 text-white rounded-lg shadow-lg transition-all ${
                isError
                  ? "bg-red-500 hover:bg-red-600"
                  : isComplete
                  ? "bg-green-500 hover:bg-green-600"
                  : isFormValid
                  ? "bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600"
                  : "bg-white/5 hover:bg-white/15 cursor-not-allowed"
              }`}
            >
              {isError
                ? "Failed to add word"
                : isComplete
                ? "Word added!"
                : "Add Word"}
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default AddWord;
