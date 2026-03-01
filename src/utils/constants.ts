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

export const categories = [{ name: "Software Developer", slug: 'softwaredeveloper' },
{ name: "UI/UX", slug: 'uiux' },
{ name: "Data Science", slug: 'datascience' },
{ name: "Mobile Dev", slug: 'mobiledev' },
{ name: "AI/ML", slug: 'aiml' },
{ name: "Internships", slug: 'internships' },
{ name: "Remote Jobs", slug: 'remotejobs' }]