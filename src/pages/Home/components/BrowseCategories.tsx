import { Zap } from "lucide-react"
import { categories } from "../../../utils/constants"

export function BrowseCategories() {
    return (
        <section className='py-16 bg-white'>
            <div className="max-w-7xl mx-auto px-6">
                {/* Title */}
                <h2 className="text-3xl font-bold mb-10 text-center">
                    Browse by Category
                </h2>

                {/* Grid */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                    {categories.slice(0, 5).map(cat => (
                        <div
                            key={cat.slug}
                            className="cursor-pointer bg-gray-50 hover:bg-blue-50 border border-gray-300 rounded-xl p-5 flex flex-col items-center text-center transition shadow-sm hover:shadow-md"
                        >
                            {/* Icon */}
                            <div className="text-3xl mb-3"><Zap /></div>

                            {/* Name */}
                            <h3 className="font-semibold text-sm">{cat.name}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}