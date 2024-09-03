import React from 'react';
import AddWord from '../components/Box/AddWord';
import WordList from '../components/Box/WordList';
import QuizWord from '../components/Box/QuizWord';

function Box({ changeBox }: any) {
    return (
        <div className='flex justify-center items-center border w-1/2 max-h-screen h-[74rem]  rounded-2xl  bg-gray-500 py-[10rem]'>
            {changeBox.AddWord ? (
                <AddWord />
            ) : changeBox.WordList ? (
                <WordList />
            ) : changeBox.QuizWord ? (
                <QuizWord />
            ) : (
                <p>hi</p>
            )}

        </div>
    );
}

export default Box;