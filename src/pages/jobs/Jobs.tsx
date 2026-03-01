import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import type { JobListCardType } from "../../types/context/Job.context"
import { Loader } from "../../components/Loader"
import { useAuth } from "../../context/auth.context"
import { JobFilter } from "./JobFilter"
import { JobCard } from "../../components/JobCard"
import { ROUTES } from "../../Routes"
import { SidebarFilters } from "../../components/SidebarFilters"
import { useJobs } from "../../context/jobs.context"
import { Search } from "lucide-react"

export function Jobs() {
    const [search] = useSearchParams()
    const navigate = useNavigate()
    const { user } = useAuth()
    const { jobs, loading, getAllJobs, totalPages, page, goTo, filterJobPosts } = useJobs()
    const [filterOpen, setFilterOpen] = useState(false)
    const [searchJob, setSearchJob] = useState<string | null>(search.get('search'))

    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }

    useEffect(() => {
        if (searchJob) {
            filterJobPosts({ search: searchJob }, page)
        }
    }, [searchJob])

    useEffect(() => {
        getAllJobs(page)
    }, [page])

    return (
        <div className="p-10 md:p-20 md:px-50 bg-gray-100">
            <div className="flex justify-between">
                <div className="text-lg md:text-5xl flex gap-2 font-bold">
                    <h1>Latest</h1>
                    <h1 className="text-blue-600">Tech Jobs</h1>
                </div>
                <div className="flex gap-2">
                    <button onClick={() => setFilterOpen(true)} className="md:hidden bg-blue-600 text-white px-2 py-1 md:px-4 md:py-2 font-bold text-xs rounded-lg hover:bg-gray-800 cursor-pointer">Filter</button>
                    {user && user.role === 'recruiter' && <button onClick={() => navigate(ROUTES.RECRUITER_POST_JOB)} className="bg-blue-600 text-white px-2 py-1 md:px-4 md:py-2 font-bold text-xs md:text-xl rounded-lg hover:bg-gray-800">Post Job</button>}
                </div>
            </div>

            <div className="flex md:hidden flex-col gap-2 pt-4">
                <div className="relative">
                    <Search className="absolute top-3 left-3 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        value={searchJob || ''}
                        onChange={(e) => setSearchJob(e.target.value)}
                        className="w-full bg-white pl-10 pr-4 rounded-xl shadow py-3 outline-none focus:ring-2 focus:ring-blue-600 text-sm"
                        placeholder="Search for jobs"
                    />
                </div>
            </div>

            {/* Mobile Filter Sidebar */}
            <SidebarFilters isOpen={filterOpen} onClose={() => setFilterOpen(false)} />

            <div className="py-10 flex gap-10 justify-around">
                {/* JobsPosts */}
                <div className="w-full flex flex-col justify-between">
                    <div className="flex flex-col gap-5">
                        {loading && <div className="mt-50"><Loader /></div>}
                        {!loading && jobs.length === 0 && <span className="text-center">No jobs found!</span>}
                        {jobs.map((job: JobListCardType) => (
                            <div key={job._id} onClick={() => navigate(ROUTES.JOB_DETAIL(job._id))}>
                                <JobCard job={job} />
                            </div>
                        ))}
                    </div>
                    {!loading && <div className="flex px-3 py-6 items-center justify-center gap-2 mt-6">
                        <button
                            onClick={() => goTo(page - 1)}
                            disabled={page === 1}
                            className="px-3 py-1 border rounded-lg disabled:opacity-50"
                        >
                            Prev
                        </button>

                        {pages.map((p) => (
                            <button
                                key={p}
                                onClick={() => goTo(p)}
                                className={`px-3 py-1 rounded-lg border ${p === page
                                    ? "bg-blue-600 text-white border-blue-600"
                                    : "bg-white"
                                    }`}
                            >
                                {p}
                            </button>
                        ))}

                        <button
                            onClick={() => goTo(page + 1)}
                            disabled={page === totalPages}
                            className="px-3 py-1 border rounded-lg disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>}
                </div>

                <div className="hidden md:block">
                    <JobFilter search={search} />
                </div>
            </div>
        </div>
    )
}