import { Building2, ChartNoAxesGantt, Clock, IndianRupee, MapPin, User } from "lucide-react"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import type { JobDetails } from "../types/hooks/useJobs"
import { usePublicJobs } from "../hooks/useJobs"
import Loader from "../components/Loader"

function JobDetail() {
    const { id } = useParams()
    const { getJobDetails, loading } = usePublicJobs()
    const [jobDetails, setJobDetails] = useState<JobDetails>({
        _id: '',
        recruiterId: { cname: "abc pvt. ltd." },
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
        createdAt: new Date(),
        updatedAt: new Date()
    })

    const handleJobDetailsFetch = async () => {
        if (id) {
            const data = await getJobDetails(id)
            if(!data) return;
            setJobDetails(data)
        }
    }

    useEffect(() => {
        handleJobDetailsFetch()
    }, [])
    

    return (
        <div className="px-10 bg-gray-100">
            {/* <img className="w-full max-h-50" src="https://img.freepik.com/free-vector/blue-geometric-frame-vector_53876-140352.jpg" alt="" /> */}
            <div className="flex flex-col items-center justify-center gap-5 py-10">
                {jobDetails?.logo_url ? <img className="shadow-2xl rounded-2xl" src={`https://img.logo.dev/${jobDetails?.logo_url}?token=pk_Vmf4cUAuTm6K3bOd89Fphw`} alt="" /> : <Building2 size={100} />}
                <div className="text-center">
                    <p className="text-blue-600 font-bold text-2xl">{jobDetails?.recruiterId.cname}</p>
                    <h1 className="text-3xl font-bold">{jobDetails?.title}</h1>
                </div>
            </div>

            <div className="flex px-40 py-5 border-b">
                <div className="flex mx-auto items-center gap-2 flex-col">
                    <div className="flex items-center gap-2 text-gray-500"><MapPin size={20} /> Location</div>
                    <p>{jobDetails?.location}</p>
                </div>
                <div className="flex mx-auto items-center gap-2 flex-col">
                    <div className="flex items-center gap-2 text-gray-500"><User size={20} /> Experience</div>
                    <p>{jobDetails?.experience_required?.min}-{jobDetails?.experience_required?.max}</p>
                </div>
                <div className="flex mx-auto items-center gap-2 flex-col">
                    <div className="flex items-center gap-2 text-gray-500"><ChartNoAxesGantt size={20} /> Category</div>
                    <p>{jobDetails?.category}</p>
                </div>
                <div className="flex mx-auto items-center gap-2 flex-col">
                    <div className="flex items-center gap-2 text-gray-500"><Clock size={20} /> Type</div>
                    <p>{jobDetails?.type}</p>
                </div>
                <div className="flex mx-auto items-center gap-2 flex-col">
                    <div className="flex gap-2 text-gray-500"><IndianRupee size={20} /> Salary</div>
                    <p>₹{jobDetails?.salary.min}-₹{jobDetails?.salary.max}</p>
                </div>
            </div>

            {loading && <div className="m-10"><Loader /></div>}

            <div className="mx-30 my-10 px-10 py-10 bg-white rounded-2xl">
                <div className="flex justify-between">
                    <h1 className="text-3xl font-bold">Job Description</h1>
                    <p className="text-gray-400 text-xl">Posted on {jobDetails?.createdAt.toString()}</p>
                </div>
                <div className="py-5 px-10">
                    <p>{jobDetails?.description}</p>
                </div>
            </div>

            <div className="mx-30 my-10 px-10 py-10 bg-white rounded-2xl">
                <div className="flex justify-between">
                    <h1 className="text-3xl font-bold">Job Responsibility</h1>
                </div>
                <div className="py-5 px-10">
                    {/* <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam deleniti nam ratione doloremque soluta perspiciatis tempora id omnis architecto voluptatem atque laborum dicta aliquid, ipsa quasi ducimus repellat veniam quae.</p> */}
                    <ul className="list-disc pl-5 py-5">
                        {jobDetails?.responsibilities.map(respo => (
                            <li>{respo}</li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="mx-30 my-10 px-10 py-10 bg-white rounded-2xl">
                <div className="flex justify-between">
                    <h1 className="text-3xl font-bold">Skills Required</h1>
                </div>
                <div className="py-5 px-10 flex gap-4">
                    {jobDetails?.skills.map(skill => (
                        <div className="bg-blue-400/30 text-blue-600 rounded-2xl w-fit px-3 py-2  font-bold">
                            {skill}
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex justify-center pb-10">
                <button className="bg-blue-600 text-white px-14 py-3 text-xl font-bold rounded-lg hover:bg-gray-800 hover:cursor-pointer">Apply</button>
            </div>
        </div>
    )
}

export default JobDetail
