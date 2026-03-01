import { useEffect } from "react"
import { useRecruiter } from "../../../hooks/useRecruiter"
import { JobCard } from "../../../components/JobCard"

export function PostedJobs() {
    const { getPostedJobs, jobs } = useRecruiter()

    useEffect(() => {
        getPostedJobs()
    }, [])

    return (
        <div className='md:p-10 bg-gray-100'>
            <h1 className="text-3xl font-bold mb-6">Posted Jobs</h1>

            <div className="flex flex-col gap-5">
                {jobs && jobs.map(job => (
                    <JobCard key={job._id} job={job} />
                ))}
            </div>
        </div>
    )
}