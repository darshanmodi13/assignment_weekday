// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// constants
import { BASE_URI } from '../utils/constant';

// types
import { TPagination } from '../types/common';
import { TJobDetails } from '../types/jobs.type';

// Define a service using a base URL and expected endpoints
export const jobsApi = createApi({
	reducerPath: 'jobsApi',
	baseQuery: fetchBaseQuery({ baseUrl: BASE_URI }),
	endpoints: (builder) => ({
		getJobs: builder.mutation<TJobDetails[], TPagination>({
			query({ page = 1, limit = 10 }) {
				const myHeaders = new Headers();
				myHeaders.append('Content-Type', 'application/json');
				return {
					url: '/adhoc/getSampleJdJSON',
					method: 'POST',
					headers: myHeaders,
					body: JSON.stringify({
						limit,
						offset: page,
					}),
				};
			},
		}),
	}),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetJobsMutation } = jobsApi;
