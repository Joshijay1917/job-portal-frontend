import { useState } from "react"
import { Building2, Clock, Bookmark, BookmarkCheck, IndianRupee, BookCheck } from "lucide-react"
import type { JobListCardType } from "../types/context/Job.context"
import { formatDate } from "../utils/formatDate"
import { generateCmpLogoUrl } from "../utils/generateCmpLogoUrl"
import { useSavedPosts } from "../hooks/useSavedPosts"
import { useAuth } from "../context/auth.context"

export function JobCard({ job }: { job: JobListCardType }) {
    const { savePost, deletePost, loading } = useSavedPosts()
    const { isAuthenticated, user } = useAuth()
    const [saved, setSaved] = useState(job.isSaved ?? false)

    const handleToggleSave = async (e: React.MouseEvent) => {
        e.stopPropagation()
        if (loading) return

        if (saved) {
            const res = await deletePost(job._id)
            if (res) setSaved(false)
        } else {
            const res = await savePost(job._id)
            if (res) setSaved(true)
        }
    }

    return (
        <div className="flex gap-6 md:gap-10 justify-between bg-white border border-gray-100 shadow-sm hover:shadow-lg hover:border-gray-200 cursor-pointer p-4 md:p-8 rounded-2xl transition-all duration-200">
            <div className="flex gap-4 md:gap-6 min-w-0">
                {job.logo_url
                    ? <img className="w-14 h-14 md:w-24 md:h-24 object-contain shadow-md p-1.5 rounded-xl border border-gray-50 flex-shrink-0" src={generateCmpLogoUrl(job.logo_url)} alt="Company_logo" />
                    : <div className="w-14 h-14 md:w-24 md:h-24 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center flex-shrink-0"><Building2 size={32} className="text-gray-400" /></div>
                }
                <div className="flex flex-col min-w-0">
                    <h3 className="text-blue-600 text-xs md:text-sm font-semibold tracking-wide">{job.recruiterId.cname}</h3>
                    <h2 className="font-bold text-sm md:text-xl mt-0.5 truncate">{job.title}</h2>
                    <div className="flex flex-wrap text-xs md:text-sm gap-2 items-center mt-2.5">
                        <span className="bg-blue-50 text-blue-700 flex items-center gap-1.5 whitespace-nowrap px-2.5 py-1 rounded-full font-medium">
                            <BookCheck size={14} />{job.category.toUpperCase()}
                        </span>
                        <span className="bg-gray-50 text-gray-600 flex items-center gap-1.5 whitespace-nowrap px-2.5 py-1 rounded-full font-medium">
                            <Clock size={14} className="text-blue-500" />{job.type}
                        </span>
                        <span className="bg-green-50 text-green-700 flex items-center gap-1.5 whitespace-nowrap px-2.5 py-1 rounded-full font-medium">
                            <IndianRupee size={14} />{job.salary.min} - {job.salary.max}
                        </span>
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-end justify-between flex-shrink-0">
                <p className="hidden md:inline text-sm text-gray-400">{formatDate(job.createdAt)}</p>
                {isAuthenticated && user?.role === 'candidate' && (
                    <button
                        onClick={handleToggleSave}
                        disabled={loading}
                        className={`p-2 rounded-full transition-colors cursor-pointer ${saved
                            ? "text-blue-600 bg-blue-50 hover:bg-blue-100"
                            : "text-gray-400 hover:text-blue-600 hover:bg-gray-100"
                            } disabled:opacity-50`}
                        title={saved ? "Remove from saved" : "Save job"}
                    >
                        {saved ? <BookmarkCheck size={20} /> : <Bookmark size={20} />}
                    </button>
                )}
            </div>
        </div>
    )
}
