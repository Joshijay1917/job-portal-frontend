import { useEffect } from "react"
import { useRecruiter } from "../../../hooks/useRecruiter"
import { Status } from "../../../types/hooks/useRecruiter.d"
import { Loader } from "../../../components/Loader"

export function Candidates() {
    const { applications, loading, getAllCandidates, updateStatus } = useRecruiter()

    useEffect(() => {
        getAllCandidates()
    }, [])

    const handleUpdateStatus = async (appId: string, status: Status) => {
        const success = await updateStatus(appId, status)

        if (success) {
            getAllCandidates()
        }
    }

    return (
        <div className='md:p-10 bg-gray-100'>
            <h1 className="text-xl md:text-3xl font-bold mb-6">Candidates</h1>

            <div className="flex flex-col gap-5">
                {loading && <Loader />}
                {!loading && applications.length === 0 && <span className="text-center">No candidates found!</span>}
                {applications && applications.map(app => (
                    <div key={app._id} className="bg-white flex justify-between hover:shadow-2xl p-6 rounded-xl cursor-pointer shadow-md">
                        <div className="flex gap-3">
                            <img width={70} height={70} src="/profile.png" alt="candidate_pic" />
                            <div>
                                <h3 className="text-lg font-semibold">{app.candidateId.fname}</h3>
                                <p className="text-gray-500">{app.candidateId.email}</p>
                                <p className="text-blue-600 font-bold text-xs md:text-lg">Applied on {app.jobPostId.title} Post</p>
                            </div>
                        </div>
                        <div className="flex flex-col justify-between items-end gap-3 w-1/4">
                            <p className={`${(app.status === Status.Applied || app.status === Status.Shortlisted) ? 'bg-blue-300/50 text-blue-600' : 'bg-red-300/50 text-red-600'} px-2 py-1 rounded-2xl text-xs md:text-base`}>{app.status}</p>
                            <div className="flex gap-3">
                                <button onClick={() => handleUpdateStatus(app._id, Status.Rejected)} className="bg-red-600 text-white hover:bg-gray-800 hover:cursor-pointer px-3 py-1 text-xs md:text-base rounded-xl">Reject</button>
                                <button onClick={() => handleUpdateStatus(app._id, Status.Shortlisted)} className="bg-green-600 text-white hover:bg-gray-800 hover:cursor-pointer px-3 py-1 text-xs md:text-base rounded-xl">Shortlist</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}