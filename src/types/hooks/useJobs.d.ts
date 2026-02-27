export type usePublicJobsType = {
    jobs: JobListCardType[]
    totalPages: number
    page: number
    loading: boolean
    error: string | null
    getAllJobs: (p: number, limit?: number) => Promise<void>
    getJobDetails: (id: string) => Promise<JobDetails | null>
    onSearch: (search: string) => void
    filterJobPosts: (filters: FilterJobType, pageNo: number) => Promise<void>
    onJobClick: (id: string) => void
    goTo: (p: number) => void
}

export type FilterJobType = {
  search?: string | null;
  jobtype?: jobTypes;
  experience_year?: string;
  category?: Category;
};

export type JobDetails = {
    _id: string
    recruiterId: { cname: string }
    logo_url: string | null;
    title: string;
    description: string;
    responsibilities: string[];
    skills: string[];
    experience_required?: { min: number, max: number };
    salary: { min: number, max: number };
    category: Category;
    type: JobType;
    location?: string;
    createdAt: Date;
    updatedAt: Date;
}