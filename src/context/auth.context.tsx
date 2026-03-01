import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { LoginFormValues, RegisterFormValues, User } from "../types/auth";
import type { AuthContextType } from "../types/context/auth.context";
import { useAsync } from "../hooks/useAsync";
import { logIn, logoutUser, register, userDetails } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../Routes";
import { logger } from "../utils/logger";

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

        if (!result) return;

        const payload = result.data.data
        logger.log(payload)

        localStorage.setItem("accessToken", payload.accessToken)
        setUser(payload.user)
        setIsAuthenticated(true)
        navigate(ROUTES.HOME)
    }

    const registerUser = async (data: RegisterFormValues) => {
        const result = await run(register(data))

        if (!result) {
            return;
        }

        navigate(ROUTES.LOGIN)
    }

    const logOutUser = async () => {
        const res = await run(logoutUser())

        if (!res) return;

        setUser(null)
        setIsAuthenticated(false)
        localStorage.removeItem('accessToken')
    }

    const restoreSession = async () => {
        setIsAuthenticated(false)
        const res = await run(userDetails())
        if (!res) {
            setIsAuthenticated(false)
            return
        }
        const user = res.data.data
        setUser(user)
        setIsAuthenticated(true)
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