import { createContext, useContext, useState, type ReactNode } from "react";
import type { JobContext, JobListCardType } from "../types/context/Job.context";

const JobsContext = createContext<JobContext | undefined>(undefined)

export const useJobs = () => {
    const context = useContext(JobsContext);
    if (context === undefined) {
        throw new Error('useJobs must be used within an JobsProvider');
    }
    return context;
}

export const JobsContextProvider = ({ children }: { children: ReactNode }) => {
    const [jobs, setJobs] = useState<JobListCardType[]>([])

    const values = {
        jobs,
        setJobs
    }

    return (
        <JobsContext.Provider value={values}>
            {children}
        </JobsContext.Provider>
    )
}