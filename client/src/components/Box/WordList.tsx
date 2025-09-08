import { useState, useEffect } from 'react';

interface Word {
  id: string;
  user_id: string;
  word: string;
  part_of_speech: string;
  definition: string;
  isOptimistic?: boolean;
}

interface WordListProps {
  words: Word[];
  isLoading: boolean;
}

function WordList({ words, isLoading }: WordListProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  
  const getItemsPerPage = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 640) return 1;
      return 2;
    }
    return 2;
  };

  const [itemsPerPage, setItemsPerPage] = useState(getItemsPerPage());

  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(getItemsPerPage());
      setCurrentIndex(0);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalPages = Math.ceil(words.length / itemsPerPage);

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

  const currentItems = words.slice(currentIndex * itemsPerPage, (currentIndex + 1) * itemsPerPage);

  useEffect(() => {
    if (words.length > 0) {
      const newTotalPages = Math.ceil(words.length / itemsPerPage);
      if (currentIndex >= newTotalPages - 1) {
        setCurrentIndex(Math.max(0, newTotalPages - 1));
      }
    }
  }, [words.length, currentIndex, itemsPerPage]);

  if (isLoading) {
    return (
      <div className="p-3 sm:p-6 w-full flex flex-col justify-center items-center">
        <div className="w-full bg-slate-900 rounded-3xl shadow-xl shadow-black/40 p-4 sm:p-6 flex flex-col h-[20rem] sm:h-[32rem]">
          <div className="text-center mb-4 sm:mb-6">
            <h1 className="text-white text-2xl sm:text-4xl font-extrabold tracking-wide text-purple-300">
              WORD LIST
            </h1>
          </div>
          <div className="flex justify-center items-center flex-grow">
            <div className="w-8 h-8 sm:w-12 sm:h-12 border-4 border-t-transparent border-purple-400 rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-3 sm:p-6 w-full flex flex-col justify-center items-center">
      <div className="w-full bg-slate-900 rounded-3xl shadow-xl shadow-black/40 p-4 sm:p-6 flex flex-col min-h-[20rem] sm:min-h-[32rem]">
        <div className="text-center mb-4 sm:mb-6">
          <h1 className="text-white text-2xl sm:text-4xl font-extrabold tracking-wide text-purple-300">
            WORD LIST
          </h1>
        </div>

        <div className="flex-grow">
          {currentItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6 h-full">
              {currentItems.map((wordItem) => (
                <div
                  key={wordItem.id}
                  className={`bg-white/5 rounded-xl shadow-inner p-4 sm:p-6 flex flex-col h-[16rem] sm:h-[20rem] transition-all duration-300 hover:bg-white/10 hover:shadow-lg border border-white/10 ${
                    wordItem.isOptimistic ? 'opacity-75 animate-pulse' : ''
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 sm:mb-4 pb-3 border-b border-white/20">
                    <h3 className="text-white font-bold text-lg sm:text-xl truncate flex-grow mb-2 sm:mb-0">
                      {wordItem.word}
                      {wordItem.isOptimistic && (
                        <span className="ml-2 text-xs text-yellow-400">Adding...</span>
                      )}
                    </h3>
                    <span className="inline-block bg-purple-600/20 text-purple-300 text-xs font-semibold px-2 sm:px-3 py-1 rounded-full sm:ml-3 whitespace-nowrap w-fit">
                      {wordItem.part_of_speech}
                    </span>
                  </div>
                  
                  <div className="flex-grow overflow-y-auto">
                    <p className="text-gray-200 text-sm sm:text-base leading-relaxed whitespace-pre-wrap break-words">
                      {wordItem.definition}
                    </p>
                  </div>
                </div>
              ))}
              
              {/* Fill empty slots on desktop/tablet */}
              {Array.from({ length: Math.max(0, itemsPerPage - currentItems.length) }).map((_, index) => (
                <div key={`empty-${index}`} className="hidden sm:block invisible"></div>
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center h-full">
              <div className="text-center text-white/50">
                <p className="text-lg sm:text-2xl mb-2">No words found</p>
                <p className="text-xs sm:text-sm">Start by adding some words to your collection</p>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-white/10">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`px-3 sm:px-6 py-2 rounded-lg text-white font-medium transition-all shadow-lg text-sm sm:text-base ${
              currentIndex === 0
                ? "bg-white/5 cursor-not-allowed opacity-50"
                : "bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600 hover:shadow-xl"
            }`}
          >
            Prev
          </button>
          
          <div className="text-white font-medium bg-white/10 px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base">
            {currentItems.length > 0 ? (
              <>{currentIndex + 1} / {totalPages}</>
            ) : (
              <>- / -</>
            )}
          </div>
          
          <button
            onClick={handleNext}
            disabled={currentIndex === totalPages - 1 || currentItems.length === 0}
            className={`px-3 sm:px-6 py-2 rounded-lg text-white font-medium transition-all shadow-lg text-sm sm:text-base ${
              currentIndex === totalPages - 1 || currentItems.length === 0
                ? "bg-white/5 cursor-not-allowed opacity-50"
                : "bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600 hover:shadow-xl"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default WordList;