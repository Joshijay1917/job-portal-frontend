import type { PostJobType } from "../types/dashboard/recruiter";
import type { FilterJobType } from "../types/hooks/useJobs";
import api from "./api";

export async function PostJob(data: PostJobType) {
    const response = await api.post('/job/post', data)
    return response;
}

export async function getAllJobPosts(page: number) {
    const response = await api.get(`/job?page=${page}`)
    return response
}

export async function getJobData(id: string) {
    const response = await api.post('/job/details', { id })
    return response
}

export async function ApplyJobPost(candidateId: string, jobPostId: string) {
    const response = await api.post('/job/apply', { candidateId, jobPostId })
    return response
}

export async function FilterJobs(filters: FilterJobType, page: number) {
    const response = await api.post(`/job/filter?page=${page}`, filters)
    return response
}

export async function DeletePost(jobpostId: string) {
    const response = await api.delete(`/job/delete?jobpostId=${jobpostId}`)
    return response
}