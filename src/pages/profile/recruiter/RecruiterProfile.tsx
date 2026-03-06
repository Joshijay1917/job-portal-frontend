import { useForm } from "react-hook-form"
import { InputField } from "../../../components/InputField"
import { useEffect, type Dispatch, type SetStateAction } from "react"
import { Loader } from "../../../components/Loader"
import type { RecruiterForm } from "../../../types/context/user.context"
import { categories } from "../../../utils/constants"
import { useUser } from "../../../hooks/useUser"

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
        const fetchData = async () => {
            await getUser()
        }

        fetchData()
    }, [getUser])

    useEffect(() => {
        if (user) {
            reset(user)
        }
    }, [user, reset])

    return loading ? <Loader /> : (
        <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-10">
            <h2 className="text-xl md:text-2xl font-bold mb-6">Company Profile</h2>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="max-w-2xl space-y-5"
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
                    <label htmlFor="category" className="block mb-1 text-sm font-medium text-gray-700">Category</label>
                    <select
                        id="category"
                        disabled={!editMode}
                        {...register("category", {
                            required: "Category is required"
                        })}
                        className={`w-full px-4 py-2.5 ${!editMode ? 'bg-gray-50' : 'bg-white'} border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow disabled:opacity-60`}
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
                        className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm cursor-pointer"
                    >
                        Save Changes
                    </button>
                )}
            </form>
        </div>
    )
}