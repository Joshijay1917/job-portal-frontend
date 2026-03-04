import { X, Home, Briefcase, Info, Phone, LogOut, User } from "lucide-react"
import { Link } from "react-router-dom"
import { Logo } from "./Logo"
import { useAuth } from "../context/auth.context"
import { ROUTES } from "../Routes"

interface SidebarProps {
    isOpen: boolean
    onClose: () => void
}

const navLinks = [
    { label: "Home", to: ROUTES.HOME, icon: Home },
    { label: "Browse Jobs", to: ROUTES.JOBS, icon: Briefcase },
    { label: "About", to: ROUTES.ABOUT, icon: Info },
    { label: "Contact", to: ROUTES.CONTACT, icon: Phone },
]

function Sidebar({ isOpen, onClose }: SidebarProps) {
    const { isAuthenticated, user, logOutUser } = useAuth()

    return (
        <>
            {/* Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-50 md:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar Panel */}
            <aside
                className={`fixed top-0 left-0 h-full w-72 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out md:hidden ${isOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 h-16 border-b border-gray-200">
                    <Logo />
                    <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg transition cursor-pointer">
                        <X className="w-6 h-6 text-gray-600" />
                    </button>
                </div>

                {/* Nav Links */}
                <nav className="flex flex-col px-4 py-4 gap-1">
                    {navLinks.map((link) => (
                        <Link
                            key={link.label}
                            to={link.to}
                            onClick={onClose}
                            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition font-medium"
                        >
                            <link.icon className="w-5 h-5" />
                            {link.label}
                        </Link>
                    ))}
                </nav>

                <div className="border-t border-gray-200 mx-4" />

                {/* Auth Section */}
                <div className="flex flex-col px-4 py-4 gap-1">
                    {isAuthenticated ? (
                        <>
                            <Link
                                to={`/dashboard/${user?.role}`}
                                onClick={onClose}
                                className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition font-medium"
                            >
                                <User className="w-5 h-5" />
                                My Profile
                            </Link>
                            <button
                                onClick={() => { logOutUser(); onClose(); }}
                                className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition font-medium cursor-pointer"
                            >
                                <LogOut className="w-5 h-5" />
                                Log Out
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to={ROUTES.LOGIN}
                                onClick={onClose}
                                className="flex items-center justify-center border border-blue-600 text-blue-600 px-4 py-3 rounded-lg hover:bg-blue-50 transition font-medium"
                            >
                                Login
                            </Link>
                            <Link
                                to={ROUTES.REGISTER}
                                onClick={onClose}
                                className="flex items-center justify-center bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition font-medium"
                            >
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>
            </aside>
        </>
    )
}

export default Sidebar
