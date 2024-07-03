import React from 'react';
import { Link } from 'react-router-dom';
import { FiX } from 'react-icons/fi';

interface SideBarProps {
    isOpen: boolean;
    toggleSidebar: () => void;
}

const SideBar: React.FC<SideBarProps> = ({ isOpen, toggleSidebar }) => {
    return (
        <div className={`fixed top-0 left-0 h-full bg-white shadow-lg z-50 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'} w-[20rem]`}>
            <div className='flex justify-between items-center p-4 border-b border-gray-200'>
                <h1 className='text-xl font-bold'>Menu</h1>
                <button onClick={toggleSidebar} className='text-2xl'>
                    <FiX />
                </button>
            </div>
            <div className='mt-6 mx-4 space-y-4'>
                <Link to="/" className='block text-lg font-medium text-gray-700 hover:text-violet-500 transition-colors' onClick={toggleSidebar}>Home</Link>
                <Link to="/words" className='block text-lg font-medium text-gray-700 hover:text-violet-500 transition-colors' onClick={toggleSidebar}>Word List</Link>
                <Link to="/quiz" className='block text-lg font-medium text-gray-700 hover:text-violet-500 transition-colors' onClick={toggleSidebar}>Word Quiz</Link>
            </div>
        </div>
    );
};

export default SideBar;
