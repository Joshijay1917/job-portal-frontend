import { useNavigate } from "react-router-dom";
import { useAsync } from "./useAsync";
import type { PostJobType } from "../types/dashboard/recruiter";
import { PostJob } from "../services/jobService";
import type { ApplicationType, Status, useRecruiterType } from "../types/hooks/useRecruiter";
import { useState } from "react";
import type { JobListCardType } from "../types/context/Job.context";
import { changeUserPassword, getAllApplicants, getAllPosts, updateAppStatus } from "../services/userService";
import { ROUTES } from "../Routes";
import toast from "react-hot-toast";

export const useRecruiter = (): useRecruiterType => {
    const navigate = useNavigate();
    const { run, loading, error } = useAsync();

    const [jobs, setJobs] = useState<JobListCardType[]>([])
    const [applications, setApplications] = useState<ApplicationType[]>([])

    const postJob = async (data: PostJobType) => {
        const res = await run(PostJob(data));
        if (!res) return;

        navigate(ROUTES.JOBS);
    };

    const getPostedJobs = async () => {
        const res = await run(getAllPosts())

        if (!res) return;

        const payload = res.data
        setJobs(payload.data)
    }

    const getAllCandidates = async () => {
        const res = await run(getAllApplicants())

        if (!res) return;

        setApplications(res.data.data)
    }

    const updateStatus = async (appId: string, status: Status) => {
        const res = await run(updateAppStatus(appId, status))

        if (!res) return false

        return true
    }

    const changePassword = async (currentPass: string, newPass: string) => {
        const res = await run(changeUserPassword(currentPass, newPass))

        if (!res) return false

        toast.success("Password changed successfully")

        return true
    }

    return { jobs, applications, postJob, getPostedJobs, getAllCandidates, updateStatus, changePassword, loading, error }
};
