import type { JobListCardType } from "../context/Job.context"

export type SavedJobType = {
    _id: string
    candidateId: string
    jobPostId: JobListCardType
    createdAt: string
}

export type useSavedPostsType = {
    loading: boolean
    error: string | null
    savedJobs: SavedJobType[]
    getAllPosts: () => Promise<void>
    savePost: (jobPostId: string) => Promise<void>
    deletePost: (jobPostId: string) => Promise<void>
}