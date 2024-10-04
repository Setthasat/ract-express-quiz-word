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
    <div className="flex justify-center items-start py-[7rem] px-[8rem] w-1/2 h-screen">
      <div className="h-full">
        <p className="text-[6rem] text-white tracking-widest font-bold flex">
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
        <div className=' flex flex-col mt-[10rem] h-[30rem] text-white bg-white/10 backdrop-blur-md border-white border justify-center items-center rounded-xl text-2xl'>
          <div onClick={setAddChange} className='w-full text-center al flex justify-center border-b-2 items-center h-[10rem]'>
            <p>Add</p>
          </div>
          <div onClick={setListChange} className='w-full text-center al flex justify-center border-b-2 items-center h-[10rem]'>
            <p>List</p>
          </div>
          <div onClick={setQuizChange} className='w-full text-center al flex justify-center items-center h-[10rem]'>
            <p>Quiz</p>
          </div>
        </div>
        {/* <div className='flex justify-between text-center   items-center mt-[10rem] h-[10rem] bg-slate-500 rounded-xl'>
          <div className='w-full h-full flex justify-center items-center border-r-2 rotate'>
            YES
          </div>
          <div className='w-full h-full justify-center items-center flex'>
            NO
          </div>
        </div> */}
      </div>
      <div>
        
      </div>
    </div>
  );
};

export default Home;
