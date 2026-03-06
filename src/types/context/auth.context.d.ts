import type { AuthResponse, LoginFormValues, RegisterFormValues, User } from "../auth"

type AuthContextType = {
    user: User | null
    isAuthenticated: boolean
    loginUser: (data: LoginFormValues) => Promise<void>
    registerUser: (data: RegisterFormValues) => Promise<void>
    logOutUser: () => Promise<void>
    loading: boolean
    error: string | null
}