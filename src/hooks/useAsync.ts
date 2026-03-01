import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { logger } from "../utils/logger";

export const useAsync = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const run = async <T>(promise: Promise<T>): Promise<T | null> => {
    try {
      setLoading(true);
      setError(null);
      const data = await promise;
      return data;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const message =
          err?.response?.data?.message || // backend message
          err?.response?.data?.error || // alternative backend key
          err?.message || // axios message
          "Something went wrong";

        logger.error("ERROR:", message);
        toast.error(message)

        setError(message);
      } else if (err instanceof Error) {
        logger.error(err.message)
        toast.error(err.message)
      } else {
        logger.error("Unexpected error:", err)
        toast.error("Something went wrong")
      }
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { run, loading, error };
};
