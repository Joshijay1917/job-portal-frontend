import { ShieldCheck, Zap } from "lucide-react"

export function WhySection() {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-6 text-center">
                {/* Title */}
                <h2 className="text-3xl md:text-4xl font-bold mb-12">
                    Why Use Our Portal
                </h2>
                <div className="grid md:w-3/4 mx-auto grid-cols-2 gap-8">
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
    )
}