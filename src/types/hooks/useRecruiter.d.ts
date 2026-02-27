import type { PostJobType } from "../dashboard/recruiter"

export type useRecruiterType = {
    loading: boolean
    error: string | null
    postJob: (data: PostJobType) => Promise<void>
}