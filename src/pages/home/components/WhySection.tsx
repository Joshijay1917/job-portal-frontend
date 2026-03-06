import { ShieldCheck, Zap } from "lucide-react"

export function WhySection() {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-6 text-center">
                {/* Title */}
                <h2 className="text-3xl md:text-4xl font-bold mb-3">
                    Why Use Our Portal
                </h2>
                <p className="text-gray-500 mb-12">
                    Built for job seekers who value trust and speed
                </p>
                <div className="grid md:w-3/4 mx-auto grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-shadow duration-200">
                        <div className="flex justify-center mb-4">
                            <div className="w-14 h-14 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                                <ShieldCheck size={28} />
                            </div>
                        </div>
                        <h3 className="text-lg font-semibold mb-2">Verified Companies</h3>
                        <p className="text-gray-600 text-sm">All recruiters are verified to avoid fake jobs.</p>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-shadow duration-200">
                        <div className="flex justify-center mb-4">
                            <div className="w-14 h-14 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center">
                                <Zap size={28} />
                            </div>
                        </div>
                        <h3 className="text-lg font-semibold mb-2">Fast Apply</h3>
                        <p className="text-gray-600 text-sm">Apply to jobs in one click with your profile.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}