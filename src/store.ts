import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { jobsApi } from './services/jobs.service';

export const store = configureStore({
	reducer: {
		// Add the generated reducer as a specific top-level slice
		[jobsApi.reducerPath]: jobsApi.reducer,
	},
	// Adding the api middleware enables caching, invalidation, polling,
	// and other useful features of `rtk-query`.
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(jobsApi.middleware),
});

setupListeners(store.dispatch);
