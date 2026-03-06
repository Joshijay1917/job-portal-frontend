import { useEffect, useState } from "react"
import { JobCard } from "../../../components/JobCard"
import { Loader } from "../../../components/Loader"
import type { JobListCardType } from "../../../types/context/Job.context"
import { asyncRunner } from "../../../utils/asyncRunner"
import { getAllPosts } from "../../../lib/apis"
import toast from "react-hot-toast"

export function PostedJobs() {
    const [loading, setLoading] = useState(false)
    const [jobs, setJobs] = useState<JobListCardType[]>([])

    const getPostedJobs = async () => {
        setLoading(true)
        const res = await asyncRunner(getAllPosts())

        if (!res || !res.data) {
            toast.error(res.error)
            setLoading(false)
            return;
        }

        setJobs(res.data.data)
        setLoading(false)
    }

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