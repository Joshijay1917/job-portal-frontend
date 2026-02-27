// import { Category, type JobListCardType } from "../types/context/Job.context";

export const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000/api'

export const Categories = {
    Sde: 'Software Developer',
    Uiux: 'UI/UX',
    Datascience: 'Data Science',
    Mobiledev: 'Mobile Dev',
    Aiml: 'AI/ML',
    Internship: 'Internship',
    Remote: 'Remote Job'
}

export const JobType = {
    fulltime: 'Full Time',
    parttime: 'Part Time'
}

// export const mockJobs: JobListCardType[] = [
//     {
//         _id: '1',
//         recruiterId: { cname: 'Google' },
//         logo_url: 'google.com',
//         title: 'Mern Developer',
//         category: Category.Sde,
//         type: "Full Time",
//         createdAt: new Date("2026-02-15"),
//         updatedAt: new Date("2026-02-19")
//     },
//     {
//         _id: '2',
//         recruiterId: { cname: 'Amazon' },
//         logo_url: 'amazon.in',
//         title: 'Java Developer',
//         category: Category.Sde,
//         type: 'Part Time',
//         createdAt: new Date("2026-02-18"),
//         updatedAt: new Date("2026-02-18")
//     }
// ]
