import { BookCheck, Building2, IndianRupee, MapPin } from "lucide-react"

export function LatestJobs() {
    return (
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
                        <div className='w-full flex-col md:flex-row gap-2 flex md:justify-between'>
                            <div className='grid grid-cols-2 md:grid-cols-4 max-w-4xl gap-3'>
                                <p className='flex gap-2 text-sm'><Building2 size={20} /> IT Solutions Pvt. Ltd.</p>
                                <p className='hidden md:flex gap-2 text-sm'><MapPin size={20} /> Rajkot</p>
                                <p className='flex gap-2 text-sm'><IndianRupee size={20} /> 20,000</p>
                                <p className='hidden md:flex gap-2 text-sm'><BookCheck size={20} /> IT</p>
                            </div>
                            <button className='bg-blue-600 w-full md:w-auto text-white px-4 py-2 rounded-lg hover:bg-gray-800'>Apply Job</button>
                        </div>
                    </div>
                    <div className='bg-white p-5'>
                        <div className='flex flex-col gap-3 mb-5 border-b'>
                            <h1 className='text-2xl font-bold'>Java Developer</h1>
                            <p>We are looking for a java developer which has a experience of 1-2 years.</p>
                        </div>
                        <div className='w-full gap-2 flex-col flex md:flex-row justify-between'>
                            <div className='grid grid-cols-2 md:grid-cols-4 max-w-4xl gap-3'>
                                <p className='flex gap-2 text-sm'><Building2 size={20} /> Solutions Pvt. Ltd.</p>
                                <p className='hidden md:flex gap-2 text-sm'><MapPin size={20} /> Rajkot</p>
                                <p className='flex gap-2 text-sm'><IndianRupee size={20} /> 10,000</p>
                                <p className='hidden md:flex gap-2 text-sm'><BookCheck size={20} /> IT</p>
                            </div>
                            <button className='bg-blue-600 w-full md:w-auto text-white px-4 py-2 rounded-lg hover:bg-gray-800'>Apply Job</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
