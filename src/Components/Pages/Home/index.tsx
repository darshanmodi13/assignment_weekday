import { useEffect, useMemo, useRef, useState } from 'react';

// Apis
import { fetchJobs } from '@/redux/jobs/jobs.thunk';

// Hooks
import { useAppSelector } from '@/hooks/useAppSelector';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useDebounce } from '@/hooks/useDebounce';

// MUI
import { Box } from '@mui/material';
import Jobs from './Jobs';

const HomePage = () => {
	// states
	const [page, setPage] = useState(1);
	const fetchedPages = useMemo(() => new Set<number>(), []);

	// redux
	const { data: jobs, hasMore, loading } = useAppSelector((state) => state.jobs);
	const dispatch = useAppDispatch();

	// ref
	const jobsRef = useRef<HTMLDivElement | null>(null);

	// Handlers
	const handleScroll = () => {
		if (jobsRef.current && !loading && hasMore && window.innerHeight + window.scrollY + 500 >= jobsRef.current.scrollHeight) {
			setPage((page) => page + 1);
		}
	};

	const debouncedHandleScroll = useDebounce(handleScroll, 500);

	// Effects
	useEffect(() => {
		if (!fetchedPages.has(page)) {
			dispatch(fetchJobs({ page, limit: 30 }));
			fetchedPages.add(page);
		}
	}, [dispatch, fetchedPages, page]);

	useEffect(() => {
		if (window) window.addEventListener('scroll', debouncedHandleScroll);
		return () => {
			if (window) window.removeEventListener('scroll', debouncedHandleScroll);
		};
	}, [debouncedHandleScroll]);
	return (
		<>
			<Box component="section" className="container" color="primary.main">
				<Jobs jobs={jobs} ref={jobsRef} />
			</Box>
		</>
	);
};

export default HomePage;
