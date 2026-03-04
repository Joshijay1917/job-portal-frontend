import { BookCheck, Calendar, Clock, IndianRupee } from "lucide-react"
import { useJobs } from "../../../context/jobs.context"
import { useEffect } from "react"
import { Loader } from "../../../components/Loader"
import { formatDate } from "../../../utils/formatDate"
import { useCandidate } from "../../../hooks/useCandidate"

export function LatestJobs() {
    const { jobs, loading, getAllJobs } = useJobs()
    const usecandidate = useCandidate()

    useEffect(() => {
        getAllJobs(1)
    }, [])

    return (
        <section className='py-16 bg-gray-50'>
            <div className="max-w-5xl mx-auto px-6">
                {/* Title */}
                <h2 className="text-3xl font-bold mb-2 text-center">Latest Job Openings</h2>
                <p className="text-gray-500 text-center mb-8">Fresh opportunities posted recently</p>

                <div className='flex flex-col gap-4'>
                    {loading ? <Loader /> : jobs.slice(5).map((job) => (
                        <div key={job._id} className='bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 p-5 md:p-6'>
                            <div className='flex flex-col gap-1 mb-4 pb-3 border-b border-gray-100'>
                                <h3 className='text-xl md:text-2xl font-bold'>{job.title}</h3>
                                <p className='text-gray-500 text-sm'>{job.recruiterId.cname}</p>
                            </div>
                            <div className='w-full flex-col md:flex-row gap-3 flex md:items-center md:justify-between'>
                                <div className='flex flex-wrap gap-2'>
                                    <span className='hidden md:inline-flex items-center gap-1.5 bg-gray-50 text-gray-600 text-xs font-medium px-3 py-1.5 rounded-full'>
                                        <Clock size={14} className="text-blue-500" /> {job.type}
                                    </span>
                                    <span className='inline-flex items-center gap-1.5 bg-green-50 text-green-700 text-xs font-medium px-3 py-1.5 rounded-full'>
                                        <IndianRupee size={14} /> {job.salary.min} - {job.salary.max}
                                    </span>
                                    <span className='hidden md:inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 text-xs font-medium px-3 py-1.5 rounded-full'>
                                        <BookCheck size={14} /> {job.category}
                                    </span>
                                    <span className='inline-flex items-center gap-1.5 bg-gray-50 text-gray-500 text-xs font-medium px-3 py-1.5 rounded-full'>
                                        <Calendar size={14} /> {formatDate(job.createdAt)}
                                    </span>
                                </div>
                                <button
                                    onClick={() => usecandidate.applyJobPost(job._id)}
                                    className='bg-blue-600 w-full md:w-auto text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 cursor-pointer transition-colors font-medium text-sm inline-flex items-center justify-center gap-2'
                                >
                                    {usecandidate.loading && <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
                                    Apply Job
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
