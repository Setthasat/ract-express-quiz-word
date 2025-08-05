import { motion } from 'framer-motion';
import { useStore } from "../store/store";
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';

function Box() {

    const getUserId = useStore((state) => state.getUserId);
    const navigate = useNavigate();

    const QuizHeadText = ["Q", "U", "I", "Z", "•", "W", "O", "R", "D"];

    useEffect(() => {
        if (!getUserId()) {
            navigate("/login");
        }
    }, [getUserId, navigate]);

    return (
        <div className='relative flex flex-col justify-center items-center border border-white bg-white/5 backdrop-blur-md w-[70%] max-w-[80rem] max-h-[55rem] h-[55rem] bg-white rounded-2xl shadow-inner py-8 sm:py-12 md:py-16 lg:py-[12rem]'>
            <div className='text-[2rem] sm:text-[4rem] lg:text-[5rem] text-white tracking-widest font-bold flex'>
                {QuizHeadText.map((letter, index) => (
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.2, delay: 0.05 * index }}
                        key={index}>
                        {letter}
                    </motion.p>
                ))}
            </div>
            <div className='flex justify-center items-center text-white mt-[4rem] gap-5'>
                <a href='/AddWord' className='flex justify-center items-center px-[6rem] py-[2rem] hover:px-[7rem] hover:py-[3rem] border-white rounded-md border hover:bg-white/20 duration-300'>
                    Add
                </a>
                <a href="/WordList" className='flex justify-center items-center px-[6rem] py-[2rem] hover:px-[7rem] hover:py-[3rem] border-white rounded-md border hover:bg-white/20 duration-300'>
                    List
                </a>
                <a href='/QuizWord' className='flex justify-center items-center px-[6rem] py-[2rem] hover:px-[7rem] hover:py-[3rem] border-white rounded-md border hover:bg-white/20 duration-300'>
                    Quiz
                </a>
            </div>
        </div>
    );
}

export default Box;
