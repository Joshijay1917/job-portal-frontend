import { useLocation, useNavigate } from "react-router-dom"
import { useMemo } from "react"
import { candidateMenu, recruiterMenu } from "./menu"
import { useAuth } from "../../hooks/useAuth"


export function DashboardTabs() {
    const { user } = useAuth()
    const location = useLocation()
    const navigate = useNavigate()

    const menu = user?.role === "recruiter"
        ? recruiterMenu
        : candidateMenu

    const activeIndex = useMemo(() => {
        let bestIndex = -1
        let bestLength = 0

        menu.forEach((item, index) => {
            if (location.pathname.startsWith(item.path) && item.path.length > bestLength) {
                bestIndex = index
                bestLength = item.path.length
            }
        })

        return bestIndex
    }, [location.pathname, menu])

    const widthPercentage = 100 / menu.length

    return (
        <div className="my-6 bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="relative">
                <div
                    className="grid"
                    style={{ gridTemplateColumns: `repeat(${menu.length}, 1fr)` }}
                >
                    {menu.map((item, index) => (
                        <span
                            key={item.path}
                            onClick={() => navigate(item.path)}
                            className={`text-center text-xs md:text-sm cursor-pointer py-3.5 transition-colors duration-200 font-medium
                            ${index === activeIndex
                                    ? "text-blue-600"
                                    : "text-gray-400 hover:text-gray-700"
                                }
            `}
                        >
                            {item.name}
                        </span>
                    ))}
                </div>

                {/* Sliding Indicator */}
                <div
                    className="absolute bottom-0 h-0.5 bg-blue-600 transition-all duration-300 rounded-full"
                    style={{
                        width: `${widthPercentage}%`,
                        transform: `translateX(${activeIndex * 100}%)`
                    }}
                />
            </div>
        </div>
    )
}