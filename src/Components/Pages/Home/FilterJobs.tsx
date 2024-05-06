import { TJobFilter } from '@/types/jobs.type';
import { Box, Chip, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { ChangeEvent } from 'react';

type TFilterJobProps = {
	filters: TJobFilter;
	locations: string[];
	roles: string[];
	handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
	handleSelectChange: (e: SelectChangeEvent<string>) => void;
	handleMultipleSelectChange: (e: SelectChangeEvent<string[]>) => void;
};

const FilterJobs = ({ filters, handleInputChange, handleSelectChange, handleMultipleSelectChange, locations: availableLocation, roles: availableRoles }: TFilterJobProps) => {
	const { companyName, remote, minimumPay, experience, locations, roles } = filters;
	return (
		<section className="wrapper">
			<Box display={'flex'} flexWrap={'wrap'} gap={3}>
				<Box width={200}>
					<TextField name="companyName" variant="outlined" label={'Search Company Name'} value={companyName} onChange={handleInputChange} fullWidth />
				</Box>

				<Box>
					<FormControl sx={{ minWidth: '200px' }} fullWidth>
						<InputLabel>Role</InputLabel>
						<Select
							fullWidth
							name="roles"
							multiple
							value={roles}
							onChange={handleMultipleSelectChange}
							renderValue={(selected) => (
								<Box sx={{ display: 'flex', gap: 0.5 }}>
									{selected.map((value) => (
										<Chip key={value} label={value} sx={{ textTransform: 'capitalize' }} />
									))}
								</Box>
							)}>
							{availableRoles.map((name) => (
								<MenuItem key={name} value={name} sx={{ textTransform: 'capitalize' }}>
									{name}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Box>
				<Box>
					<FormControl sx={{ minWidth: '200px' }} fullWidth>
						<InputLabel>Remote</InputLabel>
						<Select
							fullWidth
							name="remote"
							multiple
							value={remote}
							onChange={handleMultipleSelectChange}
							renderValue={(selected) => (
								<Box sx={{ display: 'flex', gap: 0.5 }}>
									{selected.map((value) => (
										<Chip key={value} label={value} sx={{ textTransform: 'capitalize' }} />
									))}
								</Box>
							)}>
							{['remote', 'hybrid', 'onsite'].map((name) => (
								<MenuItem key={name} value={name} sx={{ textTransform: 'capitalize' }}>
									{name}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Box>
				<Box width={200}>
					<FormControl fullWidth>
						<InputLabel>Minimum Base Pay</InputLabel>
						<Select name="minimumPay" value={minimumPay} label="Minimum Base Pay" onChange={handleSelectChange}>
							{[0, 10, 20, 30, 40, 50, 60, 70].map((value) => (
								<MenuItem key={value} value={value}>
									{value}L
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Box>

				<Box width={200}>
					<FormControl fullWidth>
						<InputLabel>Experience</InputLabel>
						<Select name="experience" value={experience} label="Experience" onChange={handleSelectChange}>
							{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
								<MenuItem key={value} value={value}>
									{value}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Box>

				<Box>
					<FormControl sx={{ minWidth: '200px' }} fullWidth>
						<InputLabel>Location</InputLabel>
						<Select
							fullWidth
							name="locations"
							multiple
							value={locations}
							onChange={handleMultipleSelectChange}
							renderValue={(selected) => (
								<Box sx={{ display: 'flex', gap: 0.5 }}>
									{selected.map((value) => (
										<Chip key={value} label={value} sx={{ textTransform: 'capitalize' }} />
									))}
								</Box>
							)}>
							{availableLocation.map((name) => (
								<MenuItem key={name} value={name} sx={{ textTransform: 'capitalize' }}>
									{name}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Box>
			</Box>
		</section>
	);
};

export default FilterJobs;
