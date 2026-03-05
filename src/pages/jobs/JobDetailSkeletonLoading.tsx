function JobDetailSkeletonLoading() {
    return (
        <div className="bg-gray-100 min-h-screen pb-16 animate-pulse">
            {/* Header Skeleton */}
            <div className="bg-gray-100 border-b border-gray-100">
                <div className="max-w-4xl mx-auto px-5 py-10 flex flex-col md:flex-row items-center gap-5 md:gap-8">
                    <div className="w-20 h-20 md:w-28 md:h-28 rounded-2xl bg-gray-200 flex-shrink-0" />
                    <div className="text-center md:text-left space-y-3 w-full md:w-auto">
                        <div className="h-4 w-32 bg-gray-200 rounded-full mx-auto md:mx-0" />
                        <div className="h-8 w-64 bg-gray-200 rounded-lg mx-auto md:mx-0" />
                    </div>
                </div>
            </div>

            {/* Meta Strip Skeleton */}
            <div className="max-w-4xl mx-auto px-5 -mt-1">
                <div className="bg-white/60 rounded-xl border border-gray-100 shadow-lg p-4 md:p-6">
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="flex flex-col items-center text-center gap-2">
                                <div className="w-9 h-9 rounded-full bg-gray-200" />
                                <div className="h-3 w-14 bg-gray-200 rounded-full" />
                                <div className="h-4 w-20 bg-gray-200 rounded-full" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Description Skeleton */}
            <div className="max-w-4xl mx-auto px-5 mt-6">
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 md:p-8">
                    <div className="flex items-center justify-between mb-4">
                        <div className="h-6 w-40 bg-gray-200 rounded-lg" />
                        <div className="h-4 w-32 bg-gray-200 rounded-full" />
                    </div>
                    <div className="space-y-2.5">
                        <div className="h-4 w-full bg-gray-200 rounded-full" />
                        <div className="h-4 w-full bg-gray-200 rounded-full" />
                        <div className="h-4 w-3/4 bg-gray-200 rounded-full" />
                        <div className="h-4 w-5/6 bg-gray-200 rounded-full" />
                    </div>
                </div>
            </div>

            {/* Responsibilities Skeleton */}
            <div className="max-w-4xl mx-auto px-5 mt-4">
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 md:p-8">
                    <div className="h-6 w-44 bg-gray-200 rounded-lg mb-4" />
                    <div className="space-y-3 pl-1">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="flex items-center gap-2.5">
                                <div className="w-1.5 h-1.5 rounded-full bg-gray-200 flex-shrink-0" />
                                <div className="h-4 bg-gray-200 rounded-full" style={{ width: `${70 + Math.random() * 25}%` }} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Skills Skeleton */}
            <div className="max-w-4xl mx-auto px-5 mt-4">
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 md:p-8">
                    <div className="h-6 w-36 bg-gray-200 rounded-lg mb-4" />
                    <div className="flex flex-wrap gap-2">
                        {[80, 64, 96, 72, 88].map((w, i) => (
                            <div key={i} className="h-8 bg-gray-200 rounded-full" style={{ width: w }} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Button Skeleton */}
            <div className="max-w-4xl mx-auto px-5 mt-8 flex justify-center">
                <div className="h-12 w-40 bg-gray-200 rounded-xl" />
            </div>
        </div>
    )
}

export default JobDetailSkeletonLoading