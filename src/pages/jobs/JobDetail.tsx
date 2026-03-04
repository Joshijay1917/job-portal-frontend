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
    const usecandidate = useCandidate()
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

        const success = await usecandidate.applyJobPost(jobDetails.jobPost._id)

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

    const job = jobDetails?.jobPost

    const metaItems = [
        { icon: <MapPin size={18} />, label: "Location", value: job.location, color: "bg-blue-50 text-blue-600" },
        { icon: <User size={18} />, label: "Experience", value: `${job.experience_required?.min}-${job.experience_required?.max} yrs`, color: "bg-purple-50 text-purple-600" },
        { icon: <ChartNoAxesGantt size={18} />, label: "Category", value: job.category, color: "bg-amber-50 text-amber-600" },
        { icon: <Clock size={18} />, label: "Type", value: job.type, color: "bg-gray-50 text-gray-600" },
        { icon: <IndianRupee size={18} />, label: "Salary", value: formatSalary(job.salary), color: "bg-green-50 text-green-600" },
    ]

    return (
        <div className="bg-gray-100 min-h-screen pb-16">
            {/* Header Section */}
            <div className="bg-gray-100 border-b border-gray-100">
                <div className="max-w-4xl mx-auto px-5 py-10 flex flex-col md:flex-row items-center gap-5 md:gap-8">
                    {job.logo_url
                        ? <img className="w-20 h-20 md:w-28 md:h-28 object-contain shadow-md p-2 rounded-2xl border border-gray-50 flex-shrink-0" src={generateCmpLogoUrl(job.logo_url)} alt="Company logo" />
                        : <div className="w-20 h-20 md:w-28 md:h-28 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center flex-shrink-0"><Building2 size={36} className="text-gray-400" /></div>
                    }
                    <div className="text-center md:text-left">
                        <p className="text-blue-600 font-semibold text-sm md:text-base tracking-wide">{job.recruiterId.cname}</p>
                        <h1 className="text-2xl md:text-4xl font-bold mt-1">{job.title}</h1>
                    </div>
                </div>
            </div>

            {/* Meta Info Strip */}
            <div className="max-w-4xl mx-auto px-5 -mt-1">
                <div className="bg-white/60 rounded-xl border border-gray-100 shadow-lg p-4 md:p-6">
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        {metaItems.map(item => (
                            <div key={item.label} className="flex flex-col items-center text-center gap-1.5">
                                <div className={`w-9 h-9 rounded-full ${item.color} flex items-center justify-center`}>
                                    {item.icon}
                                </div>
                                <span className="text-xs text-gray-400 font-medium">{item.label}</span>
                                <span className="text-sm font-semibold">{item.value || "—"}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {loading && <div className="m-10"><Loader /></div>}

            {/* Description */}
            <div className="max-w-4xl mx-auto px-5 mt-6">
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 md:p-8">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg md:text-2xl font-bold">Job Description</h2>
                        <span className="text-gray-400 text-xs md:text-sm">Posted on {formatDate(job.createdAt)}</span>
                    </div>
                    <p className="text-gray-700 text-sm md:text-base leading-relaxed">{job.description}</p>
                </div>
            </div>

            {/* Responsibilities */}
            {job.responsibilities.length > 0 && (
                <div className="max-w-4xl mx-auto px-5 mt-4">
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 md:p-8">
                        <h2 className="text-lg md:text-2xl font-bold mb-4">Responsibilities</h2>
                        <ul className="space-y-2.5 pl-1">
                            {job.responsibilities.map(respo => (
                                <li key={respo} className="flex items-start gap-2.5 text-sm md:text-base text-gray-700">
                                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                                    {respo}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}

            {/* Skills */}
            {job.skills.length > 0 && (
                <div className="max-w-4xl mx-auto px-5 mt-4">
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 md:p-8">
                        <h2 className="text-lg md:text-2xl font-bold mb-4">Skills Required</h2>
                        <div className="flex flex-wrap gap-2">
                            {job.skills.map(skill => (
                                <span key={skill} className="bg-blue-50 text-blue-700 text-xs md:text-sm font-medium px-3 py-1.5 rounded-full">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Apply Button */}
            {(user && user.role !== 'recruiter') && (
                <div className="max-w-4xl mx-auto px-5 mt-8 flex justify-center">
                    <button
                        onClick={() => handleApply()}
                        disabled={jobDetails.hasApplied || usecandidate.loading}
                        className={`inline-flex items-center gap-2.5 px-10 py-3 text-base md:text-lg font-semibold rounded-xl transition-colors cursor-pointer ${jobDetails.hasApplied
                            ? "bg-green-600 text-white cursor-not-allowed opacity-70"
                            : "bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
                            } disabled:cursor-not-allowed`}
                    >
                        {usecandidate.loading && <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
                        {jobDetails.hasApplied && <Check size={18} />}
                        {jobDetails.hasApplied ? "Applied" : "Apply Now"}
                    </button>
                </div>
            )}
        </div>
    )
}
