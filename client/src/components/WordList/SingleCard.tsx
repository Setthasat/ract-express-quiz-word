import React from 'react';

function SingleCard({ item }: any) {
    return (
        <div className='flex flex-col justify-between bg-white w-full sm:w-[18rem] h-[18rem] rounded-xl p-4 shadow-lg'>
            <div className='flex justify-center items-center border-b-2 border-gray-600'>
                <div className='flex justify-center items-center mb-2'>
                    <p className='text-[2rem] font-bold mx-[2rem] text-center sm:text-left'>{item.word.toUpperCase()}</p>
                    <p className='text-sm text-gray-500'>({item.part_of_speech})</p>
                </div>
            </div>
            <div className='flex-grow flex items-center justify-center overflow-y-auto'>
                <p className='text-center sm:text-start'>{item.definition}</p>
            </div>
        </div>
    );
}

export default SingleCard;
