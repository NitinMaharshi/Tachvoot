import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    addTask,
    deleteTask,
    updateTask,
    clearCompletedTasks,
    reorderTasks,
    setTasks
} from '../Redux/taskSlice';
import { nanoid } from '@reduxjs/toolkit';
import TaskInput from './Components/TaskInput';
import TaskFilter from './Components/TaskFilter';
import TaskList from './Components/TaskList';
import Pagination from './Components/Pagination';
import EditTaskModal from './Components/EditTaskModal';
import ConfirmationModal from './Components/ConfirmationModal';


const TodoList = () => {
    const [newTask, setNewTask] = useState('');
    const [filter, setFilter] = useState('all');
    const [sortBy, setSortBy] = useState('');
    const [showClearConfirm, setShowClearConfirm] = useState(false);
    const [editingTask, setEditingTask] = useState(false);
    const [editedTaskText, setEditedTaskText] = useState('');
    const [draggedTask, setDraggedTask] = useState(null);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [tasksPerPage] = useState(10);

    const dispatch = useDispatch();
    const tasks = useSelector((state) => state.todo.tasks);

    useEffect(() => {
        // Load tasks from localStorage on component mount
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
            dispatch(setTasks(JSON.parse(storedTasks)));
        }
    }, [dispatch]);

    useEffect(() => {
        // Save tasks to localStorage whenever they change
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const handleAddTask = () => {
        if (newTask.trim() !== '') {
            dispatch(
                addTask({
                    id: nanoid(),
                    text: newTask,
                    status: 'new',
                    createdAt: new Date().toISOString(),
                })
            );
            setNewTask('');
        }
    };

    const handleDeleteTask = (id) => {
        dispatch(deleteTask(id));
    };

    const handleUpdateTask = (id, updates) => {
        dispatch(updateTask({ id, updates }));
    };

    const handleOpenEditModal = (task) => {
        setEditingTask(task);
        setEditedTaskText(task.text);
    };

    const handleCloseEditModal = () => {
        setEditingTask(null);
        setEditedTaskText('');
    };

    const handleSaveEditedTask = () => {
        if (editedTaskText.trim() !== '') {
            handleUpdateTask(editingTask.id, { text: editedTaskText });
            handleCloseEditModal();
        }
    };
    const handleClearCompleted = () => {
        setShowClearConfirm(true);
    };

    const confirmClearCompleted = () => {
        dispatch(clearCompletedTasks());
        setShowClearConfirm(false);
    };

    const cancelClearCompleted = () => {
        setShowClearConfirm(false);
    };


    // Filter logic
    const filteredTasks = useMemo(() => {
        return tasks.filter((task) => {
            if (filter === 'all') return true;
            return task.status === filter;
        });
    }, [tasks, filter]);

    const sortedTasks = useMemo(() => {
        return [...filteredTasks].sort((a, b) => {
            if (a[sortBy] < b[sortBy]) return -1;
            if (a[sortBy] > b[sortBy]) return 1;
            return 0;
        });
    }, [filteredTasks, sortBy]);


    // Drag and Drop logic
    const handleDragStart = (index) => {
        setDraggedTask(index);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (targetIndex) => {
        if (draggedTask === null) return;
        dispatch(reorderTasks({ sourceIndex: draggedTask, destinationIndex: targetIndex }));
        setDraggedTask(null);
    };


    // Pagination logic
    const indexOfLastTask = currentPage * tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;
    const currentTasks = sortedTasks.slice(indexOfFirstTask, indexOfLastTask);

    const totalPages = Math.ceil(sortedTasks.length / tasksPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="max-w-2xl mx-auto p-4">
            <div className="max-w-2xl mx-auto p-4">
                <h1 className="text-3xl font-bold mb-4">Todo List</h1>

                <TaskInput newTask={newTask} setNewTask={setNewTask} handleAddTask={handleAddTask} />

                <TaskFilter
                    filter={filter}
                    setFilter={setFilter}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                    clearCompleted={() => setShowClearConfirm(true)}
                    hasCompletedTasks={tasks.some(task => task.status === 'complete')}
                />
                <TaskList
                    tasks={currentTasks}
                    handleUpdateTask={handleUpdateTask}
                    handleDeleteTask={handleDeleteTask}
                    handleOpenEditModal={handleOpenEditModal}
                    handleDragStart={handleDragStart}
                    handleDragOver={handleDragOver}
                    handleDrop={handleDrop}
                />


                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    handlePageChange={handlePageChange}
                />
            </div>

            <EditTaskModal
                editingTask={editingTask}
                editedTaskText={editedTaskText}
                setEditedTaskText={setEditedTaskText}
                handleSaveEditedTask={handleSaveEditedTask}
                handleCloseEditModal={handleCloseEditModal}
            />

            <ConfirmationModal
                show={showClearConfirm}
                onClose={() => setShowClearConfirm(false)}
                onConfirm={confirmClearCompleted}
            />
        </div>
    );
};

export default TodoList;