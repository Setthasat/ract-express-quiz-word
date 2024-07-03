import React from 'react';

function SingleCard({ item }: any) {
    return (
        <div className='bg-white w-full sm:w-[18rem] h-[18rem] rounded-xl shadow-lg overflow-hidden transform transition-transform hover:scale-105 bg-gradient-to-r from-blue-500 to-purple-500'>
            <div className='flex flex-col h-full text-white'>
                <div className='p-4'>
                    <h2 className='text-xl font-bold'>{item.word.toUpperCase()}</h2>
                    <p className='text-sm'>{item.part_of_speech}</p>
                </div>
                <div className='flex-grow p-4 overflow-y-auto bg-white bg-opacity-70 rounded-b-xl'>
                    <p className='text-gray-700'>{item.definition}</p>
                </div>
            </div>
        </div>
    );
}

export default SingleCard;
