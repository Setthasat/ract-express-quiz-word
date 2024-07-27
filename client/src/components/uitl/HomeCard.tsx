import React from 'react';

interface HomrCardInterface {
    children: React.ReactNode,
    onClick?: any,
    href?: any,
}

function HomeCard({ children, ...props }: HomrCardInterface) {

    return (
        <div className='flex flex-col justify-center items-end w-[26rem] h-[26rem] border-4 border-[#2e1065] rounded-xl shadow-[1px_2px_2rem_rgba(95,0,156,0.4)]'>
            <div className='flex items-center justify-center h-[14rem] w-full bg-white rounded-t-xl'>
                hi i'm img
                {/* img */}
            </div>
            <a {...props} className="flex w-full h-[12rem] text-2xl  justify-center items-center  shadow-[1px_2px_2rem_rgba(95,0,156,0.4)] border-t-[2px] border-[#2e1065]  cursor-pointer">
                {children}
            </a>
        </div>
    );
}

export default HomeCard;