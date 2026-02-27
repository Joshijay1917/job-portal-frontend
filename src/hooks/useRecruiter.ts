import { useNavigate } from "react-router-dom";
import { useAsync } from "./useAsync";
import type { PostJobType } from "../types/dashboard/recruiter";
import { PostJob } from "../services/jobService";
import type { useRecruiterType } from "../types/hooks/useRecruiter";

export const useRecruiter = (): useRecruiterType => {
    const navigate = useNavigate();
    const { run, loading, error } = useAsync();

    const postJob = async (data: PostJobType) => {
        const res = await run(PostJob(data));
        if (!res) return;

        navigate("/jobs");
    };

    return { postJob, loading, error }
};
