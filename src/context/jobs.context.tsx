import { createContext, useContext, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useAsync } from "../hooks/useAsync";
import { FilterJobs, getAllJobPosts, getJobData } from "../services/jobService";
import type { JobListCardType } from "../types/context/Job.context";
import type { FilterJobType, usePublicJobsType } from "../types/hooks/useJobs";
import { ROUTES } from "../Routes";
import { scrollToTop } from "../utils/scrollToTop";

const JobsContext = createContext<usePublicJobsType | null>(null)

export const useJobs = () => {
    const context = useContext(JobsContext)

    if (!context) {
        throw new Error('useJobs must be used within a JobsProvider');
    }

    return context;
}

export const JobsProvider = ({ children }: { children: ReactNode }) => {
    const navigate = useNavigate();
    const { run, loading, error } = useAsync();

    const [jobs, setJobs] = useState<JobListCardType[]>([])
    const [totalPages, setTotalPages] = useState<number>(0);
    const [page, setPage] = useState<number>(1);

    const getAllJobs = async (p: number) => {
        setJobs([])
        scrollToTop()
        const res = await run(getAllJobPosts(p));
        if (!res) return;

        setTotalPages(res.data.data.totalPages);
        setJobs(res.data.data.posts);
    };

    const getJobDetails = async (id: string) => {
        const res = await run(getJobData(id))

        if (!res) return;

        const payload = res.data.data
        return payload
    }

    const onSearch = (search: string) => {
        navigate(ROUTES.JOB_SEARCH(search));
        filterJobPosts({ search }, 1);
    };

    const filterJobPosts = async (filters: FilterJobType, pageNo: number) => {
        setJobs([])
        scrollToTop()
        const res = await run(FilterJobs(filters, pageNo));
        if (!res) {
            setJobs([]);
            return;
        }

        setPage(pageNo);
        setTotalPages(res.data.data.totalPages);
        setJobs(res.data.data.posts);
    };

    const onJobClick = (id: string) => {
        navigate(ROUTES.JOB_DETAIL(id));
    };

    const goTo = (p: number) => {
        if (p < 1 || p > totalPages) return;
        setPage(p);
    };

    const values = {
        jobs, totalPages, page, loading, error,
        getAllJobs, getJobDetails, onSearch, filterJobPosts, onJobClick, goTo
    }

    return (
        <JobsContext.Provider value={values}>
            {children}
        </JobsContext.Provider>
    )
}
