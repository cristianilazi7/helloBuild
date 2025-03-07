'use client';

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import reposReducer from './slices/reposSlice';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from './createNoopStorage';


const authPersistConfig = {
  key: 'auth',
  storage,
  timeout: 1000,
};

const reposPersistConfig = {
  key: 'repos',
  storage,
  timeout: 1000,
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedReposReducer = persistReducer(reposPersistConfig, reposReducer);

const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    repos: persistedReposReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
