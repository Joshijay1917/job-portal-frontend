import { useEffect } from "react"
import { useRecruiter } from "../../../hooks/useRecruiter"
import { JobCard } from "../../../components/JobCard"
import { Loader } from "../../../components/Loader"

export function PostedJobs() {
    const { getPostedJobs, jobs, loading } = useRecruiter()

    useEffect(() => {
        getPostedJobs()
    }, [])

    return (
        <div className='md:p-10 bg-gray-100'>
            <h1 className="text-xl md:text-3xl font-bold mb-6">Posted Jobs</h1>

            <div className="flex flex-col gap-5">
                {loading && <Loader />}
                {!loading && jobs.length === 0 && (
                    <div className="bg-white rounded-xl border border-gray-100 p-10 text-center">
                        <p className="text-gray-500">You haven't posted any jobs yet.</p>
                    </div>
                )}
                {jobs && jobs.map(job => (
                    <JobCard key={job._id} job={job} />
                ))}
            </div>
        </div>
    )
}