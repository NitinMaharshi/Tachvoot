import { createSlice } from '@reduxjs/toolkit';

const todoSlice = createSlice({
    name: 'todo',
    initialState: {
        tasks: [],
    },
    reducers: {
        addTask: (state, action) => {
            state.tasks.push(action.payload);
        },
        deleteTask: (state, action) => {
            state.tasks = state.tasks.filter((task) => task.id !== action.payload);
        },
        updateTask: (state, action) => {
            state.tasks = state.tasks.map((task) => {
                if (task.id === action.payload.id) {
                    return { ...task, ...action.payload.updates };
                }
                return task;
            });
        },
        clearCompletedTasks: (state) => {
            state.tasks = state.tasks.filter((task) => task.status !== 'complete');
        },
        reorderTasks: (state, action) => {
            const { sourceIndex, destinationIndex } = action.payload;

            if (sourceIndex === destinationIndex || sourceIndex < 0 || destinationIndex < 0) return;

            const reorderedTasks = JSON.parse(JSON.stringify(state.tasks)); // Create a deep copy without Proxy
            const [removed] = reorderedTasks.splice(sourceIndex, 1);
            reorderedTasks.splice(destinationIndex, 0, removed);

            state.tasks = reorderedTasks;
        },
        setTasks: (state, action) => {
            state.tasks = action.payload;
        },
    },
});

export const {
    addTask,
    deleteTask,
    updateTask,
    clearCompletedTasks,
    reorderTasks,
    setTasks
} = todoSlice.actions;

export default todoSlice.reducer;