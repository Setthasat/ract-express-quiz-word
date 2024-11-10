import { useState } from 'react';

function QuizDisplay({ quizData }: any) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [score, setScore] = useState(0);
    const [isQuizFinished, setIsQuizFinished] = useState(false);

    const handleAnswerSelection = (choice: any) => {
        setSelectedAnswer(choice);
    };

    const handleNextQuestion = () => {
        const currentQuestion = quizData[currentQuestionIndex];
        if (selectedAnswer === currentQuestion.correctAnswer) {
            setScore(score + 1);
        }

        setSelectedAnswer(null); // Reset selected answer for the next question

        if (currentQuestionIndex < quizData.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setIsQuizFinished(true); // End the quiz when questions are finished
        }
    };

    if (isQuizFinished) {
        return (
            <div className="flex flex-col items-center text-white">
                <p className="text-[3rem] font-bold">Quiz Finished!</p>
                <p className="text-lg">Your score: {score} / {quizData.length}</p>
                <button className='w-full h-[4rem] p-[2rem] bg-white/5 hover:bg-white/40 rounded-lg mt-[2rem] text-3xl'>Go Back To Home</button>
            </div>
        );
    }

    const currentQuestion = quizData[currentQuestionIndex];

    return (
        <div className="flex flex-col justify-center items-center max-w-[30rem] text-white">
            <h2 className="text-2xl font-bold my-[2rem]">Question {currentQuestionIndex + 1}</h2>
            <p className="text-xl mb-4">Select the definition for : {currentQuestion.word}</p>

            <div className="flex flex-col gap-12 mb-[2rem]">
                {currentQuestion.choices.map((choice: any, index: any) => (
                    <button
                        key={index}
                        onClick={() => handleAnswerSelection(choice)}
                        className={`p-4 m-2 text-left rounded-md mt-[2rem] ${selectedAnswer === choice ? 'bg-gradient-to-r from-purple-500 to-violet-500 duration-300 text-white' : 'bg-white/5 hover:bg-white/40 text-white'}`}
                    >
                        {choice}
                    </button>
                ))}
            </div>

            <button
                onClick={handleNextQuestion}
                disabled={!selectedAnswer}
                className={`w-full h-[4rem] mt-[2rem] text-white rounded-md disabled:bg-gray-300 
                    ${!selectedAnswer ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}
            >
                Next
            </button>
        </div>
    );
}

export default QuizDisplay;
