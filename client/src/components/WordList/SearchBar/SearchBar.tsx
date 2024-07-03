import React, { useState } from 'react';

interface SearchBarProps {
    onSearch: (word: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleSearch = () => {
        onSearch(searchTerm);
    };

    return (
        <div className='flex justify-center items-center my-[2rem]'>
            <input
                className='w-[30rem] h-[3rem] rounded-full px-[2rem] focus:outline-none'
                value={searchTerm}
                onChange={handleInputChange}
                placeholder='Search for a word...'
            />
            <button
                onClick={handleSearch}
                className='ml-4 bg-blue-500 text-white rounded-full px-4 py-2 hover:bg-blue-700 transition'
            >
                Search
            </button>
        </div>
    );
}

export default SearchBar;
