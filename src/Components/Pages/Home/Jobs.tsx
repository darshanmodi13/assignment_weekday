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
		<Grid container className="wrapper" gap={5} ref={ref}>
			{jobs.map((job, idx) => {
				return (
					<Grid
						item
						key={`${job.jdUid}_${idx}`}
						xs={3.7}
						sx={{
							transition: 'transform 0.3s',
							'&:hover': {
								transform: 'scale(1.02)',
							},
						}}>
						<JobCard job={job} />
					</Grid>
				);
			})}
		</Grid>
	);
});

export default Jobs;
