import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { themeReducer } from './theme/slice';
import { authReducer } from './auth/slice';
import { allBoardsReducer } from './allBoards/slice';

const themePersistConfig = {
  key: 'theme',
  storage,
};

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token', 'user', 'theme'],
};

const allBoardsPersistConfig = {
  key: 'boards',
  storage,
};

export const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authReducer),
    theme: persistReducer(themePersistConfig, themeReducer),
    boards: persistReducer(allBoardsPersistConfig, allBoardsReducer)
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),

  devTools: process.env.NODE_ENV === 'development',
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);
