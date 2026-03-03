import { useState } from "react"
import { Building2, Clock, Bookmark, BookmarkCheck } from "lucide-react"
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
            await deletePost(job._id)
            setSaved(false)
        } else {
            await savePost(job._id)
            setSaved(true)
        }
    }

    return (
        <div className="flex gap-10 justify-between bg-white hover:shadow-2xl hover:cursor-pointer p-3 md:p-10 rounded-2xl">
            <div className="flex gap-7">
                {job.logo_url ? <img className="w-[70px] h-[70px] md:w-[120px] md:h-[120px] shadow-xl p-2 rounded-2xl" src={generateCmpLogoUrl(job.logo_url)} alt="Company_logo" /> : <Building2 size={100} />}
                <div className="flex flex-col">
                    <h3 className="text-blue-600 text-sm md:text-lg font-bold">{job.recruiterId.cname}</h3>
                    <h1 className="font-bold text-sm md:text-2xl">{job.title}</h1>
                    <div className="flex text-xs md:text-lg gap-3 items-center mt-3">
                        <p className="bg-gray-100 p-2 rounded-2xl">{job.category.toUpperCase()}</p>
                        <p className="flex gap-2 items-center"><Clock className="text-blue-600" />{job.type}</p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-end justify-between">
                <p className="hidden md:inline md:text-lg text-gray-500">{formatDate(job.createdAt)}</p>
                {isAuthenticated && user?.role === 'candidate' && (
                    <button
                        onClick={handleToggleSave}
                        disabled={loading}
                        className={`p-2 rounded-lg transition cursor-pointer ${saved
                            ? "text-blue-600 hover:bg-blue-50"
                            : "text-gray-400 hover:text-blue-600 hover:bg-gray-100"
                            } disabled:opacity-50`}
                        title={saved ? "Remove from saved" : "Save job"}
                    >
                        {saved ? <BookmarkCheck size={22} /> : <Bookmark size={22} />}
                    </button>
                )}
            </div>
        </div>
    )
}
