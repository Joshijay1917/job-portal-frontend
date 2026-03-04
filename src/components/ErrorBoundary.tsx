import React from "react";
import { TriangleAlert, RefreshCw, Home } from "lucide-react";

interface Props {
    children: React.ReactNode;
    fallback?: React.ReactNode;
}

interface State {
    hasError: boolean;
}

function SomethingWentWrong() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 px-4">
            <div className="max-w-md w-full text-center space-y-6">
                {/* Animated warning icon */}
                <div className="flex justify-center">
                    <div className="relative">
                        <div className="absolute inset-0 rounded-full bg-red-100 dark:bg-red-900/30 animate-ping opacity-20" />
                        <div className="relative w-24 h-24 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center ring-1 ring-red-200 dark:ring-red-800">
                            <TriangleAlert className="w-12 h-12 text-red-500 dark:text-red-400" strokeWidth={1.5} />
                        </div>
                    </div>
                </div>

                {/* Text content */}
                <div className="space-y-2">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
                        Something Went Wrong
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                        An unexpected error occurred. Please try refreshing the
                        page or return to the homepage.
                    </p>
                </div>

                {/* Action buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                    <button
                        onClick={() => window.location.reload()}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-medium shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors cursor-pointer"
                    >
                        <RefreshCw className="w-4 h-4" />
                        Try Again
                    </button>
                    <a
                        href="/"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 text-sm font-medium shadow-sm ring-1 ring-gray-200 dark:ring-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 transition-colors"
                    >
                        <Home className="w-4 h-4" />
                        Go Home
                    </a>
                </div>
            </div>
        </div>
    );
}

class ErrorBoundary extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(_error: Error): State {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error("ErrorBoundary caught an error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback ?? <SomethingWentWrong />;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;