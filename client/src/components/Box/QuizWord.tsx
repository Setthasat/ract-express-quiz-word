import axios from "axios";
import QuizDisplay from "./QuizDisplay";
import { useState, useEffect } from "react";
import { useStore } from "../../store/store";
import { useNavigate } from "react-router-dom";

function QuizWord() {
  const [choiceLength, setChoiceLength] = useState("");
  const [buttonState, setButtonState] = useState({
    color: "",
    text: "Start Quiz",
  });
  const [quizData, setQuizData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showQuizModal, setShowQuizModal] = useState(false);

  const getUserId = useStore((state) => state.getUserId);
  const navigate = useNavigate();
  const userID = getUserId();

  useEffect(() => {
    if (!userID) {
      navigate("/login");
      return;
    }
  }, [userID, navigate]);

  // Don't render if no user ID
  if (!userID) {
    return (
      <div className="p-6 w-full flex flex-col justify-center items-center bg-[#333446]">
        <div className="w-full bg-slate-900 rounded-3xl shadow-xl shadow-black/40 p-6 flex flex-col h-[32rem]">
          <div className="flex justify-center items-center h-full">
            <p className="text-white text-center">
              Loading user information...
            </p>
          </div>
        </div>
      </div>
    );
  }

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setChoiceLength(value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!userID) return;

    const userData = {
      user_id: userID,
    };

    try {
      setIsLoading(true);
      const allDataLength = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/get/words`,
        userData
      );
      const availableWordsCount = allDataLength.data.data.length;
      const choiceLengthInt = parseInt(choiceLength);

      if (isNaN(choiceLengthInt) || choiceLengthInt <= 0) {
        setButtonState({
          color: "bg-red-500",
          text: "Please enter a valid number",
        });
        setTimeout(
          () => setButtonState({ color: "", text: "Start Quiz" }),
          3000
        );
        return;
      }

      if (choiceLengthInt < 3) {
        setButtonState({ color: "bg-red-500", text: "Must be greater than 3" });
        setTimeout(
          () => setButtonState({ color: "", text: "Start Quiz" }),
          3000
        );
      } else if (choiceLengthInt > availableWordsCount) {
        setButtonState({
          color: "bg-red-500",
          text: "Not enough words in list",
        });
        setTimeout(
          () => setButtonState({ color: "", text: "Start Quiz" }),
          3000
        );
      } else {
        const quizReq = {
          user_id: userID,
          choiceLength: choiceLengthInt,
        };
        const response = await axios.post(
          `${import.meta.env.VITE_SERVER_URL}/api/quiz`,
          quizReq
        );
        console.log(response.data.data);
        setQuizData(response.data.data);
        setButtonState({ color: "bg-green-500", text: "Quiz Generated!" });
        setShowQuizModal(true); // Show the modal
      }
    } catch (error) {
      console.error("Error fetching or generating quiz:", error);
      setButtonState({ color: "bg-red-500", text: "Error generating quiz" });
      setTimeout(() => setButtonState({ color: "", text: "Start Quiz" }), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  const resetQuiz = () => {
    setQuizData(null);
    setChoiceLength("");
    setButtonState({ color: "", text: "Start Quiz" });
    setShowQuizModal(false);
  };

  const closeModal = () => {
    setShowQuizModal(false);
  };

  return (
    <>
      <div className="p-6 w-full flex flex-col justify-center items-center bg-[#333446]">
        <div className="w-full max-w-6xl bg-slate-900 rounded-3xl shadow-xl shadow-black/40 p-6 flex flex-col min-h-[32rem]">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-white text-4xl font-extrabold tracking-wide text-purple-300">
              QUIZ WORDS
            </h1>
          </div>

          <div className="flex-grow">
            <div className="flex flex-col justify-center items-center h-full space-y-8">
              {/* Quiz Setup Form */}
              <div className="w-full max-w-lg">
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col space-y-6"
                >
                  {/* Input Field */}
                  <div className="space-y-2">
                    <label className="block text-white text-sm font-medium">
                      Number of Questions
                    </label>
                    <input
                      type="number"
                      value={choiceLength}
                      onChange={onChangeInput}
                      placeholder="Enter quiz length (min 3)"
                      min="3"
                      className="w-full h-[3.5rem] p-4 rounded-lg text-center shadow-xl focus:outline-none text-white bg-white/10 focus:bg-white/30 focus:duration-300 duration-300 border border-white/20"
                    />
                  </div>

                  {/* Requirements Info */}
                  <div className="bg-white/5 p-4 rounded-xl">
                    <h3 className="text-white font-semibold mb-2">
                      Requirements:
                    </h3>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Minimum 3 questions</li>
                      <li>• You need at least 3 words in your list</li>
                      <li>• Quiz will test your word knowledge</li>
                    </ul>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading || !choiceLength.trim()}
                    className={`w-full h-[3.5rem] text-white font-medium rounded-lg shadow-lg transition-all ${
                      isLoading
                        ? "bg-white/10 cursor-not-allowed"
                        : buttonState.color
                        ? buttonState.color
                        : choiceLength.trim()
                        ? "bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600"
                        : "bg-white/10 cursor-not-allowed"
                    }`}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                        <span>Generating...</span>
                      </div>
                    ) : (
                      buttonState.text
                    )}
                  </button>
                </form>
              </div>             
            </div>
          </div>
        </div>
      </div>

      {/* Quiz Modal */}
      {showQuizModal && quizData && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4">
          <div className="bg-slate-900 rounded-2xl sm:rounded-3xl shadow-2xl shadow-black/60 p-4 sm:p-8 w-full max-w-sm sm:max-w-2xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto relative">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 sm:top-4 sm:right-4 text-white hover:text-red-400 text-xl sm:text-2xl font-bold transition-colors z-10"
            >
              ×
            </button>

            {/* Modal Header */}
            <div className="text-center mb-4 sm:mb-6">
              <h2 className="text-white text-xl sm:text-3xl font-bold text-purple-300">
                Quiz Time!
              </h2>
            </div>

            {/* Quiz Display Component */}
            <QuizDisplay quizData={quizData} onQuizComplete={resetQuiz} />
          </div>
        </div>
      )}
    </>
  );
}

export default QuizWord;