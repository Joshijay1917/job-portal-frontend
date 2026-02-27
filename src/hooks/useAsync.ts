import { useState } from "react";
import toast from "react-hot-toast";

export const useAsync = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const run = async <T>(promise: Promise<T>): Promise<T | null> => {
    try {
      setLoading(true);
      setError(null);
      const data = await promise;
      return data;
    } catch (err: any) {
      const message =
        err?.response?.data?.message || // backend message
        err?.response?.data?.error || // alternative backend key
        err?.message || // axios message
        "Something went wrong";

      console.log("ERROR:", message);
      toast.error(message)

      setError(message);

      return null;
    } finally {
      setLoading(false);
    }
  };

  return { run, loading, error };
};
