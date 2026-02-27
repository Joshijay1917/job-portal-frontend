import { Brain, Building2, ChevronsLeftRightEllipsis, Clock, Database, Laptop, LayoutPanelLeft, MapPin, MapPinned, MoveRight, Search, TabletSmartphone, Timer, UsersRound } from "lucide-react"
import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import type { JobListCardType } from "../types/context/Job.context"
import { Categories, JobType } from "../utils/constants"
import { usePublicJobs } from "../hooks/useJobs"
import Loader from "../components/Loader"
import { useAuth } from "../context/auth.context"

type catType = {
    id: number,
    name: string,
    icon: React.ReactNode
}

const categories = [
    { id: 1, name: Categories.Sde, icon: <ChevronsLeftRightEllipsis className="text-blue-600" /> },
    { id: 2, name: Categories.Datascience, icon: <Database className="text-blue-600" /> },
    { id: 3, name: Categories.Uiux, icon: <LayoutPanelLeft className="text-blue-600" /> },
    { id: 4, name: Categories.Mobiledev, icon: <TabletSmartphone className="text-blue-600" /> },
    { id: 5, name: Categories.Aiml, icon: <Brain className="text-blue-600" /> },
    { id: 6, name: Categories.Internship, icon: <UsersRound className="text-blue-600" /> },
    { id: 7, name: Categories.Remote, icon: <Laptop className="text-blue-600" /> }
]

