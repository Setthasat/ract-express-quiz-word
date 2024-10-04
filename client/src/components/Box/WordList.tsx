import { useState, useEffect } from 'react';
import axios from 'axios';

function WordList() {
  const [data, setData] = useState<Array<any>>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const itemsPerPage = 3;

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8888/api/get/words");
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
    <div className='grid justify-center items-start h-full px-4 sm:px-8 lg:px-16'>
      <div className='border-b-2 w-full max-w-4xl flex items-center justify-center pb-[2rem] text-center'>
        <p className='flex justify-center items-center font-bold text-3xl md:text-4xl lg:text-5xl text-white'>
          WORD LISTS
        </p>
      </div>

      <div className='w-ful max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
        {currentItems.length > 0 ? (
          currentItems.map((wordItem) => (
            <div
              key={wordItem.id}
              className='text-white p-4 w-full h-[24rem] bg-white/20 border border-white rounded-lg shadow-lg mb-4 transition-transform transform hover:scale-105'
            >
              <div className='text-center'>
                <p className='font-bold text-xl border-b-2 pb-2 mb-2'>
                  {wordItem.word} <span className='font-medium text-gray-300'>({wordItem.part_of_speech})</span>
                </p>
                <p className='overflow-y-auto h-[20rem] text-center text-lg text-gray-200'>
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
  );
}

export default WordList;