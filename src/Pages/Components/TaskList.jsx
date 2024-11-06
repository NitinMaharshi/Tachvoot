import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, handleUpdateTask, handleDeleteTask, handleOpenEditModal, handleDragStart, handleDragOver, handleDrop }) => {
    return (
        <div>
            {tasks.length > 0 ? tasks.map((task, index) => (
                <TaskItem
                    key={`${index}${task.id}`}
                    task={task}
                    index={index}
                    handleUpdateTask={handleUpdateTask}
                    handleDeleteTask={handleDeleteTask}
                    handleOpenEditModal={handleOpenEditModal}
                    handleDragStart={handleDragStart}
                    handleDragOver={handleDragOver}
                    handleDrop={handleDrop}
                />
            )) : <div className='h-full w-full flex justify-center items-center font-bold'>No Data Found</div>}
        </div>
    );
};

export default TaskList;
