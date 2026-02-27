import type { CandidateForm, RecruiterForm } from "../types/context/user.context";
import api from "./api";

export async function getUserDetails() {
    const response = await api.get('/user/details')
    return response;
}

export async function updateDetails(data: CandidateForm | RecruiterForm) {
    const response = await api.put('/user/edit', data)
    return response
}

export async function getAllPosts() {
    const response = await api.get('/user/posts')
    return response
}

export async function getAppliedJobs() {
    const response = await api.get('/user/applied-posts')
    return response
}

export async function getAllApplicants(recruiterId: string) {
    const response = await api.get(`/user/applications?recruiterId=${recruiterId}`)
    return response
}

export async function getApplicationDetails(applicationId: string) {
    const response = await api.get(`/user/applications/${applicationId}`)
    return response
}

export async function updateAppStatus(appId: string, status: string) {
    const response = await api.post(`/user/applications/update`, { appId, status })
    return response
}