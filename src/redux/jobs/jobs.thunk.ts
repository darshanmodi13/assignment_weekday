import { createAsyncThunk } from '@reduxjs/toolkit/react';

// Pagination
import { TPagination } from '../../types/common';

// Constants
import { BASE_URI } from '../../utils/constant';

export const fetchJobs = createAsyncThunk('jobs/get', async ({ limit = 10, page = 1 }: TPagination) => {
	const response = await fetch(`${BASE_URI}/adhoc/getSampleJdJSON`, {
		method: 'POST',
		body: JSON.stringify({
			limit,
			offset: page,
		}),
	});
	return response.json();
});
