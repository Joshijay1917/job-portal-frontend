import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { LoginFormValues, RegisterFormValues, User } from "../types/auth";
import type { AuthContextType } from "../types/context/auth.context";
import { useAsync } from "../hooks/useAsync";
import { logIn, register, userDetails } from "../services/authService";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext<AuthContextType | null>(null)

export const useAuth = () => {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const { run, loading, error } = useAsync()
    const navigate = useNavigate()
    const [user, setUser] = useState<User | null>(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    const loginUser = async (data: LoginFormValues) => {
        const result = await run(logIn(data))

        if(!result) {
            // toast.error('Failed to login user!')
            return;
        }
        const payload = result.data.data
        console.log(payload)

        localStorage.setItem("accessToken", payload.accessToken)
        setUser(payload.user)
        setIsAuthenticated(true)
        navigate('/')
    }

    const registerUser = async (data: RegisterFormValues) => {
        const result = await run(register(data))

        if(!result) {
            // toast.error('Failed to register user!')
            return;
        }

        navigate('/login')
    }

    const restoreSession = async () => {
        setIsAuthenticated(false)
        const state = localStorage.getItem('authstate')
        if (state === 'Done') {
            setIsAuthenticated(true)
        }
        console.log('REFRESH SESSION!!!!!!!')
        const res = await run(userDetails())
        if(!res) {
            setIsAuthenticated(false)
            // toast.error("User session expired!")
            localStorage.setItem('authstate', 'Not Verified!')
            return
        }
        const user = res.data.data
        setUser(user)
        setIsAuthenticated(true)
        localStorage.setItem('authstate', 'Done')
    }

    useEffect(() => {
        restoreSession()
    }, [])

    const values = {
        user,
        isAuthenticated,
        loginUser,
        registerUser,
        loading,
        error
    }

    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    )
}