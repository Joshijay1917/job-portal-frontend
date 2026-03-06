import './App.css'
import { Outlet, Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home/Home'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { Jobs } from './pages/jobs/Jobs'
import { JobDetail } from './pages/jobs/JobDetail'
import { Login } from './pages/auth/Login'
import { SignUp } from './pages/auth/SignUp'
import { AuthProvider } from './context/auth.context'
import { Dashboard } from './pages/profile/Dashboard'
import ProtectedRoute from './components/routes/ProtectedRoute'
import { UserProvider } from './context/user.context'
import { Toaster } from 'react-hot-toast'
import { NotFound } from './components/NotFound'
import { About } from './pages/about/About'
import { Contact } from './pages/contact/Contact'
import { Privacy } from './pages/privacy/Privacy'
import { Terms } from './pages/terms/Terms'
import { JobsProvider } from './context/jobs.context'

function App() {

  return (
    <AuthProvider>
      <UserProvider>
        <JobsProvider>
          <Toaster position='bottom-right' />
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />

            <Route element={<AppLayout />}>
              <Route path='/' element={<Home />} />
              <Route path='/jobs' element={<Jobs />} />
              <Route path='/jobs/:id' element={<JobDetail />} />
              <Route path='/about' element={<About />} />
              <Route path='/contact' element={<Contact />} />
              <Route path='/privacy' element={<Privacy />} />
              <Route path='/terms' element={<Terms />} />

              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard/*" element={<Dashboard />} />
              </Route>

            </Route>

            <Route path='*' element={<NotFound />} />
          </Routes>
        </JobsProvider>
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
