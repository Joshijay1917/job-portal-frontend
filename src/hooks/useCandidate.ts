import toast from "react-hot-toast";
import { useAuth } from "../context/auth.context";
import { ApplyJobPost } from "../services/jobService";
import type { CandidateApplicationType, useCandidateType } from "../types/hooks/useCandidate";
import { useAsync } from "./useAsync";
import { useState } from "react";
import { changeUserPassword, getAppliedJobs as getAppliedJobsService } from "../services/userService";

export const useCandidate = (): useCandidateType => {
    const { run, loading, error } = useAsync()
    const { user } = useAuth()

    const [applications, setApplications] = useState<CandidateApplicationType[]>([])

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

    const getAppliedJobs = async () => {
        const res = await run(getAppliedJobsService())

        if (!res) return;

        setApplications(res.data.data)
    }

    const changePassword = async (currentPass: string, newPass: string) => {
        const res = await run(changeUserPassword(currentPass, newPass))

        if (!res) return false

        toast.success("Password changed successfully")
        return true
    }

    return { applications, applyJobPost, getAppliedJobs, changePassword, loading, error }
}