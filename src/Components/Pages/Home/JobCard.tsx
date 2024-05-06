import { TJobDetails } from '@/types/jobs.type';

type TJobCard = {
	job: TJobDetails;
};

const JobCard = ({ job }: TJobCard) => {
	return (
		<>
			<p>{job.jobDetailsFromCompany}</p>
		</>
	);
};

export default JobCard;
