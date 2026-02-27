export type Candidate = {
    fname: string;
    email: string;
    description?: string;
    experience_years?: number;
    resume?: string;
    expected_salary?: { min: number, max: number };
    category?: Category | null;
    email_verified: boolean;
    profile_completed?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}