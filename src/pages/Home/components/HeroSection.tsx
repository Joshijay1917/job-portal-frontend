import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Search } from "lucide-react"
import { ROUTES } from "../../../Routes"

export function HeroSection() {
    const [searchJob, setSearchJob] = useState<string>('')
    const navigate = useNavigate()

    const handleSearch = () => {
        if (searchJob.trim() !== '') {
            navigate(ROUTES.JOB_SEARCH(searchJob))
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handleSearch()
    }

    const popularSearches = ["MERN Developer", "Java Developer", "Laravel Developer"]

    return (
        <section className="relative bg-cover md:px-20 bg-[url('/hero-bg.png')] py-24 overflow-hidden">
            <div className="max-w-2xl text-center px-10 relative z-10">
                {/* Heading */}
                <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                    Find jobs that{' '}
                    <span className="text-blue-500">match your skills</span>
                </h1>

                <p className="text-gray-600 mb-10 text-lg">
                    Search from thousands of jobs and internships
                </p>

                {/* Search Box */}
                <div className="bg-white shadow-xl rounded-xl md:p-4 p-2 flex flex-col md:flex-row gap-3 max-w-3xl">
                    <div className="flex-1 flex items-center gap-2 border rounded-lg px-4 py-3 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-shadow">
                        <Search size={18} className="text-gray-400 flex-shrink-0" />
                        <input
                            type="text"
                            placeholder="Job title or keyword"
                            value={searchJob}
                            onChange={(e) => setSearchJob(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="flex-1 outline-none bg-transparent"
                        />
                    </div>

                    <button
                        onClick={handleSearch}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium cursor-pointer"
                    >
                        Search
                    </button>
                </div>

                {/* Popular Searches */}
                <div className="mt-8 hidden md:flex flex-wrap justify-center gap-3">
                    <span className="text-gray-500 text-sm self-center">Popular:</span>
                    {popularSearches.map(term => (
                        <button
                            key={term}
                            onClick={() => navigate(ROUTES.JOB_SEARCH(term))}
                            className="bg-white/80 backdrop-blur-sm border border-gray-200 px-4 py-2 rounded-full text-sm hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 transition-colors cursor-pointer"
                        >
                            {term}
                        </button>
                    ))}
                </div>
            </div>
        </section>
    )
}