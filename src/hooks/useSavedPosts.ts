import toast from "react-hot-toast";
import { deleteSavedPost, getAllSavedPosts, saveJobPost } from "../services/savedJobsService";
import type { SavedJobType, useSavedPostsType } from "../types/hooks/useSavedPosts";
import { useAsync } from "./useAsync";
import { useState } from "react";

export const useSavedPosts = (): useSavedPostsType => {
    const { loading, error, run } = useAsync()
    const [savedJobs, setSavedJobs] = useState<SavedJobType[]>([])

    const getAllPosts = async () => {
        const res = await run(getAllSavedPosts())

        if (!res) return

        setSavedJobs(res.data.data)
    }

    const savePost = async (jobPostId: string) => {
        const res = await run(saveJobPost(jobPostId))

        if (!res) return false
        toast.success('Job post saved successfully!')

        await getAllPosts()
        return true
    }

    const deletePost = async (jobPostId: string) => {
        const res = await run(deleteSavedPost(jobPostId))

        if (!res) return false
        toast.success('Job post removed from saved posts!')

        setSavedJobs(prev => prev.filter(job => job.jobPostId._id !== jobPostId))
        return true
    }

    return {
        savedJobs,
        loading,
        error,
        getAllPosts,
        savePost,
        deletePost
    }
}