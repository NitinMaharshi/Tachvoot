import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import todoReducer from './taskSlice';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['tasks'],
};

const persistedReducer = persistReducer(persistConfig, todoReducer);

export const store = configureStore({
    reducer: {
        todo: persistedReducer,
    },
});

export const persistor = persistStore(store);