import { useStore } from "../store/store";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import AddWord from "../components/Box/AddWord";
import WordList from "../components/Box/WordList";
import axios from "axios";
import QuizWord from "../components/Box/QuizWord";

interface Word {
  id: string;
  user_id: string;
  word: string;
  part_of_speech: string;
  definition: string;
  isOptimistic?: boolean;
}

export default function Box() {
  const getUserId = useStore((state) => state.getUserId);
  const navigate = useNavigate();
  const userId = useStore((state) => state.user?.user_id);
  const userID = getUserId();

  const [words, setWords] = useState<Word[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!getUserId()) {
      navigate("/login");
    }
  }, [getUserId, navigate]);

  if (!userID) {
    return <div>Loading...</div>;
  }

  const fetchWords = async () => {
    const userData = {
      user_id: userID,
    };

    try {
      setIsLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/get/words`,
        userData
      );
      const fetchedData = response.data.data;
      if (Array.isArray(fetchedData)) {
        setWords(fetchedData);
      } else {
        console.error("Fetched data is not an array");
      }
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (userID) {
      fetchWords();
    }
  }, [userID]);

  const addWordOptimistically = (word: Word) => {
    setWords((prevWords) => [...prevWords, word]);
  };

  const removeWord = (wordId: string) => {
    setWords((prevWords) => prevWords.filter((w) => w.id !== wordId));
  };

  const replaceWord = (tempId: string, realWord: Word) => {
    setWords((prevWords) =>
      prevWords.map((w) => (w.id === tempId ? realWord : w))
    );
  };

  console.log(userId);

  return (
    <div className="flex justify-center items-start w-full min-h-full bg-[#333446] overflow-y-auto">
      <Navbar />
      <div className="relative flex flex-col justify-start items-center max-w-screen min-h-full py-4 px-2 sm:px-4">
        <div className="w-full mb-4">
          <AddWord
            onAddWord={addWordOptimistically}
            onRemoveWord={removeWord}
            onReplaceWord={replaceWord}
          />
        </div>
        <div className="w-full flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
          <div className="w-full lg:w-1/2">
            <WordList words={words} isLoading={isLoading} />
          </div>
          <div className="w-full lg:w-1/2">
            <QuizWord />
          </div>
        </div>
      </div>
    </div>
  );
}
