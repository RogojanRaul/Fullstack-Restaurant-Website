import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userSlice from './user/slice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducers = combineReducers({
  userSlice,
});

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootStateType = ReturnType<typeof rootReducers>;
export type DispatchType = ReturnType<typeof store.dispatch>;
