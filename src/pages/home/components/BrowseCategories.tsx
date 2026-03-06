import { Code, Palette, Database, Smartphone, Brain, GraduationCap, Globe } from "lucide-react"
import { categories } from "../../../utils/constants"

const categoryIcons: Record<string, React.ReactNode> = {
    softwaredeveloper: <Code size={24} />,
    uiux: <Palette size={24} />,
    datascience: <Database size={24} />,
    mobiledev: <Smartphone size={24} />,
    aiml: <Brain size={24} />,
    internships: <GraduationCap size={24} />,
    remotejobs: <Globe size={24} />,
}

export function BrowseCategories() {
    return (
        <section className='py-16 bg-white'>
            <div className="max-w-7xl mx-auto px-6">
                {/* Title */}
                <h2 className="text-3xl font-bold mb-3 text-center">
                    Browse by Category
                </h2>
                <p className="text-gray-500 text-center mb-10">
                    Explore opportunities across different fields
                </p>

                {/* Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                    {categories.map(cat => (
                        <div
                            key={cat.slug}
                            className="cursor-pointer group bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-300 rounded-xl p-5 flex flex-col items-center text-center transition-all duration-200 shadow-sm hover:shadow-md"
                        >
                            {/* Icon */}
                            <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center mb-3 transition-colors duration-200">
                                {categoryIcons[cat.slug] ?? <Code size={24} />}
                            </div>

                            {/* Name */}
                            <h3 className="font-semibold text-sm">{cat.name}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}