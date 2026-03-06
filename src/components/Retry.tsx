import { RefreshCw, WifiOff } from "lucide-react"

type RetryProps = {
    error?: string | null
    onRetry: () => void
}

export function Retry({ error, onRetry }: RetryProps) {
    const isTimeout = error?.toLowerCase().includes("timeout")

    return (
        <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
            <div className="bg-red-50 p-5 rounded-full mb-6">
                {isTimeout
                    ? <WifiOff size={40} className="text-red-400" />
                    : <RefreshCw size={40} className="text-red-400" />
                }
            </div>

            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
                {isTimeout ? "Connection Timed Out" : "Something Went Wrong"}
            </h2>

            <p className="text-gray-500 text-sm md:text-base max-w-md mb-6">
                {isTimeout
                    ? "The server took too long to respond. Please check your connection and try again."
                    : error || "An unexpected error occurred. Please try again."
                }
            </p>

            <button
                onClick={onRetry}
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium text-sm transition-colors cursor-pointer"
            >
                <RefreshCw size={16} />
                Try Again
            </button>
        </div>
    )
}
