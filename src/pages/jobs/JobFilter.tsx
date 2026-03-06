import { Brain, ChevronsLeftRightEllipsis, Clock, Database, Laptop, LayoutPanelLeft, MoveRight, Search, TabletSmartphone, Timer, UsersRound } from "lucide-react"
import { useEffect, useState } from "react"
import { Categories, JobType } from "../../utils/constants"
import { scrollToTop } from "../../utils/scrollToTop"
import { useJobs } from "../../hooks/useJobs"

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

export function JobFilter({ search }: { search: URLSearchParams }) {
    const [categorie, setCategorie] = useState<catType | null>(null)
    const [jobType, setJobType] = useState<string | null>(null)
    const [searchJob, setSearchJob] = useState<string | null>(search.get('search'))
    const { filterJobPosts, getAllJobs, page } = useJobs()

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
        scrollToTop()
        if (categorie || jobType || searchJob) {
            filterJobPosts({ category: categorie?.name, jobtype: jobType, search: searchJob }, page)
        } else {
            getAllJobs(page)
        }
    }, [page, categorie, jobType, searchJob])

    return (
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
                        return (<button key={cat.id} onClick={() => handleCatFilter(cat)} className={`flex gap-3 justify-between ${isInclude ? 'bg-blue-500/50 hover:bg-blue-200' : 'hover:bg-gray-100'} hover:cursor-pointer p-2 px-4 rounded-2xl`}>
                            <div className="flex gap-2">
                                {cat.icon}
                                <p>{cat.name}</p>
                            </div>
                            <MoveRight className="text-blue-600" />
                        </button>)
                    })}
                </div>
            </div>

            <div className="flex flex-col gap-3">
                <h1 className="text-xl">Type</h1>
                <div className="bg-white flex flex-col gap-3 px-5 rounded-2xl shadow-xl py-4">
                    <h1 className="flex gap-2 items-center"><Timer /> Timings</h1>
                    <div className="px-5 flex flex-col gap-3">
                        <button onClick={() => handleJobType(JobType.fulltime)} className={`flex gap-2 items-center ${jobType === JobType.fulltime ? 'bg-blue-500/50 hover:bg-blue-200' : 'bg-gray-100 hover:bg-blue-100'} hover:cursor-pointer p-2 rounded-2xl`}><Clock size={20} /> Full Time</button>
                        <button onClick={() => handleJobType(JobType.parttime)} className={`flex gap-2 items-center ${jobType === JobType.parttime ? 'bg-blue-500/50 hover:bg-blue-200' : 'bg-gray-100 hover:bg-blue-100'} hover:cursor-pointer p-2 rounded-2xl`}><Clock size={20} /> Part Time</button>
                    </div>
                </div>
            </div>
        </div>
    )
}