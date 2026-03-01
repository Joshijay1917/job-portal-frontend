import type { LoginFormValues, RegisterFormValues, User } from "../types/auth";
import api from "./api";

export async function register(data: RegisterFormValues) {
    const response = await api.post('/auth/register', data)
    return response
}

export async function logIn(data:LoginFormValues) {
    const response = await api.post('/auth/login', data)
    return response
}

export async function verifyOtp(user: User, otp: string) {
    const response = await api.post('/email/verify', { userId: user.id, otp, role: user.role })
    return response
}

export async function logoutUser() {
    const response = await api.post('/auth/logout')
    return response
}

export async function userDetails() {
    const response = await api.get('/auth/me')
    return response
}

export async function refreshToken() {
    const response = await api.get('/auth/refresh')
    return response
}