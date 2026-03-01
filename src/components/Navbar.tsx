import { useState } from 'react'
import { PanelLeftOpen } from 'lucide-react'
import { useAuth } from '../context/auth.context'
import { Logo } from './Logo'
import { Link, useNavigate } from 'react-router-dom'
import { ROUTES } from '../Routes'
import Sidebar from './Sidebar'

export function Navbar() {
    const { isAuthenticated, user, logOutUser } = useAuth()
    const navigate = useNavigate()
    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <>
            <header className="w-full border-b border-gray-300 bg-white/10 backdrop-blur-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-16">
                    {/* LEFT: Logo */}
                    <div className="flex items-center gap-2">
                        <Logo />
                    </div>

                    {/* RIGHT */}
                    <div className="hidden md:flex items-center gap-4">
                        <Link to={ROUTES.HOME}>Home</Link>
                        <Link to={ROUTES.JOBS}>Browse Jobs</Link>
                    </div>

                    {isAuthenticated ?
                        <div>
                            <div
                                className='md:hidden text-blue-600 cursor-pointer'
                                onClick={() => setSidebarOpen(true)}
                            >
                                <PanelLeftOpen size={35} />
                            </div>
                            <div className='hidden md:flex gap-4'>
                                <button
                                    onClick={() => logOutUser()}
                                    className="bg-red-600 h-fit px-4 py-2 my-2 rounded-lg text-white hover:bg-red-700 font-medium"
                                >
                                    LogOut
                                </button>
                                <Link to={`/dashboard/${user?.role}`} className='relative'>
                                    <img width={60} height={60} src="profile.png" alt="profile_pic" />
                                </Link>
                            </div>
                        </div>
                        :
                        <div>
                            <div
                                className='md:hidden text-blue-600 cursor-pointer'
                                onClick={() => setSidebarOpen(true)}
                            >
                                <PanelLeftOpen size={35} />
                            </div>
                            <div className='hidden md:flex gap-4'>
                                <button
                                    onClick={() => navigate(ROUTES.LOGIN)}
                                    className="text-gray-700 border border-blue-600 px-4 py-2 rounded-lg hover:text-white hover:bg-blue-600 font-medium"
                                >
                                    Login
                                </button>
                                <button
                                    onClick={() => navigate(ROUTES.REGISTER)}
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-gray-800"
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