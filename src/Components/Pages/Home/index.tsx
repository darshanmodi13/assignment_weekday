import { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react';

// Apis
import { fetchJobs } from '@/redux/jobs/jobs.thunk';

// Hooks
import { useAppSelector } from '@/hooks/useAppSelector';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useDebounce } from '@/hooks/useDebounce';

// MUI
import { Box, SelectChangeEvent } from '@mui/material';

// Components
import Jobs from './Jobs';
import FilterJobs from './FilterJobs';

// Types
import { TJobFilter } from '@/types/jobs.type';

import { LIMIT } from '@/utils/constant';

const HomePage = () => {
	// states
	const [page, setPage] = useState(1);
	const fetchedPages = useMemo(() => new Set<number>(), []);
	const [filters, setFilters] = useState<TJobFilter>({
		companyName: '',
		remote: [],
		minimumPay: '',
		experience: '',
		locations: [],
		roles: [],
	});

	// redux
	const { data: jobs, hasMore, loading, filters: reduxFilters } = useAppSelector((state) => state.jobs);
	const dispatch = useAppDispatch();

	// ref
	const jobsRef = useRef<HTMLDivElement | null>(null);

	// Handlers
	const handleScroll = () => {
		if (filteredJobs.length < LIMIT || (jobsRef.current && !loading && hasMore && window.innerHeight + window.scrollY + 500 >= jobsRef.current.scrollHeight)) {
			setPage((page) => page + 1);
		}
	};

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setFilters((prev) => {
			return {
				...prev,
				[e.target.name]: e.target.value,
			};
		});
	};

	const handleSelectChange = (e: SelectChangeEvent<string>) => {
		setFilters((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const handleMultipleSelectChange = (e: SelectChangeEvent<string[]>) => {
		setFilters((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const debouncedHandleScroll = useDebounce(handleScroll, 500);

	const filteredJobs = jobs.filter((job) => {
		if (filters.companyName) {
			const companyName = job.companyName.toLowerCase();
			const filteredCompanyName = filters.companyName.toLowerCase();
			if (!companyName.includes(filteredCompanyName)) return false;
		}

		if (filters.minimumPay) {
			const minimumPay = Number(filters.minimumPay);
			if (job.minJdSalary < minimumPay) return false;
		}

		if (filters.experience) {
			const experience = Number(filters.experience);
			const minExp = job.minExp || 0;
			if (minExp > experience) return false;
		}

		if (filters.remote && filters.remote.includes('remote') && filters.remote.length == 1) {
			if (!filters.remote.includes(job.location)) return false;
		}

		if (filters.locations.length) {
			if (!filters.locations.includes(job.location)) return false;
		}

		if (filters.roles.length) {
			if (!filters.roles.includes(job.jobRole)) return false;
		}
		return true;
	});

	// Effects
	useEffect(() => {
		if (!fetchedPages.has(page)) {
			dispatch(fetchJobs({ page, limit: LIMIT }));
			fetchedPages.add(page);
		}
	}, [dispatch, fetchedPages, page]);

	useEffect(() => {
		if (window) window.addEventListener('scroll', debouncedHandleScroll);
		return () => {
			if (window) window.removeEventListener('scroll', debouncedHandleScroll);
		};
	}, [debouncedHandleScroll]);

	useEffect(() => {
		if (filteredJobs.length < LIMIT) {
			debouncedHandleScroll();
		}
	}, [filteredJobs]);
	return (
		<>
			<Box component="section" className="container" color="primary.main" display={'flex'} flexDirection={'column'} gap={'20px'} marginTop={'20px'}>
				<FilterJobs
					filters={filters}
					locations={reduxFilters.locations}
					roles={reduxFilters.roles}
					handleInputChange={handleInputChange}
					handleSelectChange={handleSelectChange}
					handleMultipleSelectChange={handleMultipleSelectChange}
				/>
				<Jobs jobs={filteredJobs} ref={jobsRef} />
			</Box>
		</>
	);
};

export default HomePage;
