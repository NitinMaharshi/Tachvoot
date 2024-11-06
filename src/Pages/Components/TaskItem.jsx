import React from 'react';

const TaskItem = ({ task, index, handleUpdateTask, handleDeleteTask, handleOpenEditModal, handleDragStart, handleDragOver, handleDrop }) => {
    return (
        <div
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(index)}
            className={`flex items-center mb-2 p-4 rounded border ${task.status === 'complete' ? 'bg-gray-200 line-through text-gray-500' : task.status === 'in-progress' ? 'bg-yellow-200' : task.status === 'in-review' ? 'bg-blue-200' : 'bg-green-200'}`}
        >
            <input
                type="checkbox"
                className="mr-2"
                checked={task.status === 'complete'}
                onChange={() => handleUpdateTask(task.id, { status: task.status === 'complete' ? 'new' : 'complete' })}
            />
            <div className='flex-1 mr-2 items-center capitalize'>
                <p>{task.text}</p>
            </div>
            <select
                value={task.status}
                onChange={(e) => handleUpdateTask(task.id, { status: e.target.value })}
                className="mr-2 p-2 text-sm bg-white border rounded-md"
                disabled={task.status === 'complete'}
            >
                <option value="new">New</option>
                <option value="in-progress">In Progress</option>
                <option value="in-review">In Review</option>
                <option value="complete">Complete</option>
            </select>
            <div>
                <button
                    className="px-2 py-1 bg-green-500 text-white rounded enabled:hover:bg-red-600 text-sm"
                    disabled={task.status === 'complete'}
                    onClick={() => handleOpenEditModal(task)}
                >
                    Edit
                </button>
                <button
                    className="px-2 py-1 bg-red-500 ms-2 text-white rounded enabled:hover:bg-red-600 text-sm"
                    onClick={() => handleDeleteTask(task.id)}
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default TaskItem;