function Jobs() {
    const [search] = useSearchParams()
    const navigate = useNavigate()
    const { user } = useAuth()
    const { jobs, loading, getAllJobs, totalPages, page, goTo, filterJobPosts } = usePublicJobs()
    const [categorie, setCategorie] = useState<catType | null>(null)
    const [jobType, setJobType] = useState<string | null>(null)
    const [searchJob, setSearchJob] = useState<string | null>(search.get('search'))

    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }

    const handleCatFilter = (catogory: catType) => {
        setCategorie(catogory)
    }

    const handleJobType = (type: string) => {
        setJobType(type)
    }

    const clearFilter = () => {
        setCategorie(null)
        setJobType(null)
    }

    useEffect(() => {
        getAllJobs(page)
    }, [])

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth' // Use 'smooth' for animated scroll or 'auto' for an instant jump
        });
    };

    useEffect(() => {
        scrollToTop()
        console.log("Search:", search.get('search'))
        if (categorie || jobType || searchJob) {
            console.log("Filter:",{category: categorie?.name, jobtype: jobType, search: searchJob})
            filterJobPosts({category: categorie?.name, jobtype: jobType, search: searchJob}, page)
        } else {
            getAllJobs(page)
        }
    }, [page, categorie, jobType, searchJob])


    return (
        <div className="px-20 md:px-50 py-20 bg-gray-100">
            <div className="flex justify-between">
                <div className="text-2xl md:text-5xl flex gap-2 font-bold">
                    <h1>Latest</h1>
                    <h1 className="text-blue-600">Tech Jobs</h1>
                </div>
                {user && user.role === 'recruiter' && <button onClick={() => navigate('/dashboard/recruiter/post-job')} className="bg-blue-600 text-white px-4 py-2 font-bold md:text-xl rounded-lg hover:bg-gray-800">Post Job</button>}
            </div>

            <div className="py-10 flex gap-10 justify-around">
                {/* JobsPosts */}
                <div className="w-full flex flex-col justify-between">
                    <div className="flex flex-col gap-5">
                        {loading && <div className="mt-50"><Loader /></div>}
                        {jobs.length === 0 && <span className="text-center">No jobs found!</span>}
                        {jobs.map((job: JobListCardType) => (
                            <div key={job._id} onClick={() => navigate(`/jobs/${job._id}`)} className="flex gap-10 justify-between bg-white hover:shadow-2xl hover:cursor-pointer p-3 md:p-10 rounded-2xl">
                                <div className="flex gap-7">
                                    {job.logo_url ? <img className="w-[70px] h-[70px] md:w-[120px] md:h-[120px] shadow-xl p-2 rounded-2xl" src={`https://img.logo.dev/${job.logo_url}?token=pk_Vmf4cUAuTm6K3bOd89Fphw`} alt="" /> : <Building2 size={100} />}
                                    <div className="flex flex-col">
                                        <h3 className="text-blue-600 md:text-lg font-bold">{job.recruiterId.cname}</h3>
                                        <h1 className="font-bold md:text-2xl">{job.title}</h1>
                                        <div className="flex text-xs gap-3 items-center mt-3">
                                            <p className="bg-gray-100 p-2 text-lg rounded-2xl">{job.category.toUpperCase()}</p>
                                            <p className="flex gap-2 items-center text-lg"><Clock className="text-blue-600" />{job.type}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-gray-500">
                                    <p>{new Date(job.createdAt).toDateString()}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex px-3 py-6 items-center justify-center gap-2 mt-6">
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
                    </div>
                </div>

                {/* Filters */}
                <div className="flex flex-col gap-10">
                    <div className="flex flex-col gap-3">
                        <h1 className="text-xl">Search Jobs</h1>
                        <div className="relative">
                            <Search className="absolute top-4 left-3 text-gray-400" />
                            <input type="text" value={searchJob || ''} onChange={(e) => setSearchJob(e.target.value)} className="bg-white px-12 rounded-2xl shadow-xl py-4" placeholder="Search For Jobs" />
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <div className="flex justify-between"><h1 className="text-xl">Categories</h1><button onClick={() => clearFilter()} className="text-blue-600 hover:cursor-pointer">Clear</button></div>
                        <div className="bg-white flex flex-col gap-3 px-3 rounded-2xl shadow-xl py-4">
                            {categories.map(cat => {
                                const isInclude = categorie ? cat.name === categorie.name : false
                                return (<div key={cat.id} onClick={() => handleCatFilter(cat)} className={`flex gap-3 justify-between ${isInclude ? 'bg-blue-500/50 hover:bg-blue-200' : 'hover:bg-gray-100'} hover:cursor-pointer p-2 px-4 rounded-2xl`}>
                                    <div className="flex gap-2">
                                        {cat.icon}
                                        <p>{cat.name}</p>
                                    </div>
                                    <MoveRight className="text-blue-600" />
                                </div>)
                            })}
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <h1 className="text-xl">Type</h1>
                        <div className="bg-white flex flex-col gap-3 px-5 rounded-2xl shadow-xl py-4">
                            <h1 className="flex gap-2 items-center"><Timer /> Timings</h1>
                            <div className="px-5 flex flex-col gap-3">
                                <div onClick={() => handleJobType(JobType.fulltime)} className={`flex gap-2 items-center ${jobType === JobType.fulltime ? 'bg-blue-500/50 hover:bg-blue-200' : 'bg-gray-100 hover:bg-blue-100'} hover:cursor-pointer p-2 rounded-2xl`}><Clock size={20} /> Full Time</div>
                                <div onClick={() => handleJobType(JobType.parttime)} className={`flex gap-2 items-center ${jobType === JobType.parttime ? 'bg-blue-500/50 hover:bg-blue-200' : 'bg-gray-100 hover:bg-blue-100'} hover:cursor-pointer p-2 rounded-2xl`}><Clock size={20} /> Part Time</div>
                            </div>
                            {/* <h1 className="flex gap-2 items-center"><MapPin /> Location</h1>
                            <div onClick={() => setRemoteJobs(!remoteJobs)} className={`flex gap-2 items-center mx-5 ${remoteJobs ? 'bg-blue-500/50 hover:bg-blue-200' : 'bg-gray-100 hover:bg-blue-100'} hover:cursor-pointer p-2 rounded-2xl`}><MapPinned size={20} /> Remote</div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Jobs
