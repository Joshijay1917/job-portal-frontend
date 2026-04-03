import { AxiosError } from "axios"
import toast from "react-hot-toast"

export async function asyncRunner<T>(promise: Promise<T>): Promise<{ data: T | null, error: string | null }> {
    try {
        const data = await promise
        return { data, error: null }
    } catch (error: any) {
        toast.error(error instanceof Error ? error.message : error?.response.data.message ? error?.response.data.message : "Something went wrong!")
        return { data: null, error: error instanceof AxiosError ? error?.response?.data.message : "Something went wrong!" }
    }
}