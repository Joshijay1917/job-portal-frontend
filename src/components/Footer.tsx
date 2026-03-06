import { Github, Linkedin, Twitter } from 'lucide-react'
import { Logo } from './Logo'
import { Link } from 'react-router-dom'
import { ROUTES } from '../Routes'

export function Footer() {
    return (
        <footer className="bg-gray-800 text-gray-300 py-14">
            <div className="max-w-7xl text-center mx-auto px-6 grid md:grid-cols-3 gap-10">
                {/* LEFT */}
                <div className='flex flex-col items-center'>
                    <h2 className="text-white text-xl font-bold mb-3"><Logo /></h2>
                    <p className="text-sm text-gray-400">Find your dream job and grow your career with us.</p>
                </div>

                <div className="flex flex-col gap-3">
                    <h3 className="text-white font-semibold mb-2">Company</h3>
                    <Link to={ROUTES.ABOUT} className="hover:text-white">About</Link>
                    <Link to={ROUTES.CONTACT} className="hover:text-white">Contact</Link>
                    <Link to={ROUTES.PRIVACY} className="hover:text-white">Privacy Policy</Link>
                    <Link to={ROUTES.TERMS} className="hover:text-white">Terms</Link>
                </div>

                <div>
                    <h3 className="text-white font-semibold mb-3">Connect</h3>
                    <div className="flex justify-center gap-4 mb-4">
                        <Link to="#"><Linkedin /></Link>
                        <Link to="#"><Twitter /></Link>
                        <Link to="#"><Github /></Link>
                    </div>
                </div>
            </div>

            <div className="text-center text-gray-500 text-sm mt-10 border-t border-gray-800 pt-6">
                © {new Date().getFullYear()} JobPortal. All rights reserved.
            </div>
        </footer>
    )
}