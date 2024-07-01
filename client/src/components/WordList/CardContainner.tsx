import React from 'react';
import SingleCard from './SingleCard';

interface CardContainerProps {
    data: Array<any>;
}

const CardContainer: React.FC<CardContainerProps> = ({ data }) => {
    return (
        <div className='grid grid-cols-3 gap-2 justify-center items-center'>
            {data.map((item, index) => (
                <div key={index}>
                    <SingleCard item={item} />
                </div>
            ))}
        </div>
    );
};

export default CardContainer;
