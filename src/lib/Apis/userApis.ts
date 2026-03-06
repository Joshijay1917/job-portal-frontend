import type { CandidateForm, RecruiterForm } from "../../types/context/user.context";
import type { Status } from "../../types/hooks/useRecruiter";
import client from "../client";

export async function getUserDetails() {
    const response = await client.get('/user/details')
    return response.data;
}

export async function updateDetails(data: CandidateForm | RecruiterForm) {
    const response = await client.put('/user/edit', data)
    return response.data
}

export async function changeUserPassword(currentPass: string, newPass: string) {
    const response = await client.post('/user/change-password', { currentPass, newPass })
    return response.data
}

export async function getAllPosts() {
    const response = await client.get('/user/posts')
    return response.data
}

export async function getAppliedJobs() {
    const response = await client.get('/user/applied-posts')
    return response.data
}

export async function getAllApplicants() {
    const response = await client.get('/user/applications')
    return response.data
}

export async function getApplicationDetails(applicationId: string) {
    const response = await client.get(`/user/applications/${applicationId}`)
    return response.data
}

export async function updateAppStatus(appId: string, status: Status) {
    const response = await client.post(`/user/applications/update`, { appId, status })
    return response.data
}