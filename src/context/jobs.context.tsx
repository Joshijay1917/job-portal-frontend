import { createContext, useCallback, useState, type ReactNode } from "react";
import { ApplyJobPost, FilterJobs, getAllJobPosts, getJobData } from "../lib/Apis/jobApis";
import type { JobListCardType } from "../types/context/Job.context";
import type { FilterJobType, usePublicJobsType } from "../types/hooks/useJobs";
import { scrollToTop } from "../utils/scrollToTop";
import { asyncRunner } from "../utils/asyncRunner";
import toast from "react-hot-toast";
import { useAuth } from "../hooks/useAuth";

export const JobsContext = createContext<usePublicJobsType | null>(null)

export const JobsProvider = ({ children }: { children: ReactNode }) => {
    const { user } = useAuth()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [jobs, setJobs] = useState<JobListCardType[]>([])
    const [totalPages, setTotalPages] = useState<number>(0);
    const [page, setPage] = useState<number>(1);

    const getAllJobs = useCallback(async (p: number) => {
        setJobs([])
        setLoading(true)
        scrollToTop()
        const res = await asyncRunner(getAllJobPosts(p));
        if (!res || !res.data) {
            setError(res.error)
            setLoading(false)
            return;
        }

        setTotalPages(res.data.data.totalPages);
        setJobs(res.data.data.posts);
        setLoading(false)
    }, [])

    const getJobDetails = async (id: string) => {
        setLoading(true)
        const res = await asyncRunner(getJobData(id))

        if (!res || !res.data) {
            setError(res.error)
            setLoading(false)
            return null;
        }

        const payload = res.data.data
        setLoading(false)
        return payload
    }

    const filterJobPosts = useCallback(async (filters: FilterJobType, pageNo: number) => {
        setJobs([])
        setLoading(true)
        scrollToTop()
        const res = await asyncRunner(FilterJobs(filters, pageNo));
        if (!res || !res.data) {
            setError(res.error)
            setLoading(false)
            return;
        }

        setPage(pageNo);
        setTotalPages(res.data.data.totalPages);
        setJobs(res.data.data.posts);
        setLoading(false)
    }, []);

    const goTo = (p: number) => {
        if (p < 1 || p > totalPages) return;
        setPage(p);
    };

    const applyJobPost = async (jobPostId: string) => {
        if (!jobPostId || !user?.id) {
            toast.error('User not resgistered!')
            return false;
        }

        setLoading(true)
        const res = await asyncRunner(ApplyJobPost(user.id, jobPostId))

        if (!res || !res.data) {
            setError("Failed to apply to job post!")
            setLoading(false)
            return false;
        }

        setLoading(false)
        return true;
    }

    const values = {
        jobs, totalPages, page, loading, error,
        getAllJobs, getJobDetails, filterJobPosts, goTo, applyJobPost
    }

    return (
        <JobsContext.Provider value={values}>
            {children}
        </JobsContext.Provider>
    )
}
