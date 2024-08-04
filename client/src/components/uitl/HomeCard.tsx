import React from 'react';

interface HomeCardInterface {
    children: React.ReactNode;
    onClick?: () => void;
    href?: string;
    imgSrc?: string; // Add this line to accept image source
}

function HomeCard({ children, imgSrc, ...props }: HomeCardInterface) {
    return (
        <a {...props} className='flex flex-col bg-white justify-center items-end w-[26rem] h-[26rem] border-4 border-[#2e1065] rounded-xl shadow-[1px_2px_2rem_rgba(95,0,156,0.4)] '>
            <div className='flex items-center justify-center h-[14rem] w-full bg-white rounded-t-xl'>
                {imgSrc ? <img src={imgSrc} alt="Card" className="object-cover w-full h-full" /> : 'hi i\'m img'}
            </div>
            <a className="flex w-full h-[12rem] text-2xl text-[#7E30E1] justify-center items-center shadow-[1px_2px_2rem_rgba(95,0,156,0.4)] border-t-[2px] border-[#2e1065] cursor-pointer">
                {children}
            </a>
        </a>
    );
}

export default HomeCard;
