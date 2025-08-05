import { motion } from 'framer-motion';

function Home() {
    const QuizHeadText = ["Q", "U", "I", "Z", "•", "W", "O", "R", "D"];

    return (
        <div className='relative flex flex-col justify-center items-center border border-white bg-white/5 backdrop-blur-md w-[48%] max-w-[80rem] max-h-[55rem] h-[55rem] bg-white rounded-2xl shadow-inner py-8 sm:py-12 md:py-16 lg:py-[12rem]'>
            <h1 className='text-[4rem] text-white font-bold'>Welcome to</h1>
            <div className='text-[2rem] sm:text-[4rem] lg:text-[5rem] text-white tracking-widest font-semibold flex'>
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
                <a href='/Login' className='flex justify-center items-center px-[6rem] py-[2rem] max-w-[2rem] border-white rounded-md border hover:bg-white/20 duration-300'>
                    Login
                </a>
                <a href='/Register' className='flex justify-center items-center px-[6rem] py-[2rem] max-w-[2rem] border-white rounded-md border hover:bg-white/20 duration-300'>
                    Register
                </a>
            </div>
        </div>
    );
}

export default Home;
