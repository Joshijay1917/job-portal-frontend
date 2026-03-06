import { useForm } from "react-hook-form"
import type { PostJobType } from "../../../types/dashboard/recruiter"
import { InputField } from "../../../components/InputField"
import { categories, JobType } from "../../../utils/constants"
import { Loader } from "../../../components/Loader"
import { useState } from "react"
import { asyncRunner } from "../../../utils/asyncRunner"
import toast from "react-hot-toast"
import { postJob } from "../../../lib/apis"

export function PostJob() {
    const [loading, setLoading] = useState(false)
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<PostJobType>()

    const onSubmit = async (data: PostJobType) => {
        const formattedData = {
            ...data,
            responsibilities: data.responsibilities
                ? data.responsibilities.toString().split("\n")
                : [],
            skills: data.skills
                ? data.skills.toString().split("\n")
                : []
        }

        setLoading(true)
        const res = await asyncRunner(postJob(formattedData))

        if (!res || !res.data) {
            toast.error(res.error)
            setLoading(false)
            return
        }

        toast.success('Job post created successfully!')
        setLoading(false)
    }

    return loading ? <Loader /> : (
        <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-10">
            <h2 className="text-xl md:text-2xl font-bold mb-6">Post a New Job</h2>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6 max-w-3xl mx-auto"
            >
                {/* Title */}
                <InputField
                    label="Job Title"
                    register={register("title", {
                        required: "Job title is required"
                    })}
                    error={errors.title?.message}
                />

                {/* Description */}
                <div>
                    <label htmlFor="description" className="block mb-1 font-medium">
                        Job Description
                    </label>
                    <textarea
                        id="description"
                        {...register("description", {
                            required: "Description is required"
                        })}
                        className="w-full bg-white shadow-sm border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow"
                        rows={4}
                    />
                    <p className="text-red-500 text-sm">
                        {errors.description?.message}
                    </p>
                </div>

                {/* Responsibilities */}
                <div>
                    <label htmlFor="responsibilities" className="block mb-1 text-sm font-medium text-gray-700">
                        Responsibilities (one per line)
                    </label>
                    <textarea
                        id="responsibilities"
                        {...register("responsibilities")}
                        className="w-full bg-white shadow-sm border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow"
                        rows={4}
                    />
                </div>

                {/* Skills */}
                <div>
                    <label htmlFor="skills" className="block mb-1 text-sm font-medium text-gray-700">
                        Skills (one per line)
                    </label>
                    <textarea
                        id="skills"
                        {...register("skills")}
                        className="w-full bg-white shadow-sm border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow"
                        rows={4}
                    />
                </div>

                {/* Experience */}
                <div className="grid grid-cols-2 gap-4">
                    <InputField
                        label="Experience Min (Years)"
                        type="number"
                        register={register("experience_required.min", {
                            valueAsNumber: true
                        })}
                    />

                    <InputField
                        label="Experience Max (Years)"
                        type="number"
                        register={register("experience_required.max", {
                            valueAsNumber: true
                        })}
                    />
                </div>

                {/* Salary */}
                <div className="grid grid-cols-2 gap-4">
                    <InputField
                        label="Salary Min"
                        type="number"
                        register={register("salary.min", {
                            required: "Salary min required",
                            valueAsNumber: true
                        })}
                        error={errors.salary?.min?.message}
                    />

                    <InputField
                        label="Salary Max"
                        type="number"
                        register={register("salary.max", {
                            required: "Salary max required",
                            valueAsNumber: true
                        })}
                        error={errors.salary?.max?.message}
                    />
                </div>

                {/* Category */}
                <div>
                    <label htmlFor="category" className="block mb-1 text-sm font-medium text-gray-700">
                        Category
                    </label>
                    <select
                        id="category"
                        {...register("category", {
                            required: "Category is required"
                        })}
                        className="w-full bg-white shadow-sm border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow"
                    >
                        <option value="">Select category</option>
                        {categories.map(cat => (
                            <option key={cat.slug} value={cat.name}>{cat.name}</option>
                        ))}
                    </select>
                    {errors.category && <p className="text-sm text-red-500 mt-1">{errors.category.message}</p>}
                </div>

                {/* Job Type */}
                <div>
                    <label htmlFor="type" className="block mb-1 text-sm font-medium text-gray-700">
                        Job Type
                    </label>
                    <select
                        id="type"
                        {...register("type", {
                            required: "Job type required"
                        })}
                        className="w-full bg-white shadow-sm border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow"
                    >
                        <option value="">Select type</option>
                        {Array.from([JobType.fulltime, JobType.parttime]).map(type => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                    {errors.type && <p className="text-sm text-red-500 mt-1">{errors.type.message}</p>}
                </div>

                {/* Location */}
                <InputField
                    label="Location"
                    register={register("location")}
                />

                {/* Submit */}
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-8 py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm cursor-pointer"
                >
                    Post Job
                </button>
            </form>
        </div>
    )
}