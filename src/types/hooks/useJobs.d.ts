import type { JobListCardType } from "../context/Job.context";

export type usePublicJobsType = {
  jobs: JobListCardType[];
  totalPages: number;
  page: number;
  loading: boolean;
  getAllJobs: (p: number) => Promise<void>;
  getJobDetails: (id: string) => Promise<JobDetails | null>;
  filterJobPosts: (filters: FilterJobType, pageNo: number) => Promise<void>;
  goTo: (p: number) => void;
  applyJobPost: (jobPostId: string) => Promise<boolean>
};

export type FilterJobType = {
  search?: string | null;
  jobtype?: jobTypes;
  experience_year?: string;
  category?: Category;
};

export type JobDetails = {
  jobPost: {
    _id: string;
    recruiterId: { cname: string };
    logo_url: string | null;
    title: string;
    description: string;
    responsibilities: string[];
    skills: string[];
    experience_required?: { min: number; max: number };
    salary: { min: number; max: number };
    category: Category;
    type: JobType;
    location?: string;
    createdAt: string;
    updatedAt: string;
  },
  hasApplied: boolean
};
