import { useForm } from "react-hook-form"
import InputField from "../../../components/InputField"
import { useUser } from "../../../context/user.context"
import { useEffect, type Dispatch, type SetStateAction } from "react"
import Loader from "../../../components/Loader"
import type { RecruiterForm } from "../../../types/context/user.context"

export const categories = [{ name: "Software Developer", slug: 'softwaredeveloper' },
{ name: "UI/UX", slug: 'uiux' },
{ name: "Data Science", slug: 'datascience' },
{ name: "Mobile Dev", slug: 'mobiledev' },
{ name: "AI/ML", slug: 'aiml' },
{ name: "Internships", slug: 'internships' },
{ name: "Remote Jobs", slug: 'remotejobs' }]

function RecruiterProfile({ EditMode, setEditMode }: { EditMode: boolean, setEditMode: Dispatch<SetStateAction<boolean>> }) {
    const { user, loading, getUser, updateUser } = useUser()
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<RecruiterForm>({
        defaultValues: user
    })

    const onSubmit = async(data: RecruiterForm) => {
        console.log("Submitted:", data)
        const res = await updateUser(data)
        if(res) {
            setEditMode(false)
        }
    }

    useEffect(() => {
        getUser()
    }, [])

    useEffect(() => {
        if (user) {
            reset(user)
        }
    }, [user, reset])

    console.log(user)

    return loading ? <Loader /> : (
        <div className="grid grid-cols-3 gap-10 px-10">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="col-span-2 space-y-5"
            >

                {/* Company Name */}
                <InputField
                    label="Company Name"
                    disabled={!EditMode}
                    register={register("cname", {
                        required: "Company name is required"
                    })}
                    error={errors.cname?.message}
                />

                {/* Owner Name */}
                <InputField
                    label="Owner Name"
                    disabled={!EditMode}
                    register={register("owner", {
                        required: "Owner name is required"
                    })}
                    error={errors.owner?.message}
                />

                {/* Email (readonly) */}
                <InputField
                    label="Email"
                    disabled={!EditMode}
                    register={register("email", {
                        required: "Email required",
                        pattern: {
                            value: /^\S+@\S+$/i,
                            message: "Invalid email"
                        }
                    })}
                    error={errors.email?.message}
                />

                {/* Company Website */}
                <InputField
                    label="Company Website"
                    disabled={!EditMode}
                    register={register("company_website")}
                    error={errors.company_website?.message}
                />

                {/* Employee Size */}
                <div className="grid grid-cols-2 gap-4">
                    <InputField
                        label="Employees (Min)"
                        type="number"
                        disabled={!EditMode}
                        register={register("employee_size.min", {
                            valueAsNumber: true
                        })}
                        error={errors.employee_size?.min?.message}
                    />

                    <InputField
                        label="Employees (Max)"
                        type="number"
                        disabled={!EditMode}
                        register={register("employee_size.max", {
                            valueAsNumber: true
                        })}
                        error={errors.employee_size?.max?.message}
                    />
                </div>

                {/* Category */}
                <div>
                    <label className="block mb-1 font-medium">Category</label>
                    <select
                        disabled={!EditMode}
                        {...register("category")}
                        className="w-full px-4 py-2 bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                        <option value="">Select category</option>
                        {categories.map(cat => (
                            <option value={cat.name}>{cat.name}</option>
                        ))}
                    </select>
                </div>

                {/* Submit */}
                {EditMode && (
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition"
                    >
                        Save Changes
                    </button>
                )}
            </form>
        </div>
    )
}

export default RecruiterProfile