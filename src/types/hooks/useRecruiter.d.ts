import type { JobListCardType } from "../context/Job.context"
import type { PostJobType } from "../dashboard/recruiter"

export type useRecruiterType = {
    loading: boolean
    applications: ApplicationType[]
    getAllCandidates: () => Promise<void>
    updateStatus: (appId: string, status: Status) => Promise<boolean>
}

export type ApplicationType = {
    _id: string
    candidateId: {
        email: string
        fname: string
        _id: string
    }
    jobPostId: {
        title: string
        _id: string
    }
    status: Status
    createdAt: string
    updatedAt: string
}

export enum Status {
    Applied = 'Applied',
    Shortlisted = 'Shortlisted',
    Rejected = 'Rejected'
}