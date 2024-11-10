import { motion } from 'framer-motion';
import { useEffect } from 'react';

function Home({ setChageBox, changeBox }: any) {
  const QuizHeadText = ["Q", "U", "I", "Z", "•", "W", "O", "R", "D"];

  const setAddChange = (event: any) => {
    event.preventDefault();
    setChageBox({ ...changeBox, WordList: false, QuizWord: false, AddWord: true });
  };

  const setListChange = (event: any) => {
    event.preventDefault();
    setChageBox({ ...changeBox, WordList: true, QuizWord: false, AddWord: false });
  };

  const setQuizChange = (event: any) => {
    event.preventDefault();
    setChageBox({ ...changeBox, WordList: false, QuizWord: true, AddWord: false });
  };

  useEffect(() => {
    console.log(changeBox);
  }, [changeBox]);

  return (
    <div className="flex justify-center items-start py-[4rem] sm:py-[6rem] lg:py-[7rem] px-[2rem] sm:px-[4rem] lg:px-[8rem] w-full sm:w-3/4 lg:w-1/2 h-screen">
      <div className="h-full">
        <p className="text-[3rem] sm:text-[5rem] lg:text-[6rem] text-white tracking-widest font-bold flex">
          {QuizHeadText.map((letter, index) => (
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.2, delay: 0.05 * index }}
              key={index}>
              {letter}
            </motion.p>
          ))}
        </p>
        <div className='flex flex-col mt-[2rem] sm:mt-[4rem] lg:mt-[6rem] h-[20rem] sm:h-[25rem] lg:h-[30rem] text-white bg-white/10 backdrop-blur-md border-white border justify-center items-center rounded-xl text-lg sm:text-xl lg:text-2xl'>
          <div onClick={setAddChange} className='w-full text-center flex justify-center border-b-2 items-center h-[6rem] sm:h-[8rem] lg:h-[10rem] cursor-pointer hover:bg-white/20'>
            <p>Add</p>
          </div>
          <div onClick={setListChange} className='w-full text-center flex justify-center border-b-2 items-center h-[6rem] sm:h-[8rem] lg:h-[10rem] cursor-pointer hover:bg-white/20'>
            <p>List</p>
          </div>
          <div onClick={setQuizChange} className='w-full text-center flex justify-center items-center h-[6rem] sm:h-[8rem] lg:h-[10rem] cursor-pointer hover:bg-white/20'>
            <p>Quiz</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
