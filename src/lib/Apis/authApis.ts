import type { LoginFormValues, RegisterFormValues, User } from "../../types/auth";
import client from "../client";

export async function register(data: RegisterFormValues) {
    const response = await client.post('/auth/register', data)
    return response.data
}

export async function logIn(data: LoginFormValues) {
    const response = await client.post('/auth/login', data)
    return response.data
}

export async function verifyOtp(user: User, otp: string) {
    const response = await client.post('/email/verify', { userId: user.id, otp, role: user.role })
    return response.data
}

export async function logoutUser() {
    const response = await client.post('/auth/logout')
    return response.data
}

export async function userDetails() {
    const response = await client.get('/auth/me')
    return response.data
}

export async function refreshToken() {
    const response = await client.get('/auth/refresh')
    return response.data
}