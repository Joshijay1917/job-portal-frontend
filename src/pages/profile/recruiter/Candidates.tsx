import { useEffect, useState } from "react"
import { Status, type ApplicationType } from "../../../types/hooks/useRecruiter.d"
import { Loader } from "../../../components/Loader"
import { asyncRunner } from "../../../utils/asyncRunner"
import { getAllApplicants, updateAppStatus } from "../../../lib/apis"
import toast from "react-hot-toast"
import { Retry } from "../../../components/Retry"

export function Candidates() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [applications, setApplications] = useState<ApplicationType[]>([])

    const handleUpdateStatus = async (appId: string, status: Status) => {
        setLoading(true)
        const res = await asyncRunner(updateAppStatus(appId, status))

        if (!res || !res.data) {
            toast.error('Failed to update status!')
            setLoading(false)
            return;
        }

        toast.success('Update status successfully!')
        setLoading(false)
    }

    const getAllCandidates = async () => {
        setLoading(true)
        const res = await asyncRunner(getAllApplicants())

        if (!res || !res.data) {
            setError(res.error)
            setLoading(false)
            return;
        }

        setApplications(res.data.data)
        setLoading(false)
    }

    const getStatusStyle = (status: Status) => {
        switch (status) {
            case Status.Shortlisted:
                return "bg-green-50 text-green-600"
            case Status.Rejected:
                return "bg-red-50 text-red-600"
            default:
                return "bg-blue-50 text-blue-600"
        }
    }

    useEffect(() => {
        getAllCandidates()
    }, [])

    return (
        <div className='md:p-10 bg-gray-100'>
            <h1 className="text-xl md:text-3xl font-bold mb-6">Candidates</h1>

            <div className="flex flex-col gap-4">
                {loading && <Loader />}
                {!loading && error && <Retry onRetry={() => getAllCandidates()} />}
                {!loading && applications.length === 0 && (
                    <div className="bg-white rounded-xl border border-gray-100 p-10 text-center">
                        <p className="text-gray-500">No candidates found!</p>
                    </div>
                )}
                {applications && applications.map(app => (
                    <div key={app._id} className="bg-white flex flex-col md:flex-row justify-between md:items-center gap-4 hover:shadow-md border border-gray-100 p-5 md:p-6 rounded-xl shadow-sm transition-shadow duration-200">
                        <div className="flex gap-4 items-center">
                            <img className="w-12 h-12 md:w-16 md:h-16 rounded-full ring-2 ring-gray-100 object-cover" src="/profile.png" alt="candidate_pic" />
                            <div>
                                <h3 className="text-sm md:text-lg font-semibold">{app.candidateId.fname}</h3>
                                <p className="text-gray-500 text-xs md:text-sm">{app.candidateId.email}</p>
                                <p className="text-blue-600 font-medium text-xs mt-0.5">Applied for {app.jobPostId.title}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 md:flex-col md:items-end">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(app.status)}`}>{app.status}</span>
                            <div className="flex gap-2">
                                <button onClick={() => handleUpdateStatus(app._id, Status.Rejected)} className="bg-red-50 text-red-600 hover:bg-red-100 cursor-pointer px-3 py-1.5 text-xs font-medium rounded-lg transition-colors">Reject</button>
                                <button onClick={() => handleUpdateStatus(app._id, Status.Shortlisted)} className="bg-green-50 text-green-600 hover:bg-green-100 cursor-pointer px-3 py-1.5 text-xs font-medium rounded-lg transition-colors">Shortlist</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}