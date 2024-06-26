import { configureStore } from '@reduxjs/toolkit';

// reducers
import jobsSlice from '@/redux/jobs/jobs.slice';

export const store = configureStore({
	reducer: {
		jobs: jobsSlice,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
