import type { Dispatch, SetStateAction } from "react";

export type JobListCardType = {
    _id: string;
    recruiterId: { cname: string };
    logo_url: string | null;
    title: string;
    category: Category;
    type: JobType;
    createdAt: Date;
    updatedAt: Date;
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

export enum JobType {
    Ftype = 'Full time',
    Ptype = 'Part time'
}