import { Building2, Clock } from "lucide-react"
import type { JobListCardType } from "../types/context/Job.context"
import { formatDate } from "../utils/formatDate"
import { generateCmpLogoUrl } from "../utils/generateCmpLogoUrl"

export function JobCard({ job }: { job: JobListCardType }) {
    return (
        <div className="flex gap-10 justify-between bg-white hover:shadow-2xl hover:cursor-pointer p-3 md:p-10 rounded-2xl">
            <div className="flex gap-7">
                {job.logo_url ? <img className="w-[70px] h-[70px] md:w-[120px] md:h-[120px] shadow-xl p-2 rounded-2xl" src={generateCmpLogoUrl(job.logo_url)} alt="Company_logo" /> : <Building2 size={100} />}
                <div className="flex flex-col">
                    <h3 className="text-blue-600 text-sm md:text-lg font-bold">{job.recruiterId.cname}</h3>
                    <h1 className="font-bold text-sm md:text-2xl">{job.title}</h1>
                    <div className="flex text-xs md:text-lg gap-3 items-center mt-3">
                        <p className="bg-gray-100 p-2 rounded-2xl">{job.category.toUpperCase()}</p>
                        <p className="flex gap-2 items-center"><Clock className="text-blue-600" />{job.type}</p>
                    </div>
                </div>
            </div>
            <div className="text-gray-500">
                <p className="hidden md:inline md:text-lg">{formatDate(job.createdAt)}</p>
            </div>
        </div>
    )
}