import { useAuth } from '../context/auth.context'
import Logo from './Logo'
import { Link, useNavigate } from 'react-router-dom'

function Navbar() {
    const { isAuthenticated, user } = useAuth()
    const navigate = useNavigate()

    return (
        <header className="w-full border-b border-gray-300 bg-white/10 backdrop-blur-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-16">
                {/* LEFT: Logo */}
                <div className="flex items-center gap-2">
                    <Logo />
                </div>

                {/* RIGHT */}
                <div className="flex items-center gap-4">
                    <Link to={'/'}>Home</Link>
                    <Link to={'/jobs'}>Browse Jobs</Link>
                </div>

                {isAuthenticated ? 
                <Link to={`/dashboard/${user?.role}/profile`}>
                    <img width={60} height={60} src="profile.png" alt="" />
                </Link>
                :<div className='flex gap-4'>
                    <button
                        onClick={() => navigate('/login')}
                        className="text-gray-700 border border-blue-600 px-4 py-2 rounded-lg hover:text-white hover:bg-blue-600 font-medium"
                    >
                        Login
                    </button>

                    <button
                        onClick={() => navigate('/signup')}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-gray-800"
                    >
                        Sign Up
                    </button>
                </div>}
            </div>
        </header>
    )
}

export default Navbar
