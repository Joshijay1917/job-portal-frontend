import { useLocation, useNavigate } from "react-router-dom"
import { useMemo } from "react"
import { useAuth } from "../../context/auth.context"
import { candidateMenu, recruiterMenu } from "./menu"

export default function DashboardTabs() {
    const { user } = useAuth()
    const location = useLocation()
    const navigate = useNavigate()

    const menu = user?.role === "recruiter"
        ? recruiterMenu
        : candidateMenu

    const activeIndex = useMemo(() => {
        return menu.findIndex(item =>
            location.pathname.startsWith(item.path)
        )
    }, [location.pathname, menu])

    const widthPercentage = 100 / menu.length

    return (
        <div className="relative w-1/2 my-10">
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
    )
}