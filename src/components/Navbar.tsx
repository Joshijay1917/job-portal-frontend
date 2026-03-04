import { useState } from 'react'
import { PanelLeftOpen } from 'lucide-react'
import { useAuth } from '../context/auth.context'
import { Logo } from './Logo'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ROUTES } from '../Routes'
import Sidebar from './Sidebar'

const navLinks = [
    { label: "Home", to: ROUTES.HOME },
    { label: "Browse Jobs", to: ROUTES.JOBS },
    { label: "About", to: ROUTES.ABOUT },
    { label: "Contact", to: ROUTES.CONTACT },
]

export function Navbar() {
    const { isAuthenticated, user, logOutUser, loading } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const isActive = (path: string) => {
        if (path === '/') return location.pathname === '/'
        return location.pathname.startsWith(path)
    }

    return (
        <>
            <header className="w-full border-b border-gray-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-16">
                    {/* LEFT: Logo */}
                    <div className="flex items-center gap-2">
                        <Logo />
                    </div>

                    {/* CENTER: Nav Links */}
                    <nav className="hidden md:flex items-center gap-1">
                        {navLinks.map(link => (
                            <Link
                                key={link.to}
                                to={link.to}
                                className={`relative px-4 py-5 text-sm font-medium transition-colors ${isActive(link.to)
                                        ? 'text-blue-600'
                                        : 'text-gray-600 hover:text-gray-900'
                                    }`}
                            >
                                {link.label}
                                {/* Active indicator bar */}
                                {isActive(link.to) && (
                                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-0.5 bg-blue-600 rounded-full" />
                                )}
                            </Link>
                        ))}
                    </nav>

                    {/* RIGHT: Auth */}
                    {isAuthenticated ?
                        <div>
                            <div
                                className='md:hidden text-blue-600 cursor-pointer'
                                onClick={() => setSidebarOpen(true)}
                            >
                                <PanelLeftOpen size={28} />
                            </div>
                            <div className='hidden md:flex items-center gap-3'>
                                <button
                                    disabled={loading}
                                    onClick={() => logOutUser()}
                                    className={`${loading ? 'bg-red-600/50' : 'bg-red-600 hover:bg-red-700'} inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-medium transition-colors cursor-pointer`}
                                >
                                    {loading && <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
                                    Log Out
                                </button>
                                <Link to={`/dashboard/${user?.role}`} className='relative group'>
                                    <img
                                        width={40}
                                        height={40}
                                        src="profile.png"
                                        alt="profile_pic"
                                        className="rounded-full ring-2 ring-gray-200 group-hover:ring-blue-400 transition-all"
                                    />
                                </Link>
                            </div>
                        </div>
                        :
                        <div>
                            <div
                                className='md:hidden text-blue-600 cursor-pointer'
                                onClick={() => setSidebarOpen(true)}
                            >
                                <PanelLeftOpen size={28} />
                            </div>
                            <div className='hidden md:flex items-center gap-3'>
                                <button
                                    onClick={() => navigate(ROUTES.LOGIN)}
                                    className="text-gray-700 border border-gray-300 px-4 py-2 rounded-lg hover:border-blue-600 hover:text-blue-600 transition-colors font-medium text-sm cursor-pointer"
                                >
                                    Login
                                </button>
                                <button
                                    onClick={() => navigate(ROUTES.REGISTER)}
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm cursor-pointer"
                                >
                                    Sign Up
                                </button>
                            </div>
                        </div>
                    }
                </div>
            </header>

            {/* Mobile Sidebar */}
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        </>
    )
}