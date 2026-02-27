import type { LoginFormValues, RegisterFormValues, User } from "../types/auth";
import api from "./api";

export async function register(data: RegisterFormValues) {
    console.log('Data Sending:', data)
    const response = await api.post('/auth/register', data)
    console.log('Register response:', response)
    return response
}

export async function logIn(data:LoginFormValues) {
    const response = await api.post('/auth/login', data)
    console.log('Login Response:', response)
    return response
}

export async function verifyOtp(user: User, otp: string) {
    console.log('Send User:', user)
    const response = await api.post('/email/verify', { userId: user.id, otp, role: user.role })
    return response
}

export async function logoutUser(user: User) {
    const response = await api.post('/auth/logout', user)
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