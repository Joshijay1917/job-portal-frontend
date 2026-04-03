import { createContext, useCallback, useState, type ReactNode } from "react";
import toast from "react-hot-toast";
import { asyncRunner } from "../utils/asyncRunner";
import type { CandidateForm, RecruiterForm, userContextType } from "../types/context/user.context";
import type { Recruiter } from "../types/dashboard/recruiter";
import type { Candidate } from "../types/dashboard/candidate";
import { changeUserPassword, getUserDetails, updateDetails } from "../lib/apis";

export const userContext = createContext<userContextType | null>(null)

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<Recruiter | Candidate>()
    const [loading, setLoading] = useState(false)

    const getUser = useCallback(async () => {
        setLoading(true)
        const res = await asyncRunner(getUserDetails())
        if (!res || !res.data) {
            toast.error(res.error)
            setLoading(false)
            return;
        }

        setUser(res.data.data)
        setLoading(false)
    }, [])

    const updateUser = async (user: RecruiterForm | CandidateForm) => {
        setLoading(true)
        const res = await asyncRunner(updateDetails(user))

        if (!res || !res.data) {
            toast.error(res.error)
            setLoading(false)
            return null;
        }

        toast.success('Profile updated!')
        setLoading(false)
        return res.data.data
    }

    const changePassword = async (currentPass: string, newPass: string) => {
        setLoading(true)
        const res = await asyncRunner(changeUserPassword(currentPass, newPass))

        if (!res || !res.data) {
            toast.error(res.error)
            setLoading(false)
            return false;
        }

        toast.success("Password changed successfully")
        setLoading(false)

        return true
    }

    const values = {
        user,
        getUser,
        updateUser,
        changePassword,
        loading
    }
    return (
        <userContext.Provider value={values}>
            {children}
        </userContext.Provider>
    )
}