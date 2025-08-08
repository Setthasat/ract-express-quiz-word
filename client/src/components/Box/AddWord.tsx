import axios from 'axios';
import { useState, useEffect } from 'react';
import { useStore } from '../../store/store';
import { useNavigate } from 'react-router-dom';

import Hamburger from '../Hamburger';

const partOfSpeechOptions = ['noun', 'verb', 'adjective', 'adverb'];

function AddWord() {

    const getUserId = useStore((state) => state.getUserId);
    const navigate = useNavigate();
    const userID = getUserId();

    useEffect(() => {
        if (!getUserId()) {
            navigate("/login");
        }
    }, [getUserId, navigate]);

    const [isComplete, setIsComplete] = useState(false);
    const [isError, setIsError] = useState(false);

    const [Word, setWord] = useState({
        user_id: userID,
        word: '',
        part_of_speech: '',
    });

    const onChangeInput = (event: any) => {
        const { name, value } = event.target;
        setWord((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handlePartOfSpeechChange = (part: any) => {
        setWord((prev) => ({
            ...prev,
            part_of_speech: part,
        }));
    };

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        const wordData = {
            user_id: userID,
            word: Word.word,
            part_of_speech: Word.part_of_speech,
        };

        try {
            const api = await axios.post('http://localhost:8888/api/create/word', wordData);
            if (!api.data.data) {
                setIsComplete(false);
                setIsError(true);
            } else {
                setIsComplete(true);
                setIsError(false);

                setTimeout(() => {
                    setIsComplete(false);
                }, 1000);
            }
        } catch (error) {
            console.error('Error:', error);
            setIsComplete(false);
            setIsError(true);

            setTimeout(() => {
                setIsError(false);
            }, 1000);
        }

        setWord({
            user_id: userID,
            word: '',
            part_of_speech: '',
        });
    };

    const isFormValid = Word.word.trim() !== '' && Word.part_of_speech !== '';

    return (
        <div className='relative flex flex-col justify-center items-center border border-white bg-white/5 backdrop-blur-md w-full sm:w-3/4 md:w-2/3 lg:w-1/2 max-h-[55rem] h-[55rem] bg-white rounded-2xl shadow-inner py-8 sm:py-12 md:py-16 lg:py-[12rem]'>
            <div className='absolute top-12 left-12'>
                <Hamburger />
            </div>
            <div className='grid justify-center items-start h-full px-4 sm:px-6 md:px-8 lg:px-16'>
                <div className='border-b-2 w-full max-w-4xl flex items-center justify-center pb-4 md:pb-6 lg:pb-8 text-center'>
                    <p className='text-white font-bold -mt-[2rem] text-2xl sm:text-3xl md:text-4xl lg:text-5xl'>
                        ADD WORD
                    </p>
                </div>
                <div className='w-full flex justify-center mt-6 items-center'>
                    <form onSubmit={handleSubmit} className='w-full max-w-2xl sm:max-w-3xl md:max-w-4xl'>
                        <div className='flex flex-col gap-4 sm:gap-6 md:gap-8 lg:gap-10 justify-center items-center'>
                            <input
                                onChange={onChangeInput}
                                className='w-full sm:w-[25rem] md:w-[35rem] lg:w-[40rem] h-[3.5rem] md:h-[4.5rem] lg:h-[5.5rem] p-2 rounded-lg text-center shadow-xl focus:outline-none text-white bg-white/10 focus:bg-white/30 focus:duration-300 duration-300'
                                name='word'
                                type='text'
                                value={Word.word}
                                placeholder='Enter word'
                            />
                            <div className='grid grid-cols-2 sm:grid-cols-2 gap-4 w-full sm:w-[25rem] md:w-[35rem] lg:w-[40rem]'>
                                {partOfSpeechOptions.map((part) => (
                                    <button
                                        key={part}
                                        type='button'
                                        onClick={() => handlePartOfSpeechChange(part)}
                                        className={`flex justify-center items-center h-[3.5rem] md:h-[4.5rem] lg:h-[5.5rem] rounded-lg text-white text-lg md:text-xl lg:text-2xl ${Word.part_of_speech === part ? 'bg-gradient-to-r from-purple-500 to-violet-500 shadow-lg' : 'bg-white/10 hover:bg-white/15'} transition-all`}
                                    >
                                        {part.charAt(0).toUpperCase() + part.slice(1)}
                                    </button>
                                ))}
                            </div>
                            <button
                                type='submit'
                                disabled={!isFormValid}
                                className={`w-full sm:w-[18rem] md:w-[22rem] lg:w-[26rem] h-[3.5rem] md:h-[4.5rem] lg:h-[5.5rem] mt-4 py-2 text-white rounded-lg shadow-lg transition-all ${isError ? 'bg-red-500 hover:bg-red-600' : isComplete ? 'bg-green-500 hover:bg-green-600' : isFormValid ? 'bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600' : 'bg-white/5 hover:bg-white/15 cursor-not-allowed'}`}
                            >
                                <p className='text-lg md:text-xl lg:text-2xl'>
                                    {isError ? 'Fail to submit' : isComplete ? 'Success' : 'Submit'}
                                </p>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddWord;
