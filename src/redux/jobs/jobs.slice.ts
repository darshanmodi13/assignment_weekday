import { TJobDetails } from '@/types/jobs.type';
import { createSlice } from '@reduxjs/toolkit/react';
import { fetchJobs } from './jobs.thunk';

type TFilter = {
	locations: string[];
	roles: string[];
};

type TInitialState = {
	data: TJobDetails[];
	loading: boolean;
	hasMore: boolean;
	error: string | null | undefined;
	isError: boolean;
	filters: TFilter;
};

const initialState: TInitialState = {
	data: [],
	error: null,
	hasMore: true,
	isError: false,
	loading: false,
	filters: {
		locations: [],
		roles: [],
	},
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
				const locations = action.payload.jdList.reduce((accum: string[], cur: TJobDetails) => {
					if (cur?.location?.toLowerCase() !== 'remote') {
						accum.push(cur.location);
					}
					return accum;
				}, []);
				const roles = action.payload.jdList.map((job: TJobDetails) => job.jobRole);
				state.filters.locations = [...new Set(state.filters.locations.concat(locations))];
				state.filters.roles = [...new Set(state.filters.roles.concat(roles))];
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
