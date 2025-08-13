import { useState, useEffect } from 'react';
import { useStore } from '../../store/store';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import Hamburger from '../Hamburger';

function WordList() {

  const [data, setData] = useState<Array<any>>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const itemsPerPage = 3;

  const getUserId = useStore((state) => state.getUserId);
  const navigate = useNavigate();
  const userID = getUserId();

  useEffect(() => {
    if (!getUserId()) {
      navigate("/login");
    }
  }, [getUserId, navigate]);

  const fetchData = async () => {

    const userData = {
      user_id: userID
    };

    try {
      const response = await axios.post("http://localhost:8888/api/get/words", userData);
      const fetchedData = response.data.data;
      if (Array.isArray(fetchedData)) {
        setData(fetchedData);
      } else {
        console.error("Fetched data is not an array");
      }
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handleNext = () => {
    if (currentIndex < totalPages - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const currentItems = data.slice(currentIndex * itemsPerPage, (currentIndex + 1) * itemsPerPage);

  return (
    <div className='flex flex-col justify-center items-center border border-white bg-white/5 backdrop-blur-md w-full sm:w-3/4 md:w-2/3 lg:w-1/2 max-h-[55rem] h-[55rem] bg-white rounded-2xl shadow-inner py-8 sm:py-12 md:py-16 lg:py-[12rem]'>
      <div className='absolute top-12 left-12'>
        <Hamburger />
      </div>
      <div className='grid justify-center items-start h-full px-4 sm:px-6 md:px-8 lg:px-16'>
        <div className='border-b-2 w-full max-w-4xl flex items-center justify-center pb-4 md:pb-6 lg:pb-8 text-center'>
          <p className='text-white font-bold -mt-[2rem] text-2xl sm:text-3xl md:text-4xl lg:text-5xl'>
            WORD LIST
          </p>
        </div>

        <div className='w-full max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {currentItems.length > 0 ? (
            currentItems.map((wordItem) => (
              <div
                key={wordItem.id}
                className='group relative text-white p-6 min-w-[16rem] w-full h-[20rem] mt-8 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md shadow-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl'
              >
                <div className='relative z-10 flex flex-col  h-full'>
                  <p className='font-bold text-xl justify-between flex border-b border-white/20 pb-2 mb-3 truncate'>
                    {wordItem.word}{' '}
                    <span className='font-medium text-gray-300'>
                      ({wordItem.part_of_speech})
                    </span>
                  </p>
                  <p className='flex-1 text-lg text-gray-200 leading-relaxed overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-purple-400/50 scrollbar-track-transparent pr-1'>
                    {wordItem.definition}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className='flex justify-center items-center col-span-full h-[16rem]'>
              <p className='text-white text-center text-3xl'>No words found</p>
            </div>
          )}
        </div>

        <div className='flex items-center justify-between mt-4'>
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className='bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600 w-[6rem] text-white px-4 py-2 rounded disabled:opacity-50'
          >
            Previous
          </button>
          <div className='text-center  text-white'>

            {currentItems.length > 0 ? (
              <>{currentIndex + 1} / {totalPages}</>
            ) : (
              <>- / -</>
            )}
          </div>
          <button
            onClick={handleNext}
            disabled={currentIndex === totalPages - 1 || currentItems.length == 0}
            className='bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600 w-[6rem] text-white px-4 py-2 rounded disabled:opacity-50'
          >
            Next
          </button>
        </div>
      </div>
    </div>

  );
}

export default WordList;
