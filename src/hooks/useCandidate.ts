import toast from "react-hot-toast";
import { useAuth } from "../context/auth.context";
import { ApplyJobPost } from "../services/jobService";
import type { useCandidateType } from "../types/hooks/useCandidate";
import { useAsync } from "./useAsync";

export const useCandidate = (): useCandidateType => {
    const { run, loading, error } = useAsync()
    const { user } = useAuth()

    const applyJobPost = async (jobPostId: string) => {
        if (!user?.id) {
            toast.error("Please login to apply for the job!");
            return false;
        }
        const res = await run(ApplyJobPost(user.id, jobPostId))

        if (!res) return false;

        toast.success("Applied to job successfully!")
        return true;
    }

    return { applyJobPost, loading, error }
}