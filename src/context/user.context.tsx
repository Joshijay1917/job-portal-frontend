import { createContext, useContext, useState, type ReactNode } from "react";
import type { CandidateForm, RecruiterForm, userContextType } from "../types/context/user.context";
import type { Recruiter } from "../types/dashboard/recruiter";
import type { Candidate } from "../types/dashboard/candidate";
import { useAsync } from "../hooks/useAsync";
import { getUserDetails, updateDetails } from "../services/userService";
import toast from "react-hot-toast";

const userContext = createContext<userContextType | null>(null)

export const useUser = () => {
    const context = useContext(userContext)

    if (!context) {
        throw Error("User context must be wrapped inside userContext!")
    }

    return context
}

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const { run, loading, error } = useAsync()
    const [user, setUser] = useState<Recruiter | Candidate>()

    const getUser = async () => {
        const res = await run(getUserDetails())
        if (!res) return;

        setUser(res.data.data)
    }

    const updateUser = async (user: RecruiterForm | CandidateForm) => {
        const res = await run(updateDetails(user))

        if (!res) return false;

        toast.success('Profile updated!')
        return true
    }

    const values = {
        user,
        getUser,
        updateUser,
        loading,
        error
    }
    return (
        <userContext.Provider value={values}>
            {children}
        </userContext.Provider>
    )
}