import { useEffect, useState } from "react"
import { X, Brain, ChevronsLeftRightEllipsis, Clock, Database, Laptop, LayoutPanelLeft, MoveRight, TabletSmartphone, Timer, UsersRound } from "lucide-react"
import { Categories, JobType } from "../utils/constants"
import { scrollToTop } from "../utils/scrollToTop"
import { useJobs } from "../context/jobs.context"

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

interface SidebarFiltersProps {
    isOpen: boolean
    onClose: () => void
}

export function SidebarFilters({ isOpen, onClose }: SidebarFiltersProps) {
    const [categorie, setCategorie] = useState<catType | null>(null)
    const [jobType, setJobType] = useState<string | null>(null)
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
        if (categorie || jobType) {
            filterJobPosts({ category: categorie?.name, jobtype: jobType }, page)
        } else {
            getAllJobs(page)
        }
    }, [page, categorie, jobType])

    return (
        <>
            {/* Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-50 md:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar Panel */}
            <aside
                className={`fixed top-0 right-0 h-full w-80 bg-gray-100 shadow-xl z-50 transform transition-transform duration-300 ease-in-out md:hidden overflow-y-auto ${isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 h-16 border-b border-gray-200 bg-white sticky top-0">
                    <h2 className="text-lg font-bold">Filters</h2>
                    <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg transition cursor-pointer">
                        <X className="w-6 h-6 text-gray-600" />
                    </button>
                </div>

                <div className="flex flex-col gap-6 p-5">

                    {/* Categories */}
                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-center">
                            <h3 className="font-semibold">Categories</h3>
                            <button onClick={clearFilter} className="text-blue-600 text-sm hover:cursor-pointer">Clear</button>
                        </div>
                        <div className="bg-white flex flex-col gap-2 px-3 rounded-xl shadow py-3">
                            {categories.map(cat => {
                                const isInclude = categorie ? cat.name === categorie.name : false
                                return (
                                    <div
                                        key={cat.id}
                                        onClick={() => handleCatFilter(cat)}
                                        className={`flex gap-3 justify-between ${isInclude ? 'bg-blue-500/50 hover:bg-blue-200' : 'hover:bg-gray-100'} hover:cursor-pointer p-2 px-3 rounded-xl text-sm`}
                                    >
                                        <div className="flex gap-2 items-center">
                                            {cat.icon}
                                            <p>{cat.name}</p>
                                        </div>
                                        <MoveRight className="text-blue-600 w-5 h-5" />
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    {/* Job Type */}
                    <div className="flex flex-col gap-2">
                        <h3 className="font-semibold">Type</h3>
                        <div className="bg-white flex flex-col gap-2 px-4 rounded-xl shadow py-3">
                            <h4 className="flex gap-2 items-center text-sm font-medium"><Timer className="w-5 h-5" /> Timings</h4>
                            <div className="px-3 flex flex-col gap-2">
                                <div
                                    onClick={() => handleJobType(JobType.fulltime)}
                                    className={`flex gap-2 items-center text-sm ${jobType === JobType.fulltime ? 'bg-blue-500/50 hover:bg-blue-200' : 'bg-gray-100 hover:bg-blue-100'} hover:cursor-pointer p-2 rounded-xl`}
                                >
                                    <Clock size={18} /> Full Time
                                </div>
                                <div
                                    onClick={() => handleJobType(JobType.parttime)}
                                    className={`flex gap-2 items-center text-sm ${jobType === JobType.parttime ? 'bg-blue-500/50 hover:bg-blue-200' : 'bg-gray-100 hover:bg-blue-100'} hover:cursor-pointer p-2 rounded-xl`}
                                >
                                    <Clock size={18} /> Part Time
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Apply Button */}
                    <button
                        onClick={onClose}
                        className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-medium cursor-pointer"
                    >
                        Apply Filters
                    </button>
                </div>
            </aside>
        </>
    )
}
