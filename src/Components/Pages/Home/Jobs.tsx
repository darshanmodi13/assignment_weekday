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
		<section className="wrapper">
			<Grid container gap={5} ref={ref}>
				{jobs.map((job, idx) => {
					return (
						<Grid
							item
							key={`${job.jdUid}_${idx}`}
							lg={3.7}
							md={3.5}
							sm={5.5}
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
		</section>
	);
});

export default Jobs;
