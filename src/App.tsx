import './App.css'
import { Outlet, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Jobs from './pages/Jobs'
import JobDetail from './pages/JobDetail'
import { JobsContextProvider } from './context/jobs.context'
import Login from './pages/Auth/Login'
import SignUp from './pages/Auth/SignUp'
import { AuthProvider } from './context/auth.context'
import Dashboard from './pages/profile/Dashboard'
import ProtectedRoute from './components/routes/ProtectedRoute'
import { UserProvider } from './context/user.context'
import { Toaster } from 'react-hot-toast'

function App() {

  return (
    <AuthProvider>
      <UserProvider>
        <JobsContextProvider>
          <Toaster position='bottom-right'/>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
            <Route element={<AppLayout />}>
              <Route path='/' element={<Home />} />
              <Route path='/jobs' element={<Jobs />} />
              <Route path='/jobs/:id' element={<JobDetail />} />

              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard/*" element={<Dashboard />} />
              </Route>

            </Route>
          </Routes>
        </JobsContextProvider>
      </UserProvider>
    </AuthProvider>
  )
}

function AppLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}

export default App
