import React from 'react';
import SingleCard from './SingleCard';

interface CardContainerProps {
    data: Array<any>;
}

const CardContainer: React.FC<CardContainerProps> = ({ data }) => {
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto p-6 max-w-screen-xl overflow-y-auto h-full'>
            {data.map((item, index) => (
                <div key={index} className='flex justify-center'>
                    <SingleCard item={item} />
                </div>
            ))}
        </div>
    );
};

export default CardContainer;
