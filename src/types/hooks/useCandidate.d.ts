import type { Status } from "./useRecruiter"

export type CandidateApplicationType = {
    _id: string
    candidateId: string
    jobPostId: string
    logo_url: string | null
    title: string
    description: string
    category: string
    type: string
    location?: string
    status: Status
    createdAt: string
    updatedAt: string
    Job: {
        _id: string
        recruiterId: string
        logo_url: string | null
        title: string
        description: string
        category: string
        type: string
        location?: string
        createdAt: string
        updatedAt: string
    }
    totalApplied: number
}

export type useCandidateType = {
    loading: boolean
    error: string | null
    applications: CandidateApplicationType[]
    applyJobPost: (jobPostId: string) => Promise<boolean>
    getAppliedJobs: () => Promise<void>
    changePassword: (currentPass: string, newPass: string) => Promise<boolean>
}