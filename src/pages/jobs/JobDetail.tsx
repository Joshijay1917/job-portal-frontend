import { Building2, ChartNoAxesGantt, Check, Clock, IndianRupee, MapPin, User } from "lucide-react"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import type { JobDetails } from "../../types/hooks/useJobs"
import { useJobs } from "../../context/jobs.context"
import { Loader } from "../../components/Loader"
import { useCandidate } from "../../hooks/useCandidate"
import { useAuth } from "../../context/auth.context"
import { formatSalary } from "../../utils/formatSalary"
import { formatDate } from "../../utils/formatDate"
import { generateCmpLogoUrl } from "../../utils/generateCmpLogoUrl"

export function JobDetail() {
    const { id } = useParams()
    const { user } = useAuth()
    const { getJobDetails, loading } = useJobs()
    const { applyJobPost } = useCandidate()
    const [jobDetails, setJobDetails] = useState<JobDetails>({
        jobPost: {
            _id: '',
            recruiterId: { cname: "" },
            logo_url: null,
            title: "",
            description: "",
            responsibilities: [],
            skills: [],
            experience_required: { min: 0, max: 0 },
            salary: { min: 0, max: 0 },
            category: "",
            type: "",
            location: "",
            createdAt: Date.now().toString(),
            updatedAt: Date.now().toString()
        },
        hasApplied: false
    })

    const handleJobDetailsFetch = async () => {
        if (id) {
            const data = await getJobDetails(id)
            if (!data) return;
            setJobDetails(data)
        }
    }

    const handleApply = async () => {
        if (!jobDetails.jobPost._id) return

        const success = await applyJobPost(jobDetails.jobPost._id)

        if (success) {
            setJobDetails(prev => ({
                ...prev,
                hasApplied: true
            }))
        }
    }

    useEffect(() => {
        handleJobDetailsFetch()
    }, [])


    return (
        <div className="md:px-10 bg-gray-100">
            <div className="flex flex-row md:flex-col items-center justify-center gap-5 py-10">
                {jobDetails?.jobPost.logo_url ? <img className="shadow-2xl w-[80px] h-[80px] md:w-[150px] md:h-[150px] rounded-2xl" src={generateCmpLogoUrl(jobDetails?.jobPost.logo_url)} alt="" /> : <Building2 size={100} />}
                <div className="text-center">
                    <p className="text-blue-600 font-bold md:text-2xl">{jobDetails?.jobPost.recruiterId.cname}</p>
                    <h1 className="md:text-3xl text-xl font-bold">{jobDetails?.jobPost.title}</h1>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-5 md:flex text-xs md:text-xl md:px-40 py-5 border-b">
                <div className="flex mx-auto items-center gap-2 flex-col">
                    <div className="flex items-center gap-2 text-gray-500"><MapPin size={20} /> Location</div>
                    <p>{jobDetails?.jobPost.location}</p>
                </div>
                <div className="flex mx-auto items-center gap-2 flex-col">
                    <div className="flex items-center gap-2 text-gray-500"><User size={20} /> Experience</div>
                    <p>{jobDetails?.jobPost.experience_required?.min}-{jobDetails?.jobPost.experience_required?.max}</p>
                </div>
                <div className="flex mx-auto items-center gap-2 flex-col">
                    <div className="flex items-center gap-2 text-gray-500"><ChartNoAxesGantt size={20} /> Category</div>
                    <p>{jobDetails?.jobPost.category}</p>
                </div>
                <div className="flex mx-auto items-center gap-2 flex-col">
                    <div className="flex items-center gap-2 text-gray-500"><Clock size={20} /> Type</div>
                    <p>{jobDetails?.jobPost.type}</p>
                </div>
                <div className="flex mx-auto items-center gap-2 flex-col">
                    <div className="flex gap-2 text-gray-500"><IndianRupee size={20} /> Salary</div>
                    <p>{formatSalary(jobDetails?.jobPost.salary)}</p>
                </div>
            </div>

            {loading && <div className="m-10"><Loader /></div>}

            <div className="mx-5 md:mx-30 my-10 px-5 md:px-10 py-10 bg-white rounded-2xl">
                <div className="flex justify-between">
                    <h1 className="text-lg md:text-3xl font-bold">Job Description</h1>
                    <p className="text-gray-400 text-sm md:text-xl">Posted on {formatDate(jobDetails?.jobPost.createdAt)}</p>
                </div>
                <div className="py-5 px-10">
                    <p className="text-sm md:text-xl">{jobDetails?.jobPost.description}</p>
                </div>
            </div>

            <div className="mx-5 md:mx-30 my-10 px-5 md:px-10 py-10 bg-white rounded-2xl">
                <div className="flex justify-between">
                    <h1 className="text-lg md:text-3xl font-bold">Job Responsibility</h1>
                </div>
                <div className="py-5 px-10">
                    <ul className="list-disc pl-5 py-5">
                        {jobDetails?.jobPost.responsibilities.map(respo => (
                            <li key={respo}>{respo}</li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="mx-5 md:mx-30 my-10 px-5 md:px-10 py-10 bg-white rounded-2xl">
                <div className="flex justify-between">
                    <h1 className="text-lg md:text-3xl font-bold">Skills Required</h1>
                </div>
                <div className="py-5 md:px-10 md:flex grid grid-cols-3 gap-2 md:gap-4">
                    {jobDetails?.jobPost.skills.map(skill => (
                        <div key={skill} className="bg-blue-400/30 text-blue-600 rounded-2xl w-fit px-3 py-2  font-bold">
                            {skill}
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex justify-center pb-10">
                {(user && user.role !== 'recruiter') &&
                    <button
                        onClick={() => handleApply()}
                        disabled={jobDetails.hasApplied}
                        className={`${jobDetails.hasApplied ? "bg-green-600 cursor-not-allowed text-white opacity-50" : "bg-blue-600 hover:bg-gray-800 text-white"} px-7 md:px-14 py-1 md:py-3 text-lg md:text-xl font-bold rounded-lg hover:cursor-pointer`}>
                        {jobDetails.hasApplied && <Check className="inline mr-2" />}
                        {jobDetails.hasApplied ? "Applied" : "Apply"}
                    </button>}
            </div>
        </div>
    )
}
