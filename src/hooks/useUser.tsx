import { useContext } from "react"
import { userContext } from "../context/user.context"

export const useUser = () => {
    const context = useContext(userContext)

    if (!context) {
        throw Error("User context must be wrapped inside userContext!")
    }

    return context
}