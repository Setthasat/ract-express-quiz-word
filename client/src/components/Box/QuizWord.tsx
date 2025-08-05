import axios from 'axios';
import QuizDisplay from './QuizDisplay';
import Hamburger from '../Hamburger';
import { useState, useEffect } from 'react';
import { useStore } from '../../store/store';
import { useNavigate } from 'react-router-dom';

function QuizWord() {
  const [choiceLength, setChoiceLength] = useState('');
  //@ts-ignore
  const [isLessThanThree, setIsLessThanThree] = useState(false);
  //@ts-ignore
  const [isEnoughWord, setIsEnoughWord] = useState(false);
  const [buttonState, setButtonState] = useState({ color: '', text: 'Start' });
  const [quizData, setQuizData] = useState(null);


  const getUserId = useStore((state) => state.getUserId);
  const navigate = useNavigate();
  const userID = getUserId();

  useEffect(() => {
    if (!getUserId()) {
      navigate("/login");
    }
  }, [getUserId, navigate]);

  const onChangeInput = (event: any) => {
    const { value } = event.target;
    setChoiceLength(value);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const userData = {
      user_id: userID
    };
    try {
      const allDataLength = await axios.post("http://localhost:8888/api/get/words", userData);
      const availableWordsCount = allDataLength.data.data.length;
      const choiceLengthInt = parseInt(choiceLength);

      if (choiceLengthInt < 3) {
        setIsLessThanThree(true);
        setButtonState({ color: 'bg-red-500', text: 'Your choice length must be greater than 3' });
        setTimeout(() => setButtonState({ color: '', text: 'Start' }), 3000);
      } else if (choiceLengthInt > availableWordsCount) {
        setIsEnoughWord(true);
        setButtonState({ color: 'bg-red-500', text: 'Not enough words in list' });
        setTimeout(() => setButtonState({ color: '', text: 'Start' }), 3000);
      } else {
        const quizReq = {
          user_id: userID,
          choiceLength: choiceLengthInt
        };
        const response = await axios.post("http://localhost:8888/api/quiz", quizReq);
        console.log(response.data.data);
        setQuizData(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching or generating quiz:", error);
    }
  };

  return (
    <div className='flex flex-col justify-center items-center border border-white bg-white/10 backdrop-blur-md w-full sm:w-3/4 md:w-2/3 lg:w-1/2 max-h-[55rem] h-[55rem] bg-white rounded-2xl shadow-inner py-8 sm:py-12 md:py-16 lg:py-[12rem]'>
      <div className='absolute top-12 left-12'>
        <Hamburger />
      </div>
      <div className='grid justify-center items-start h-full w-full -mt-[8rem] px-4 sm:px-8 lg:px-16'>
        <div className='border-b-2 w-full flex items-center justify-center pb-[2rem] text-center'>
          <p className='flex justify-center items-center text-white font-bold text-3xl md:text-4xl lg:text-5xl'>
            QUIZ
          </p>
        </div>
        {quizData ? (
          <QuizDisplay quizData={quizData} />
        ) : (
          <form onSubmit={handleSubmit} className='flex flex-col items-center'>
            <input
              type='number'
              value={choiceLength}
              onChange={onChangeInput}
              placeholder='Enter your choice length'
              className='w-[32rem] max-w-[40rem] h-[6rem] p-2 rounded-lg text-center shadow-xl focus:outline-none text-white bg-white/20 focus:bg-white/40 duration-300'
            />
            <button
              type='submit'
              className={`w-full mt-[4rem] h-[4rem] text-white ${buttonState.color || 'bg-white/5 hover:bg-white/40'} duration-300 rounded-lg`}
            >
              {buttonState.text}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default QuizWord;
