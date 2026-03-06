import type { PostJobType } from "../../types/dashboard/recruiter";
import type { FilterJobType } from "../../types/hooks/useJobs";
import client from "../client";

export async function postJob(data: PostJobType) {
    const response = await client.post('/job/post', data)
    return response.data;
}

export async function getAllJobPosts(page: number) {
    const response = await client.get(`/job?page=${page}`)
    return response.data
}

export async function getJobData(id: string) {
    const response = await client.get(`/job/details/${id}`)
    return response.data
}

export async function ApplyJobPost(candidateId: string, jobPostId: string) {
    const response = await client.post('/job/apply', { candidateId, jobPostId })
    return response.data
}

export async function FilterJobs(filters: FilterJobType, page: number) {
    const response = await client.post(`/job/filter?page=${page}`, filters)
    return response.data
}

export async function DeletePost(jobpostId: string) {
    const response = await client.delete(`/job/delete?jobpostId=${jobpostId}`)
    return response.data
}