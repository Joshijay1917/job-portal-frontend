import type { JobListCardType } from "../context/Job.context"

export type SavedJobType = {
    _id: string
    candidateId: string
    jobPostId: JobListCardType
    createdAt: string
}

export type useSavedPostsType = {
    loading: boolean
    savedJobs: SavedJobType[]
    getAllPosts: () => Promise<void>
    savePost: (jobPostId: string) => Promise<boolean>
    deletePost: (jobPostId: string) => Promise<boolean>
}