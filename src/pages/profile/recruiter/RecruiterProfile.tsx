import { useForm } from "react-hook-form"
import { InputField } from "../../../components/InputField"
import { useUser } from "../../../context/user.context"
import { useEffect, type Dispatch, type SetStateAction } from "react"
import { Loader } from "../../../components/Loader"
import type { RecruiterForm } from "../../../types/context/user.context"
import { categories } from "../../../utils/constants"

export function RecruiterProfile({ editMode, setEditMode }: { editMode: boolean, setEditMode: Dispatch<SetStateAction<boolean>> }) {
    const { user, loading, getUser, updateUser } = useUser()
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<RecruiterForm>({
        defaultValues: user
    })

    const onSubmit = async (data: RecruiterForm) => {
        const res = await updateUser(data)
        if (res) {
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

    return loading ? <Loader /> : (
        <div className="grid gap-10 md:px-10 px-4 bg-white py-10">
            <h1 className="text-xl md:text-3xl font-bold">Profile</h1>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-5"
            >

                {/* Company Name */}
                <InputField
                    label="Company Name"
                    disabled={!editMode}
                    register={register("cname", {
                        required: "Company name is required"
                    })}
                    error={errors.cname?.message}
                />

                {/* Owner Name */}
                <InputField
                    label="Owner Name"
                    disabled={!editMode}
                    register={register("owner", {
                        required: "Owner name is required"
                    })}
                    error={errors.owner?.message}
                />

                {/* Email (readonly) */}
                <InputField
                    label="Email"
                    disabled={!editMode}
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
                    disabled={!editMode}
                    register={register("company_website")}
                    error={errors.company_website?.message}
                />

                {/* Employee Size */}
                <div className="grid grid-cols-2 gap-4">
                    <InputField
                        label="Employees (Min)"
                        type="number"
                        disabled={!editMode}
                        register={register("employee_size.min", {
                            valueAsNumber: true
                        })}
                        error={errors.employee_size?.min?.message}
                    />

                    <InputField
                        label="Employees (Max)"
                        type="number"
                        disabled={!editMode}
                        register={register("employee_size.max", {
                            valueAsNumber: true
                        })}
                        error={errors.employee_size?.max?.message}
                    />
                </div>

                {/* Category */}
                <div>
                    <label htmlFor="category" className="block mb-1 font-medium">Category</label>
                    <select
                        id="category"
                        disabled={!editMode}
                        {...register("category", {
                            required: "Category is required"
                        })}
                        className={`w-full px-4 py-2 ${!editMode ? 'bg-gray-100' : 'bg-white'} border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none`}
                    >
                        <option value="">Select category</option>
                        {categories.map(cat => (
                            <option key={cat.slug} value={cat.name}>{cat.name}</option>
                        ))}
                    </select>
                    {errors.category && <p className="text-sm text-red-500 mt-1">{errors.category.message}</p>}
                </div>

                {/* Submit */}
                {editMode && (
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