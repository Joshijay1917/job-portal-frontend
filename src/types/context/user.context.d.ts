import type { Candidate } from "../dashboard/candidate"
import type { Recruiter } from "../dashboard/recruiter"

export type userContextType = {
    user?: Recruiter | Candidate
    getUser: () => Promise<void>
    updateUser: (user: RecruiterForm | CandidateForm) => Promise<boolean>
    loading: boolean
    error: string | null
}

export type RecruiterForm = {
    email: string;
    cname: string;
    owner: string;
    category?: Category | null;
    employee_size?: { min: number, max: number };
    company_website?: string;
}

export type CandidateForm = {
    fname: string;
    email: string;
    description?: string;
    experience_years?: number;
    resume?: string;
    expected_salary?: { min: number, max: number };
    category?: Category | null;
    email_verified: boolean;
}