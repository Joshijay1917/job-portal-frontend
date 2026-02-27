import { BookCheck, Building2, IndianRupee, MapPin, ShieldCheck, Zap } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {
    const [title, settitle] = useState<string>('')
    const navigate = useNavigate()

    return (
        <div>
            <section className="relative bg-cover px-20 bg-[url('https://img.freepik.com/free-vector/blue-geometric-frame-vector_53876-140352.jpg')] py-20 overflow-hidden">
                <div className="max-w-2xl px-10 relative z-10">
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
                    <div className="bg-white shadow-xl rounded-xl p-4 flex flex-col md:flex-row gap-3 max-w-3xl">

                        <input
                            type="text"
                            placeholder="Job title or keyword"
                            value={title}
                            onChange={(e) => settitle(e.target.value)}
                            className="flex-1 border rounded-lg px-4 py-3 outline-none"
                        />

                        <button
                            onClick={() => navigate(`/jobs?search=${title}`)}
                            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
                        >
                            Search
                        </button>
                    </div>

                    {/* Popular Searches */}
                    <div className="mt-8 flex flex-wrap justify-center gap-3">
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

            <section className='py-16 bg-white'>
                <div className="max-w-7xl mx-auto px-6">
                    {/* Title */}
                    <h2 className="text-3xl font-bold mb-10 text-center">
                        Browse by Category
                    </h2>

                    {/* Grid */}
                    <div className="grid grid-cols-4 gap-6">
                        <div
                            className="cursor-pointer bg-gray-50 hover:bg-blue-50 border border-gray-300 rounded-xl p-5 flex flex-col items-center text-center transition shadow-sm hover:shadow-md"
                        >
                            {/* Icon */}
                            <div className="text-3xl mb-3"><Zap /></div>

                            {/* Name */}
                            <h3 className="font-semibold text-sm">UI/UX</h3>
                        </div>
                        <div
                            className="cursor-pointer bg-gray-50 hover:bg-blue-50 border border-gray-300 rounded-xl p-5 flex flex-col items-center text-center transition shadow-sm hover:shadow-md"
                        >
                            {/* Icon */}
                            <div className="text-3xl mb-3"><Zap /></div>

                            {/* Name */}
                            <h3 className="font-semibold text-sm">Mern Developer</h3>
                        </div>
                        <div
                            className="cursor-pointer bg-gray-50 hover:bg-blue-50 border border-gray-300 rounded-xl p-5 flex flex-col items-center text-center transition shadow-sm hover:shadow-md"
                        >
                            {/* Icon */}
                            <div className="text-3xl mb-3"><Zap /></div>

                            {/* Name */}
                            <h3 className="font-semibold text-sm">Java Developer</h3>
                        </div>
                        <div
                            className="cursor-pointer bg-gray-50 hover:bg-blue-50 border border-gray-300 rounded-xl p-5 flex flex-col items-center text-center transition shadow-sm hover:shadow-md"
                        >
                            {/* Icon */}
                            <div className="text-3xl mb-3"><Zap /></div>

                            {/* Name */}
                            <h3 className="font-semibold text-sm">.NET Developer</h3>
                        </div>
                    </div>
                </div>
            </section>

            <section className='py-16 bg-gray-100'>
                <div className="max-w-5xl mx-auto px-6">
                    {/* Title */}
                    <h2 className="text-3xl font-bold mb-8">Latest Job Openings</h2>

                    <div className='flex flex-col gap-5'>
                        <div className='bg-white p-5'>
                            <div className='flex flex-col gap-3 mb-5 border-b'>
                                <h1 className='text-2xl font-bold'>MERN Developer</h1>
                                <p>We are looking for a mern developer which has a experience of 1-2 years.</p>
                            </div>
                            <div className='w-full flex justify-between'>
                                <div className='grid grid-cols-4 max-w-4xl gap-3'>
                                    <p className='flex gap-2 text-sm'><Building2 size={20} /> IT Solutions Pvt. Ltd.</p>
                                    <p className='flex gap-2 text-sm'><MapPin size={20} /> Rajkot</p>
                                    <p className='flex gap-2 text-sm'><IndianRupee size={20} /> 20,000</p>
                                    <p className='flex gap-2 text-sm'><BookCheck size={20} /> IT</p>
                                </div>
                                <button className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-gray-800'>Apply Job</button>
                            </div>
                        </div>
                        <div className='bg-white p-5'>
                            <div className='flex flex-col gap-3 mb-5 border-b'>
                                <h1 className='text-2xl font-bold'>Java Developer</h1>
                                <p>We are looking for a java developer which has a experience of 1-2 years.</p>
                            </div>
                            <div className='w-full flex justify-between'>
                                <div className='grid grid-cols-4 max-w-4xl gap-3'>
                                    <p className='flex gap-2 text-sm'><Building2 size={20} /> Solutions Pvt. Ltd.</p>
                                    <p className='flex gap-2 text-sm'><MapPin size={20} /> Rajkot</p>
                                    <p className='flex gap-2 text-sm'><IndianRupee size={20} /> 10,000</p>
                                    <p className='flex gap-2 text-sm'><BookCheck size={20} /> IT</p>
                                </div>
                                <button className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-gray-800'>Apply Job</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    {/* Title */}
                    <h2 className="text-3xl md:text-4xl font-bold mb-12">
                        Why Use Our Portal
                    </h2>
                    <div className="grid w-3/4 mx-auto grid-cols-2 gap-8">
                        <div className="bg-gray-50 border border-gray-300 rounded-2xl p-8 hover:shadow-lg transition">
                            <div className="text-4xl mb-4 flex justify-center"><ShieldCheck /></div>
                            <h3 className="text-lg font-semibold mb-2">Verified Companies</h3>
                            <p className="text-gray-600 text-sm">All recruiters are verified to avoid fake jobs.</p>
                        </div>

                        <div className="bg-gray-50 border border-gray-300 rounded-2xl p-8 hover:shadow-lg transition">
                            <div className="text-4xl mb-4 flex justify-center"><Zap /></div>
                            <h3 className="text-lg font-semibold mb-2">Fast Apply</h3>
                            <p className="text-gray-600 text-sm">Apply to jobs in one click with your profile.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-cover bg-left bg-[url('https://static.weblinkindia.net/images/job-portal-banner.jpg')] text-white">
                <div className="max-w-6xl px-10">
                    {/* Title */}
                    <h2 className="text-3xl md:text-4xl font-bold mb-12">
                        How it works?
                    </h2>

                    <div className='flex flex-col gap-4'>
                        <div className='max-w-xl text-xl font-bold bg-white/20 flex rounded-2xl items-center gap-4'>
                            <div className='bg-white/50 p-5 rounded-xl'>
                                1
                            </div>
                            <p>
                                Create Profile
                            </p>
                        </div>
                        <div className='max-w-xl text-xl font-bold bg-white/20 flex rounded-2xl items-center gap-4'>
                            <div className='bg-white/50 p-5 rounded-xl'>
                                2
                            </div>
                            <p>
                                Upload Resume
                            </p>
                        </div>
                        <div className='max-w-xl text-xl font-bold bg-white/20 flex rounded-2xl items-center gap-4'>
                            <div className='bg-white/50 p-5 rounded-xl'>
                                3
                            </div>
                            <p>
                                Get Hired
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="p-20 flex justify-around">
                <div className="max-w-6xl px-10">
                    <h2 className="text-5xl font-bold mb-12">
                        Our Impact
                    </h2>

                    <div className='flex flex-col gap-5 text-3xl text-center'>
                        <p>10,000+ Jobs</p>
                        <p>5,000+ Companies</p>
                        <p>25,000+ Candidates</p>
                    </div>
                </div>
                <div className="bg-center bg-cover p-50 bg-[url('impact.png')]"></div>
            </section>
        </div>
    )
}

export default Home
