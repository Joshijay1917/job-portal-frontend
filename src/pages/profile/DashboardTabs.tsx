import { useLocation, useNavigate } from "react-router-dom"
import { useMemo } from "react"
import { useAuth } from "../../context/auth.context"
import { candidateMenu, recruiterMenu } from "./menu"


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
        <div className="w-full bg-white">
            <div className="relative md:w-1/2 my-10 bg-white pt-3">
                <div
                    className="grid"
                    style={{ gridTemplateColumns: `repeat(${menu.length}, 1fr)` }}
                >
                    {menu.map((item, index) => (
                        <span
                            key={item.path}
                            onClick={() => navigate(item.path)}
                            className={`text-center cursor-pointer pb-3 transition-colors duration-200
                            ${index === activeIndex
                                    ? "text-black font-semibold"
                                    : "text-gray-400"
                                }
            `}
                        >
                            {item.name}
                        </span>
                    ))}
                </div>

                {/* Sliding Indicator */}
                <div
                    className="absolute bottom-0 h-1 bg-gray-700 transition-all duration-300"
                    style={{
                        width: `${widthPercentage}%`,
                        transform: `translateX(${activeIndex * 100}%)`
                    }}
                />
            </div>
        </div>
    )
}