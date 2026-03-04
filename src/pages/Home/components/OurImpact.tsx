import { Briefcase, Building2, Users } from "lucide-react"

const stats = [
    { num: "10,000+", label: "Jobs Posted", icon: <Briefcase size={28} />, color: "text-blue-600 bg-blue-100" },
    { num: "5,000+", label: "Companies", icon: <Building2 size={28} />, color: "text-green-600 bg-green-100" },
    { num: "25,000+", label: "Candidates", icon: <Users size={28} />, color: "text-purple-600 bg-purple-100" },
]

export function OurImpact() {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
                <div className="flex-1">
                    <h2 className="text-4xl md:text-5xl font-bold mb-3">
                        Our Impact
                    </h2>
                    <p className="text-gray-500 mb-10">Numbers that speak for themselves</p>

                    <div className='grid grid-cols-1 sm:grid-cols-3 gap-6'>
                        {stats.map(stat => (
                            <div key={stat.label} className="bg-gray-50 border border-gray-100 rounded-2xl p-6 text-center hover:shadow-md transition-shadow duration-200">
                                <div className={`w-14 h-14 rounded-full ${stat.color} flex items-center justify-center mx-auto mb-4`}>
                                    {stat.icon}
                                </div>
                                <p className="text-3xl font-bold mb-1">{stat.num}</p>
                                <p className="text-gray-500 text-sm">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="hidden md:block flex-1 bg-center bg-cover rounded-2xl h-80 w-full bg-[url('impact.png')]" />
            </div>
        </section>
    )
}