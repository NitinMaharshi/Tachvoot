import React from 'react';

const TaskFilter = ({ filter, setFilter, sortBy, setSortBy, clearCompleted, hasCompletedTasks }) => {
    return (
        <div className="flex items-center justify-between mb-4">
            <div>
                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="p-2 border mr-2 border-gray-300 rounded bg-white text-sm"
                >
                    <option value="all">All</option>
                    <option value="new">New</option>
                    <option value="in-progress">In Progress</option>
                    <option value="in-review">In Review</option>
                    <option value="complete">Complete</option>
                </select>

                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="p-2 border border-gray-300 rounded text-sm bg-white"
                >
                    <option value="">Sort</option>
                    <option value="createdAt">Sort by Date</option>
                    <option value="text">Sort by Name</option>
                </select>
            </div>

            <button
                onClick={clearCompleted}
                disabled={!hasCompletedTasks}
                className="p-2 text-sm bg-red-500 text-white rounded enabled:hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
                Clear Completed
            </button>
        </div>
    );
};

export default TaskFilter;
