import React from 'react';

const SideBar: React.FC = () => {
  return (
    <div className="bg-primary-purple text-white flex flex-col w-64 h-full">
      <div className="p-4 font-bold text-2xl">QUiz WORD</div>
      <div className="flex-grow">
        <button className="w-full p-4 bg-secondary-pink hover:bg-primary-purple text-white">Add word</button>
        <button className="w-full p-4 bg-black hover:bg-secondary-pink text-white">Word list</button>
        <button className="w-full p-4 bg-secondary-pink hover:bg-primary-purple text-white">QUiz</button>
      </div>
    </div>
  );
};

export default SideBar;
