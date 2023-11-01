import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './root-reducer';
import storage from 'redux-persist/lib/storage';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer } from 'redux-persist';

export type RootState = {
	rootReducer: ReturnType<typeof rootReducer>;
};

const persistConfig = {
	key: 'root',
	storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default configureStore({
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
	reducer: {
		rootReducer: persistedReducer,
	},
});
