import { useEffect } from 'react';

// MUI
import { Box } from '@mui/material';

// Redux toolkit query
import { useGetJobsMutation } from './services/jobs.service';

function App() {
	const [getJobs, { data }] = useGetJobsMutation();
	console.log('🚀 ~ App ~ data:', data);

	useEffect(() => {
		getJobs({ limit: 10, page: 1 });
	}, []);
	return (
		<>
			<Box component="section" className="container" color="primary.main">
				This Box renders as an HTML section element.
			</Box>
		</>
	);
}

export default App;
