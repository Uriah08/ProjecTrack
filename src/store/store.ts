import { configureStore } from '@reduxjs/toolkit';
import { projectsApi } from '../store/api';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { persistReducer, persistStore } from 'redux-persist';
import { combineReducers } from 'redux';
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

// Combine your reducers, including the API reducer
const rootReducer = combineReducers({
  [projectsApi.reducerPath]: projectsApi.reducer,
  // Add other reducers if you have any
});

// Persist config for redux-persist
const persistConfig = {
  key: 'root',
  storage,
  whitelist: [projectsApi.reducerPath], // Only persist the API data
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(projectsApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

