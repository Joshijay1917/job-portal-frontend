import { useNavigate } from "react-router-dom"
import { Target, Users, Briefcase, ShieldCheck, Zap, Globe, ArrowRight } from "lucide-react"
import { ROUTES } from "../../Routes"

const stats = [
    { label: "Jobs Posted", value: "10,000+", icon: Briefcase },
    { label: "Companies", value: "5,000+", icon: Globe },
    { label: "Candidates", value: "25,000+", icon: Users },
]

const values = [
    {
        icon: ShieldCheck,
        title: "Trust & Safety",
        description: "Every recruiter is verified to ensure a safe and genuine hiring experience for candidates."
    },
    {
        icon: Zap,
        title: "Speed & Simplicity",
        description: "Apply to jobs in one click. No lengthy forms — just your profile and you're set."
    },
    {
        icon: Target,
        title: "Smart Matching",
        description: "Our platform connects the right candidates with the right opportunities using smart filters."
    },
    {
        icon: Users,
        title: "Community First",
        description: "We're building a community of driven professionals and forward-thinking companies."
    },
]

export function About() {
    const navigate = useNavigate()

    return (
        <div>
            {/* Hero Section */}
            <section className="bg-gray-100 py-20 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        About <span className="text-blue-600">JobPortal</span>
                    </h1>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        We're on a mission to connect talented professionals with opportunities
                        that match their skills — making hiring faster, smarter, and more transparent.
                    </p>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-white">
                <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
                    {stats.map((stat) => (
                        <div
                            key={stat.label}
                            className="bg-gray-50 border border-gray-200 rounded-2xl p-8 text-center hover:shadow-lg transition"
                        >
                            <div className="flex justify-center mb-4">
                                <div className="bg-blue-100 p-4 rounded-full">
                                    <stat.icon className="w-8 h-8 text-blue-600" />
                                </div>
                            </div>
                            <p className="text-3xl font-bold text-blue-600 mb-1">{stat.value}</p>
                            <p className="text-gray-500 font-medium">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-20 bg-gray-100 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
                    <p className="text-gray-600 text-lg leading-relaxed">
                        The job market can be overwhelming. We built JobPortal to simplify the
                        process for both candidates and recruiters. Whether you're a fresh graduate
                        looking for your first internship or a recruiter searching for top talent,
                        our platform helps you find the perfect match — quickly and efficiently.
                    </p>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-20 bg-white px-6">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                        What We Stand For
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-3/4 mx-auto">
                        {values.map((item) => (
                            <div
                                key={item.title}
                                className="bg-gray-50 border border-gray-300 rounded-2xl p-8 hover:shadow-lg transition"
                            >
                                <div className="flex justify-center mb-4">
                                    <item.icon className="w-10 h-10 text-blue-600" />
                                </div>
                                <h3 className="text-lg font-semibold mb-2 text-center">{item.title}</h3>
                                <p className="text-gray-600 text-sm text-center">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gray-100 px-6">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Ready to Get Started?
                    </h2>
                    <p className="text-gray-600 text-lg mb-8">
                        Join thousands of candidates and recruiters already using JobPortal.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={() => navigate(ROUTES.JOBS)}
                            className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition cursor-pointer"
                        >
                            Browse Jobs
                            <ArrowRight className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => navigate(ROUTES.REGISTER)}
                            className="flex items-center justify-center gap-2 border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition cursor-pointer"
                        >
                            Create Account
                        </button>
                    </div>
                </div>
            </section>
        </div>
    )
}