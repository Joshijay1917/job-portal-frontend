import { useNavigate } from "react-router-dom";
import type { FilterJobType, usePublicJobsType } from "../types/hooks/useJobs";
import { useAsync } from "./useAsync";
import { useState } from "react";
import { useJobs } from "../context/jobs.context";
import { FilterJobs, getAllJobPosts, getJobData } from "../services/jobService";

export const usePublicJobs = (): usePublicJobsType => {
    const navigate = useNavigate();
    const { run, loading, error } = useAsync();
    const { jobs, setJobs } = useJobs()

    const [totalPages, setTotalPages] = useState<number>(0);
    const [page, setPage] = useState<number>(1);

    const getAllJobs = async (p: number, limit?: number) => {
        console.log("GET ALL", limit);
        const res = await run(getAllJobPosts(p));
        if (!res) return;

        setTotalPages(res.data.data.totalPages);
        setJobs(res.data.data.posts);
        console.log("Jobs:", res);
    };

    const getJobDetails = async (id: string) => {
        const res = await getJobData(id)

        if(!res) return;

        const payload = res.data.data
        return payload
    }

    const onSearch = (search: string) => {
        navigate(`/jobs?search=${search}`);
        filterJobPosts({ search }, 1);
    };

    const filterJobPosts = async (filters: FilterJobType, pageNo: number) => {
        const res = await run(FilterJobs(filters, pageNo));
        console.log("Res:", res);
        if (!res) {
            setJobs([]);
            return;
        }

        setPage(pageNo);
        setTotalPages(res.data.data.totalPages);
        setJobs(res.data.data.posts);
    };

    const onJobClick = (id: string) => {
        navigate(`/job/${id}`);
    };

    const goTo = (p: number) => {
        if (p < 1 || p > totalPages) return;
        setPage(p);
    };

    return { jobs, totalPages, page, loading, error, getAllJobs, getJobDetails, onSearch, filterJobPosts, onJobClick, goTo }
};
