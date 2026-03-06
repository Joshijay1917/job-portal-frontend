import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Building2, Clock, MapPin } from "lucide-react"
import { Loader } from "../../../components/Loader"
import { Status } from "../../../types/hooks/useRecruiter.d"
import { ROUTES } from "../../../Routes"
import { generateCmpLogoUrl } from "../../../utils/generateCmpLogoUrl"
import { formatDate } from "../../../utils/formatDate"
import type { CandidateApplicationType } from "../../../types/hooks/useCandidate"
import { asyncRunner } from "../../../utils/asyncRunner"
import { getAppliedJobs } from "../../../lib/apis"
import toast from "react-hot-toast"

export function Applications() {
    const [loading, setLoading] = useState(false)
    const [applications, setApplications] = useState<CandidateApplicationType[]>([])
    const navigate = useNavigate()

    const getStatusStyle = (status: Status) => {
        switch (status) {
            case Status.Applied:
                return "bg-blue-100 text-blue-600"
            case Status.Shortlisted:
                return "bg-green-100 text-green-600"
            case Status.Rejected:
                return "bg-red-100 text-red-600"
            default:
                return "bg-gray-100 text-gray-600"
        }
    }

    const getAppliedJob = async () => {
        setLoading(true)
        const res = await asyncRunner(getAppliedJobs())

        if (!res || !res.data) {
            toast.error(res.error)
            setLoading(false)
            return;
        }

        setApplications(res.data.data)
        setLoading(false)
    }

    useEffect(() => {
        getAppliedJob()
    }, [])

    return (
        <div className="md:p-10 bg-gray-100">
            <h1 className="text-xl md:text-3xl font-bold mb-6">My Applications</h1>

            {loading && <Loader />}

            {!loading && applications.length === 0 && (
                <div className="bg-white rounded-2xl p-10 text-center">
                    <p className="text-gray-500 text-lg">You haven't applied to any jobs yet.</p>
                    <button
                        onClick={() => navigate(ROUTES.JOBS)}
                        className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer"
                    >
                        Browse Jobs
                    </button>
                </div>
            )}

            <div className="flex flex-col gap-4">
                {applications.map(app => (
                    <div
                        key={app._id}
                        onClick={() => navigate(ROUTES.JOB_DETAIL(app.jobPostId))}
                        className="bg-white flex justify-between items-center hover:shadow-md border border-gray-100 p-4 md:p-6 rounded-xl cursor-pointer shadow-sm transition-shadow duration-200"
                    >
                        <div className="flex gap-3 md:gap-5 items-center">
                            {app.logo_url
                                ? <img className="w-[50px] h-[50px] md:w-[70px] md:h-[70px] rounded-xl shadow p-1" src={generateCmpLogoUrl(app.logo_url)} alt="company_logo" />
                                : <div className="w-[50px] h-[50px] md:w-[70px] md:h-[70px] rounded-xl bg-gray-100 flex items-center justify-center"><Building2 className="text-gray-400" /></div>
                            }
                            <div>
                                <h3 className="text-sm md:text-lg font-bold">{app.title}</h3>
                                <div className="flex gap-3 mt-1 text-gray-500 text-xs">
                                    {app.location && (
                                        <span className="flex items-center gap-1"><MapPin size={12} /> {app.location}</span>
                                    )}
                                    <span className="flex items-center gap-1"><Clock size={12} /> {app.type}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col items-end gap-2">
                            <span className={`px-3 py-1 rounded-full text-xs md:text-sm font-medium ${getStatusStyle(app.status)}`}>
                                {app.status}
                            </span>
                            <span className="text-gray-400 text-xs">
                                {formatDate(app.createdAt)}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}