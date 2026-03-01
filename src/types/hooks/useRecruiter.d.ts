import type { JobListCardType } from "../context/Job.context"
import type { PostJobType } from "../dashboard/recruiter"

export type useRecruiterType = {
    loading: boolean
    error: string | null
    jobs: JobListCardType[]
    applications: ApplicationType[]
    postJob: (data: PostJobType) => Promise<void>
    getPostedJobs: () => Promise<void>
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