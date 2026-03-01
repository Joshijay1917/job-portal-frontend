import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ROUTES } from "../../../Routes"

export function HeroSection() {
    const [searchJob, setSearchJob] = useState<string>('')
    const navigate = useNavigate()

    const handleSearch = () => {
        if (searchJob.trim() !== '') {
            navigate(ROUTES.JOB_SEARCH(searchJob))
        }
    }

    return (
        <section className="relative bg-cover md:px-20 bg-[url('/hero-bg.png')] py-20 overflow-hidden">
            <div className="max-w-2xl text-center px-10 relative z-10">
                <div>
                    {/* Heading */}
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">
                        Find jobs that
                    </h1>
                    <h1 className="text-4xl text-blue-500 md:text-6xl font-bold mb-6">
                        match your skills
                    </h1>
                </div>

                <p className="text-gray-600 mb-10 text-lg">
                    Search from thousands of jobs and internships
                </p>

                {/* Search Box */}
                <div className="bg-white shadow-xl rounded-xl md:p-4 p-2 flex flex-col md:flex-row gap-3 max-w-3xl">

                    <input
                        type="text"
                        placeholder="Job title or keyword"
                        value={searchJob}
                        onChange={(e) => setSearchJob(e.target.value)}
                        className="flex-1 border rounded-lg px-4 py-3 outline-none"
                    />

                    <button
                        onClick={handleSearch}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
                    >
                        Search
                    </button>
                </div>

                {/* Popular Searches */}
                <div className="mt-8 hidden md:flex flex-wrap justify-center gap-3">
                    <button className="bg-gray-200 px-4 py-2 rounded-full text-sm hover:bg-gray-300">
                        MERN Developer
                    </button>
                    <button className="bg-gray-200 px-4 py-2 rounded-full text-sm hover:bg-gray-300">
                        Java Developer
                    </button>
                    <button className="bg-gray-200 px-4 py-2 rounded-full text-sm hover:bg-gray-300">
                        Laravel Developer
                    </button>
                </div>
            </div>
        </section>
    )
}