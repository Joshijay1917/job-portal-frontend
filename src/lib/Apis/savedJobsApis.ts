import client from "../client";

export async function getAllSavedPosts() {
    const response = await client.get('/saved-jobs')
    return response.data;
}

export async function saveJobPost(jobPostId: string) {
    const response = await client.post('/saved-jobs', { jobPostId })
    return response.data;
}

export async function deleteSavedPost(jobPostId: string) {
    const response = await client.delete(`/saved-jobs/${jobPostId}`)
    return response.data;
}