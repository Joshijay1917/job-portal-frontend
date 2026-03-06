import { PencilLine } from 'lucide-react'
import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { CandidateProfile } from './candidate/CandidateProfile'
import { RecruiterProfile } from './recruiter/RecruiterProfile'
import { CandidateRoute } from '../../components/routes/CandidateRoute'
import { RecruiterRoute } from '../../components/routes/RecruiterRoute'
import { DashboardTabs } from './DashboardTabs'
import { PostJob } from './recruiter/PostJob'
import { PostedJobs } from './recruiter/PostedJobs'
import { Candidates } from './recruiter/Candidates'
import { Settings } from './recruiter/Settings'
import { Applications } from './candidate/Applications'
import { SavedJobs } from './candidate/SavedJobs'
import { CandidateSettings } from './candidate/CandidateSettings'
import { useAuth } from '../../hooks/useAuth'

export function Dashboard() {
    const [editMode, setEditMode] = useState<boolean>(false)
    const { user } = useAuth()

    return (
        <div className='p-4 md:p-10 bg-gray-100 md:px-30 min-h-screen'>
            {/* Profile Header */}
            <div className='w-full flex justify-between items-start'>
                <div className='flex gap-4 md:gap-5 items-center'>
                    <img className='w-16 h-16 md:w-24 md:h-24 rounded-full ring-2 ring-gray-200 object-cover' src="/profile.png" alt="profile_image" />
                    <div>
                        <h1 className='text-2xl md:text-4xl font-bold'>Profile</h1>
                        <div className='flex items-center gap-2 mt-1'>
                            <span className='text-xs font-medium bg-blue-50 text-blue-600 px-2.5 py-0.5 rounded-full'>{user?.role.toUpperCase()}</span>
                            <span className='text-sm text-gray-400'>•</span>
                            <p className='text-sm text-gray-500'>{user?.email}</p>
                        </div>
                    </div>
                </div>
                <button
                    onClick={() => setEditMode(!editMode)}
                    className={`p-2.5 md:p-3 rounded-xl transition-colors cursor-pointer ${editMode
                        ? 'bg-gray-800 text-white'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`}
                    title={editMode ? "Cancel editing" : "Edit profile"}
                >
                    <PencilLine size={18} />
                </button>
            </div>

            <DashboardTabs />

            <Routes>
                <Route element={<CandidateRoute />}>
                    <Route path='/candidate' element={<CandidateProfile editMode={editMode} setEditMode={setEditMode} />} />
                    <Route path='/candidate/applications' element={<Applications />} />
                    <Route path='/candidate/saved-jobs' element={<SavedJobs />} />
                    <Route path='/candidate/settings' element={<CandidateSettings />} />
                </Route>
                <Route element={<RecruiterRoute />}>
                    <Route path='/recruiter' element={<RecruiterProfile editMode={editMode} setEditMode={setEditMode} />} />
                    <Route path='/recruiter/post-job' element={<PostJob />} />
                    <Route path='/recruiter/jobs' element={<PostedJobs />} />
                    <Route path='/recruiter/candidates' element={<Candidates />} />
                    <Route path='/recruiter/settings' element={<Settings />} />
                </Route>
            </Routes>
        </div>
    )
}