import type { Category, JobType } from "../context/Job.context";

export type Recruiter = {
    email: string;
    password: string;
    cname: string;
    owner: string;
    category?: Category | null;
    employee_size?: { min: number, max: number };
    company_website?: string;
    email_verified: boolean;
    profile_completed: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export type PostJobType = {
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
}