export type TJobDetails = {
	companyName: string;
	jdLink: string;
	jdUid: string;
	jobDetailsFromCompany: string;
	jobRole: string;
	location: string;
	logoUrl: string;
	maxExp: number;
	maxJdSalary: number;
	minExp: number;
	minJdSalary: number;
	salaryCurrencyCode: string;
};

export type TJobFilter = {
	companyName: string;
	remote: string[];
	minimumPay: string;
	experience: string;
	locations: string[];
	roles: string[];
};
