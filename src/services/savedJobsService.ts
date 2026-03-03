import api from "./api";

export function getAllSavedPosts() {
    const response = api.get('/saved-jobs')
    return response;
}

export function saveJobPost(jobPostId: string) {
    const response = api.post('/saved-jobs', { jobPostId })
    return response;
}

export function deleteSavedPost(jobPostId: string) {
    const response = api.delete(`/saved-jobs/${jobPostId}`)
    return response;
}