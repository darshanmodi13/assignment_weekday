import { forwardRef } from 'react';
import { TJobDetails } from '@/types/jobs.type';

// MUI
import { Grid } from '@mui/material';
import JobCard from './JobCard';

type TJobsProps = {
	jobs: TJobDetails[];
};

const Jobs = forwardRef<HTMLDivElement | null, TJobsProps>(({ jobs }, ref) => {
	return (
		<Grid container className="wrapper" gap={2} ref={ref}>
			{jobs.map((job, idx) => {
				return (
					<Grid item key={`${job.jdUid}_${idx}`} xs={3.9} sx={{ height: '300px', border: '1px dashed black' }}>
						<JobCard job={job} />
					</Grid>
				);
			})}
		</Grid>
	);
});

export default Jobs;
