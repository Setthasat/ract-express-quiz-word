import { motion } from 'framer-motion';
import { useState } from 'react';

function Hamburger() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const links = ["/", "/AddWord", "/WordList", "/QuizWord"];
    const names = ["Home", "Add Word", "Word List", "Quiz Word"];

    return (
        <div className="relative flex items-center">
            {/* Hamburger Icon */}
            <div onClick={toggleMenu} className="cursor-pointer z-50 -top-4">
                <div className={`w-8 h-0.5 bg-white transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-1' : 'mb-1'}`} />
                <div className={`w-8 h-0.5 bg-white transition-all duration-300 ${isOpen ? 'opacity-0' : 'mb-1'}`} />
                <div className={`w-8 h-0.5 bg-white transition-all duration-300 ${isOpen ? '-rotate-45' : ''}`} />
            </div>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute -top-6 left-10 w-[28rem] flex justify-center py-2">
                    {names.map((item, index) => (
                        <motion.a 
                            key={index}
                            href={links[index]}
                            className="px-4 py-2 text-white hover:underline hover:underline-offset-8  rounded transition-colors duration-500"
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.3, delay: 0.1 * index }}
                        >
                            {item}
                        </motion.a>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Hamburger;
