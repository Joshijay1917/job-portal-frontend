export type useCandidateType = {
    loading: boolean
    error: string | null
    applyJobPost: (jobPostId: string) => Promise<boolean>
}