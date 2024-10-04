import React from 'react';
import AddWord from '../components/Box/AddWord';
import WordList from '../components/Box/WordList';
import QuizWord from '../components/Box/QuizWord';

function Box({ changeBox }: any) {
    return (
        <div className='flex justify-center items-center border border-white bg-white/10 backdrop-blur-md w-1/2 max-h-screen h-[70rem] bg-white rounded-2xl shadow-inner py-[12rem]'>
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