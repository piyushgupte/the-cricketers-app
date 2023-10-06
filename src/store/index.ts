import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage  from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { cricketerSlice } from './cricketer-slice';

const persistConfig = {
  key: 'root',
  storage,
}

const reducer = combineReducers({
  cricketers: cricketerSlice.reducer 
})

const persistedReducer  = persistReducer(persistConfig,reducer)

export const store = configureStore({
  reducer: persistedReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;