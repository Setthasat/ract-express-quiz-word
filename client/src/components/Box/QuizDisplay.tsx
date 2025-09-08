import { useState } from 'react';

interface QuizDisplayProps {
    quizData: any;
    onQuizComplete?: () => void;
}

function QuizDisplay({ quizData, onQuizComplete }: QuizDisplayProps) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [score, setScore] = useState(0);
    const [isQuizFinished, setIsQuizFinished] = useState(false);
    const [showResults, setShowResults] = useState(false);

    const handleAnswerSelection = (choice: any) => {
        setSelectedAnswer(choice);
    };

    const handleNextQuestion = () => {
        const currentQuestion = quizData[currentQuestionIndex];
        if (selectedAnswer === currentQuestion.correctAnswer) {
            setScore(score + 1);
        }

        setSelectedAnswer(null);

        if (currentQuestionIndex < quizData.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setIsQuizFinished(true);
            setShowResults(true);
        }
    };

    const handleFinishQuiz = () => {
        if (onQuizComplete) {
            onQuizComplete();
        }
    };

    const getScoreColor = () => {
        const percentage = (score / quizData.length) * 100;
        if (percentage >= 80) return 'text-green-400';
        if (percentage >= 60) return 'text-yellow-400';
        return 'text-red-400';
    };

    const getScoreMessage = () => {
        const percentage = (score / quizData.length) * 100;
        if (percentage >= 80) return 'Excellent! 🎉';
        if (percentage >= 60) return 'Good job! 👏';
        return 'Keep practicing! 💪';
    };

    if (isQuizFinished && showResults) {
        return (
            <div className="flex flex-col items-center text-white text-center space-y-4 sm:space-y-6 px-2">
                <div className="text-4xl sm:text-6xl">🎯</div>
                <h2 className="text-2xl sm:text-4xl font-bold text-purple-300">Quiz Complete!</h2>
                <div className="bg-white/10 rounded-2xl p-4 sm:p-6 w-full max-w-md">
                    <p className="text-lg sm:text-2xl mb-2">Your Score:</p>
                    <p className={`text-3xl sm:text-5xl font-bold ${getScoreColor()}`}>
                        {score} / {quizData.length}
                    </p>
                    <p className="text-base sm:text-lg mt-2 opacity-80">
                        {Math.round((score / quizData.length) * 100)}%
                    </p>
                    <p className="text-lg sm:text-xl mt-4 text-purple-300">
                        {getScoreMessage()}
                    </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full max-w-md">
                    <button
                        onClick={handleFinishQuiz}
                        className="flex-1 h-10 sm:h-12 bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600 text-white rounded-lg font-semibold transition-all duration-300 shadow-lg text-sm sm:text-base"
                    >
                        New Quiz
                    </button>
                    <a
                        href="/Homepage"
                        className="flex-1 h-10 sm:h-12 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-semibold transition-all duration-300 shadow-lg flex items-center justify-center text-sm sm:text-base"
                    >
                        Go Home
                    </a>
                </div>
            </div>
        );
    }

    const currentQuestion = quizData[currentQuestionIndex];

    return (
        <div className="flex flex-col items-center text-white w-full max-w-2xl mx-auto px-2">
            {/* Progress Bar */}
            <div className="w-full mb-4 sm:mb-6">
                <div className="flex justify-between text-xs sm:text-sm mb-2">
                    <span>Question {currentQuestionIndex + 1} of {quizData.length}</span>
                    <span>Score: {score}</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                    <div 
                        className="bg-gradient-to-r from-purple-500 to-violet-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${((currentQuestionIndex + 1) / quizData.length) * 100}%` }}
                    ></div>
                </div>
            </div>

            {/* Question */}
            <div className="text-center mb-6 sm:mb-8 w-full">
                <h3 className="text-lg sm:text-2xl font-bold mb-3 sm:mb-4 text-purple-300">
                    What does this word mean?
                </h3>
                <div className="bg-white/10 rounded-2xl p-4 sm:p-6">
                    <p className="text-2xl sm:text-4xl font-bold text-white break-words">
                        {currentQuestion.word}
                        {(currentQuestion.part_of_speech || currentQuestion.pos) && 
                            ` (${currentQuestion.part_of_speech || currentQuestion.pos})`
                        }
                    </p>
                </div>
            </div>

            {/* Answer Choices */}
            <div className="w-full space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                {currentQuestion.choices.map((choice: any, index: number) => (
                    <button
                        key={index}
                        onClick={() => handleAnswerSelection(choice)}
                        className={`w-full p-3 sm:p-4 text-left rounded-xl transition-all duration-300 ${
                            selectedAnswer === choice 
                                ? 'bg-gradient-to-r from-purple-500 to-violet-500 text-white shadow-lg transform scale-[1.02]' 
                                : 'bg-white/10 hover:bg-white/20 text-white hover:transform hover:scale-[1.01]'
                        }`}
                    >
                        <div className="flex items-start">
                            <span className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white/20 flex items-center justify-center mr-2 sm:mr-3 text-xs sm:text-sm font-bold flex-shrink-0 mt-0.5">
                                {String.fromCharCode(65 + index)}
                            </span>
                            <span className="text-sm sm:text-base leading-tight">{choice}</span>
                        </div>
                    </button>
                ))}
            </div>

            {/* Next Button */}
            <button
                onClick={handleNextQuestion}
                disabled={!selectedAnswer}
                className={`w-full h-12 sm:h-14 text-white font-semibold rounded-xl transition-all duration-300 text-sm sm:text-base ${
                    selectedAnswer 
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 shadow-lg' 
                        : 'bg-slate-600 cursor-not-allowed opacity-50'
                }`}
            >
                {currentQuestionIndex === quizData.length - 1 ? 'Finish Quiz' : 'Next Question'}
            </button>
        </div>
    );
}

export default QuizDisplay;