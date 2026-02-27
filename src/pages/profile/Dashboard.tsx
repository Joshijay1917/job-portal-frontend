import { BadgeX, PencilLine } from 'lucide-react'
import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import CandidateProfile from './candidate/CandidateProfile'
import RecruiterProfile from './recruiter/RecruiterProfile'
import { CandidateRoute } from '../../components/routes/CandidateRoute'
import { RecruiterRoute } from '../../components/routes/RecruiterRoute'
import DashboardTabs from './DashboardTabs'
import { useAuth } from '../../context/auth.context'
import PostJob from './recruiter/PostJob'

function Dashboard() {
    const [EditMode, setEditMode] = useState<boolean>(false)
    const { user } = useAuth()

    return (
        <div className='p-10 px-30 min-h-screen'>
            <div className='w-full flex justify-between'>
                <div>
                    <h1 className='text-4xl mb-3 font-bold'>Profile</h1>
                    <p className='text-gray-500'>{user?.role.toLocaleUpperCase()}</p>
                    <p className='text-gray-500'>{user?.email}</p>
                </div>
                <div className='flex gap-2 h-1/2'>
                    <span className='flex bg-red-400 text-white p-3 rounded-xl gap-2'><BadgeX /></span>
                    <button onClick={() => setEditMode(!EditMode)} className='text-white bg-blue-600 hover:bg-gray-800 hover:cursor-pointer p-3 rounded-xl'><PencilLine /></button>
                </div>
            </div>

            <DashboardTabs />

            <Routes>
                <Route element={<CandidateRoute />}>
                    <Route path='/candidate/profile' element={<CandidateProfile EditMode={EditMode} setEditMode={setEditMode}/>}/>
                </Route>
                <Route element={<RecruiterRoute />}>
                    <Route path='/recruiter/profile' element={<RecruiterProfile EditMode={EditMode} setEditMode={setEditMode}/>}/>
                    <Route path='/recruiter/post-job' element={<PostJob />}/>
                </Route>
            </Routes>
        </div>
    )
}

export default Dashboard
