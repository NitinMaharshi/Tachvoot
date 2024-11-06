import React from 'react';

const TaskInput = ({ newTask, setNewTask, handleAddTask }) => {
    return (
        <div className="flex items-center mb-4">
            <input
                type="text"
                placeholder="Add a new task"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                className="flex-1 px-4 py-2 mr-2 border border-gray-300 rounded"
            />
            <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={handleAddTask}
            >
                Add Task
            </button>
        </div>
    );
};

export default TaskInput;
