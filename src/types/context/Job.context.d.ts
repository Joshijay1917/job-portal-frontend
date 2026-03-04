import type { Dispatch, SetStateAction } from "react";
import { Category, JobType } from '../../utils/constants'

export type JobListCardType = {
    _id: string;
    recruiterId: { cname: string };
    logo_url: string | null;
    title: string;
    category: Category;
    type: JobType;
    isSaved: boolean | null
    salary: { min: number, max: number }
    createdAt: string;
    updatedAt: string;
}

export type JobContext = {
    jobs: JobListCardType[]
    setJobs: Dispatch<SetStateAction<JobListCardType[]>>
}

export enum Category {
    Sde = 'Software Developer',
    Uiux = 'UI/UX',
    Datascience = 'Data Science',
    Mobiledev = 'Mobile Dev',
    Aiml = 'AI/ML',
    Internship = 'Internship',
    Remote = 'Remote Job'
}