import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Building2, Clock, Trash2 } from "lucide-react"
import { useSavedPosts } from "../../../hooks/useSavedPosts"
import { Loader } from "../../../components/Loader"
import { ROUTES } from "../../../Routes"
import { generateCmpLogoUrl } from "../../../utils/generateCmpLogoUrl"
import { formatDate } from "../../../utils/formatDate"

export function SavedJobs() {
    const { savedJobs, loading, getAllPosts, deletePost } = useSavedPosts()
    const navigate = useNavigate()

    useEffect(() => {
        getAllPosts()
    }, [])

    const handleRemove = async (e: React.MouseEvent, jobPostId: string) => {
        e.stopPropagation()
        await deletePost(jobPostId)
    }

    return (
        <div className="md:p-10 bg-gray-100">
            <h1 className="text-xl md:text-3xl font-bold mb-6">Saved Jobs</h1>

            {loading && <Loader />}

            {!loading && savedJobs.length === 0 && (
                <div className="bg-white rounded-2xl p-10 text-center">
                    <p className="text-gray-500 text-lg">You haven't saved any jobs yet.</p>
                    <button
                        onClick={() => navigate(ROUTES.JOBS)}
                        className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer"
                    >
                        Browse Jobs
                    </button>
                </div>
            )}

            <div className="flex flex-col gap-4">
                {savedJobs.map(saved => (
                    <div
                        key={saved._id}
                        onClick={() => navigate(ROUTES.JOB_DETAIL(saved.jobPostId._id))}
                        className="bg-white flex justify-between items-center hover:shadow-2xl p-4 md:p-6 rounded-xl cursor-pointer shadow-md transition"
                    >
                        <div className="flex gap-3 md:gap-5 items-center">
                            {saved.jobPostId.logo_url
                                ? <img className="w-[50px] h-[50px] md:w-[70px] md:h-[70px] rounded-xl shadow p-1" src={generateCmpLogoUrl(saved.jobPostId.logo_url)} alt="company_logo" />
                                : <div className="w-[50px] h-[50px] md:w-[70px] md:h-[70px] rounded-xl bg-gray-100 flex items-center justify-center"><Building2 className="text-gray-400" /></div>
                            }
                            <div>
                                <h3 className="text-sm md:text-lg font-bold">{saved.jobPostId.title}</h3>
                                <p className="text-blue-600 font-medium text-xs md:text-sm">{saved.jobPostId.recruiterId.cname}</p>
                                <div className="flex gap-3 mt-1 text-gray-500 text-xs">
                                    <span className="flex items-center gap-1"><Clock size={12} /> {saved.jobPostId.type}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col items-end gap-2">
                            <button
                                onClick={(e) => handleRemove(e, saved.jobPostId._id)}
                                className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition cursor-pointer"
                                title="Remove from saved"
                            >
                                <Trash2 size={18} />
                            </button>
                            <span className="text-gray-400 text-xs">
                                Saved {formatDate(saved.createdAt)}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}