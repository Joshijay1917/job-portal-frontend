import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { LoginFormValues, RegisterFormValues, User } from "../types/auth";
import type { AuthContextType } from "../types/context/auth.context";
import { logIn, logoutUser, register, userDetails } from "../lib/Apis/authApis";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../Routes";
import { asyncRunner } from "../utils/asyncRunner";
import toast from "react-hot-toast";

const AuthContext = createContext<AuthContextType | null>(null)

export const useAuth = () => {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const navigate = useNavigate()
    const [user, setUser] = useState<User | null>(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    const loginUser = async (data: LoginFormValues) => {
        setLoading(true)
        const result = await asyncRunner(logIn(data))

        if (!result || !result.data) {
            setError(result.error)
            setLoading(false)
            return;
        }

        const payload = result.data.data

        localStorage.setItem("accessToken", payload.accessToken)
        setUser(payload.user)
        setIsAuthenticated(true)
        navigate(ROUTES.HOME)
        setLoading(false)
    }

    const registerUser = async (data: RegisterFormValues) => {
        setLoading(true)
        const result = await asyncRunner(register(data))

        if (!result || !result.data) {
            setError(result.error)
            setLoading(false)
            return;
        }

        toast.success("User registered successfully")
        navigate(ROUTES.LOGIN)
        setLoading(false)
    }

    const logOutUser = async () => {
        setLoading(true)
        const res = await asyncRunner(logoutUser())

        if (!res || !res.data) {
            toast.error(res.error)
            setLoading(false)
            return;
        }

        setUser(null)
        setIsAuthenticated(false)
        localStorage.removeItem('accessToken')
        setLoading(false)
    }

    const restoreSession = async () => {
        setIsAuthenticated(false)
        try {
            const res = await userDetails()
            if (!res) {
                setIsAuthenticated(false)
                return
            }
            const user = res.data
            setUser(user)
            setIsAuthenticated(true)
        } catch (error) {
            setIsAuthenticated(false)
        }
    }

    useEffect(() => {
        restoreSession()
    }, [])

    const values = {
        user,
        isAuthenticated,
        loginUser,
        registerUser,
        logOutUser,
        loading,
        error
    }

    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    )
}