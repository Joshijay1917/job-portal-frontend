import { useForm } from "react-hook-form"
import type { PostJobType } from "../../../types/dashboard/recruiter"
import { InputField } from "../../../components/InputField"
import { categories, JobType } from "../../../utils/constants"
import { useRecruiter } from "../../../hooks/useRecruiter"
import { Loader } from "../../../components/Loader"

export function PostJob() {
    const { postJob, loading, error } = useRecruiter()
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

        await postJob(formattedData)
    }

    return loading ? <Loader /> : error ? <span>{error}</span> : (
        <div className="md:p-10 p-4 bg-white">
            <h1 className="text-xl md:text-3xl font-bold mb-6">Post Job</h1>

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
                        className="w-full bg-white border border-gray-300 px-4 py-2"
                        rows={4}
                    />
                    <p className="text-red-500 text-sm">
                        {errors.description?.message}
                    </p>
                </div>

                {/* Responsibilities */}
                <div>
                    <label htmlFor="responsibilities" className="block mb-1 font-medium">
                        Responsibilities (one per line)
                    </label>
                    <textarea
                        id="responsibilities"
                        {...register("responsibilities")}
                        className="w-full bg-white border border-gray-300 px-4 py-2"
                        rows={4}
                    />
                </div>

                {/* Skills */}
                <div>
                    <label htmlFor="skills" className="block mb-1 font-medium">
                        Skills (one per line)
                    </label>
                    <textarea
                        id="skills"
                        {...register("skills")}
                        className="w-full bg-white border border-gray-300 px-4 py-2"
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
                    <label htmlFor="category" className="block mb-1 font-medium">
                        Category
                    </label>
                    <select
                        id="category"
                        {...register("category", {
                            required: "Category is required"
                        })}
                        className="w-full bg-white border border-gray-300 px-4 py-2"
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
                    <label htmlFor="type" className="block mb-1 font-medium">
                        Job Type
                    </label>
                    <select
                        id="type"
                        {...register("type", {
                            required: "Job type required"
                        })}
                        className="w-full bg-white border border-gray-300 px-4 py-2"
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
                    className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700"
                >
                    Post Job
                </button>
            </form>
        </div>
    )
}