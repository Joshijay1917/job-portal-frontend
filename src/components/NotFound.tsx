import { useNavigate } from "react-router-dom"
import { Home, Search, ArrowLeft, FileQuestion } from "lucide-react"
import { ROUTES } from "../Routes"

export function NotFound() {
    const navigate = useNavigate()

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-6 py-20">
            <div className="text-center max-w-lg">

                {/* Icon */}
                <div className="flex justify-center mb-6">
                    <div className="bg-blue-100 p-6 rounded-full">
                        <FileQuestion className="w-16 h-16 text-blue-600" />
                    </div>
                </div>

                {/* 404 Heading */}
                <h1 className="text-7xl md:text-9xl font-bold text-blue-600 mb-2">404</h1>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Page Not Found</h2>

                <p className="text-gray-500 text-lg mb-10">
                    Oops! The page you're looking for doesn't exist or has been moved.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center justify-center gap-2 border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition cursor-pointer"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Go Back
                    </button>

                    <button
                        onClick={() => navigate(ROUTES.HOME)}
                        className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition cursor-pointer"
                    >
                        <Home className="w-5 h-5" />
                        Home Page
                    </button>

                    <button
                        onClick={() => navigate(ROUTES.JOBS)}
                        className="flex items-center justify-center gap-2 border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition cursor-pointer"
                    >
                        <Search className="w-5 h-5" />
                        Browse Jobs
                    </button>
                </div>
            </div>
        </div>
    )
}