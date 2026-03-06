export enum Role {
    Recruiter = 'recruiter',
    Candidate = 'candidate'
}

type RegisterFormValues = {
    fname?: string;
    owner?: string;
    email: string;
    password: string;
    role: Role;
    cname?: string
}

type LoginFormValues = {
    email: string
    password: string
}

type User = {
    id: string;
    email: string;
    role: Role;
    email_verified: boolean;
}