import axios from 'axios';
import React, { useState } from 'react';

const partOfSpeechOptions = ['noun', 'verb', 'adjective', 'adverb'];

function AddWord() {
    const [isComplete, setIsComplete] = useState(false);
    const [isError, setIsError] = useState(false); // Track error state

    const [Word, setWord] = useState({
        word: '',
        part_of_speech: '',
    });

    const onChangeInput = (
        event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = event.target;
        setWord((prev: any) => ({
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

        const wordData = {
            word: Word.word,
            part_of_speech: Word.part_of_speech,
        };

        try {
            const api = await axios.post('http://localhost:8888/api/create/word', wordData);
            if (!api.data.data) {
                console.log('Cannot get api');
                setIsComplete(false);
                setIsError(true); // Trigger error state
            } else {
                console.log('Success');
                setIsComplete(true); // Set to true on success
                setIsError(false); // Reset error state

                // Reset back to "Submit" after 3 seconds
                setTimeout(() => {
                    setIsComplete(false);
                }, 1000);
            }
        } catch (error) {
            console.error('Error:', error);
            setIsComplete(false);
            setIsError(true); // Set error state on failure

            // Reset back to "Submit" after 3 seconds
            setTimeout(() => {
                setIsError(false);
            }, 1000);
        }

        // Reset form after submission
        setWord({
            word: '',
            part_of_speech: '',
        });
    };

    const isFormValid = Word.word.trim() !== '' && Word.part_of_speech !== '';

    return (
        <div className='grid justify-center items-start h-full px-4 sm:px-8 lg:px-16'>
            <div className='border-b-2 w-full max-w-4xl flex items-center justify-center pb-[2rem] text-center'>
                <p className='flex justify-center items-center text-white font-bold text-3xl md:text-4xl lg:text-5xl'>
                    ADD WORD
                </p>
            </div>
            <div className='w-full flex justify-center items-center'>
                <form onSubmit={handleSubmit} className='w-full max-w-4xl'>
                    <div className='flex flex-col gap-6 md:gap-8 lg:gap-10 justify-center items-center'>
                        <input
                            onChange={onChangeInput}
                            className={`w-full md:w-[60rem] h-[6rem] p-2  rounded-lg text-center shadow-xl focus:outline-none text-white bg-white/20 focus:bg-white/40 duration-300`}
                            name='word'
                            type='text'
                            value={Word.word}
                            placeholder='Enter word'
                        />
                        <div className='flex gap-4 justify-center'>
                            {partOfSpeechOptions.map((part) => (
                                <button
                                    key={part}
                                    type='button'
                                    onClick={() => handlePartOfSpeechChange(part)}
                                    className={`w-full sm:w-[14rem] h-[6rem] flex items-center justify-center rounded-lg text-white  ${Word.part_of_speech === part ? 'bg-gradient-to-r from-purple-500 to-violet-500 shadow-lg' : 'bg-white/20 hover:bg-white/40'} transition-all`}
                                >
                                    {part.charAt(0).toUpperCase() + part.slice(1)}
                                </button>
                            ))}
                        </div>

                        <button
                            type='submit'
                            disabled={!isFormValid}
                            className={`w-full sm:w-[30rem] h-[6rem] mt-4 py-2 text-white rounded-lg shadow-lg transition-all ${isError ? 'bg-red-500 hover:bg-red-600' : isComplete ? 'bg-green-500 hover:bg-green-600' : isFormValid ? 'bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600' : 'bg-white/5 hover:bg-white/40 cursor-not-allowed'}`}
                        >
                            <p>{isError ? 'Fail to submit' : isComplete ? 'Success' : 'Submit'}</p>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddWord;
