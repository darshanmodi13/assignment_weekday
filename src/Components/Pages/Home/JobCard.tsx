import { TJobDetails } from '@/types/jobs.type';

// MUI
import { Box, Button, Card, Typography } from '@mui/material';

// Icons
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';

// Utils
import { CurrencyCodes } from '@/utils/currency';

type TJobCard = {
	job: TJobDetails;
};

const JobCard = ({ job }: TJobCard) => {
	console.log('🚀 ~ JobCard ~ job:', job);
	const salary: number[] = [];
	if (job.minJdSalary) salary.push(job.minJdSalary);
	if (job.maxJdSalary) salary.push(job.maxJdSalary);
	return (
		<>
			<Card sx={{ padding: '20px' }}>
				<Box display={'flex'} columnGap={'10px'}>
					<Box width={'25px'}>
						<img src={job.logoUrl} alt="logo" loading="lazy" className="logo" />
					</Box>
					<Box display={'flex'} flexDirection={'column'}>
						<Typography color={'primary.light'} fontWeight={600} className="font-12" textTransform={'capitalize'}>
							{job.companyName}
						</Typography>
						<Typography color={'primary'} fontWeight={600} className="font-14" textTransform={'capitalize'}>
							{job.jobRole}
						</Typography>
					</Box>
				</Box>
				<Box marginLeft={'35px'}>
					<Typography color={'primary.light'} fontWeight={600} className="font-12" textTransform={'capitalize'}>
						{job.location} {job.minExp && job.maxExp ? ` | Exp: ${job.minExp} - ${job.maxExp} years` : ''}
					</Typography>
				</Box>

				<Box display={'flex'} alignItems={'center'} columnGap={'10px'}>
					<Typography color={'primary.light'} fontWeight={500} className="font-12" textTransform={'capitalize'}>
						{salary.length && `Estimated Salary: ${CurrencyCodes[job.salaryCurrencyCode.toUpperCase()]}${salary.join(' - ')} LPA`}
					</Typography>
					<Box color={'green'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
						<CheckBoxIcon />
					</Box>
				</Box>

				<Box sx={{ height: '170px', overflow: 'hidden', position: 'relative' }}>
					<Typography fontWeight={500} color={'primary.main'} textTransform={'capitalize'} className="font-14" marginTop={'10px'}>
						About Company
					</Typography>
					<Typography fontWeight={600} color={'primary.main'} textTransform={'capitalize'} className="font-12">
						About Us
					</Typography>
					<Typography color={'primary.main'} textTransform={'capitalize'} className="font-12">
						{job.jobDetailsFromCompany}
					</Typography>
					<Box sx={{ position: 'absolute', bottom: '5px', textAlign: 'center', width: '100%', background: '#fff', boxShadow: '0px 0px 18px 20px #fff' }}>
						<a href={job.jdLink} target="__black" className="font-13">
							View Job
						</a>
					</Box>
				</Box>

				<Box>
					<Typography fontWeight={400} color={'primary.main'} textTransform={'capitalize'} className="font-12" marginTop={'10px'}>
						Minimum Experience
					</Typography>
					<Typography fontWeight={600} color={'primary.main'} textTransform={'capitalize'} className="font-12">
						{job.minExp || 0} years
					</Typography>
				</Box>

				<Box marginTop={'15px'}>
					<Button variant="contained" color="secondary" fullWidth className="font-13" sx={{ paddingTop: '10px', paddingBottom: '10px' }} disableElevation={true}>
						<Box color={'yellow'} marginRight={'10px'}>
							<ElectricBoltIcon sx={{ scale: '1.3', filter: 'drop-shadow(0 0.2rem 0.25rem rgba(0, 0, 0));' }} />
						</Box>{' '}
						Easy Apply
					</Button>
				</Box>
			</Card>
		</>
	);
};

export default JobCard;
