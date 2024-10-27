import React from 'react';
import ToDoList from './ToDoLists';

const HomePage = () => {
    return (
        <div className='min-h-[calc(100vh-288px)] max-w-screen-2xl mx-auto dark:text-white flex items-center justify-center'>
            <ToDoList/>
        </div>
    );
};

export default HomePage;