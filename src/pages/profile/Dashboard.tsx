import { BadgeX, PencilLine } from 'lucide-react'
import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { CandidateProfile } from './candidate/CandidateProfile'
import { RecruiterProfile } from './recruiter/RecruiterProfile'
import { CandidateRoute } from '../../components/routes/CandidateRoute'
import { RecruiterRoute } from '../../components/routes/RecruiterRoute'
import { DashboardTabs } from './DashboardTabs'
import { useAuth } from '../../context/auth.context'
import { PostJob } from './recruiter/PostJob'
import { PostedJobs } from './recruiter/PostedJobs'
import { Candidates } from './recruiter/Candidates'
import { Settings } from './recruiter/Settings'
import { Applications } from './candidate/Applications'
import { SavedJobs } from './candidate/SavedJobs'
import { CandidateSettings } from './candidate/CandidateSettings'

export function Dashboard() {
    const [editMode, setEditMode] = useState<boolean>(false)
    const { user } = useAuth()

    return (
        <div className='p-4 md:p-10 bg-gray-100 md:px-30 min-h-screen'>
            <div className='w-full flex justify-between'>
                <div className='flex gap-5'>
                    <img className='w-[70px] h-[70px] md:w-[100px] md:h-[100px] rounded-full' src="/profile.png" alt="profile_image" />
                    <div>
                        <h1 className='text-2xl md:text-4xl md:mb-3 font-bold'>Profile</h1>
                        <p className='text-sm md:text-base text-gray-500'>{user?.role.toLocaleUpperCase()}</p>
                        <p className='text-sm md:text-base text-gray-500'>{user?.email}</p>
                    </div>
                </div>
                <div className='flex gap-2 h-fit md:h-1/2'>
                    <span className='flex bg-red-400 text-white p-2 md:p-3 rounded-xl gap-2'><BadgeX /></span>
                    <button onClick={() => setEditMode(!editMode)} className='text-white bg-blue-600 hover:bg-gray-800 hover:cursor-pointer p-2 md:p-3 rounded-xl'><PencilLine /></button>
                </div>
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