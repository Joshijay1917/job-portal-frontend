export async function asyncRunner<T>(promise: Promise<T>): Promise<{ data: T | null, error: string | null }> {
    try {
        const data = await promise
        return { data, error: null }
    } catch (error) {
        return { data: null, error: error instanceof Error ? error.message : "Something went wrong" }
    }
}