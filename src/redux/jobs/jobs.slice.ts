import { TJobDetails } from '@/types/jobs.type';
import { createSlice } from '@reduxjs/toolkit/react';
import { fetchJobs } from './jobs.thunk';

type TInitialState = {
	data: TJobDetails[];
	loading: boolean;
	hasMore: boolean;
	error: string | null | undefined;
	isError: boolean;
};

const initialState: TInitialState = {
	data: [],
	error: null,
	hasMore: true,
	isError: false,
	loading: false,
};
const jobsSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchJobs.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchJobs.fulfilled, (state, action) => {
				state.loading = false;
				state.data = state.data.concat(action.payload.jdList);
				state.hasMore = state.data.length < action.payload.totalCount;
			})
			.addCase(fetchJobs.rejected, (state, action) => {
				state.loading = false;
				state.isError = true;
				state.error = action.error.message;
			});
	},
});

export default jobsSlice.reducer;
