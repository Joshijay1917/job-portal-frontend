import { useForm } from "react-hook-form"
import { InputField } from "../../../components/InputField"
import { useUser } from "../../../context/user.context"
import { useEffect, type Dispatch, type SetStateAction } from "react"
import { Loader } from "../../../components/Loader"
import type { CandidateForm } from "../../../types/context/user.context"

export function CandidateProfile({ editMode, setEditMode }: { editMode: boolean, setEditMode: Dispatch<SetStateAction<boolean>> }) {
  const { user, loading, getUser, updateUser } = useUser()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<CandidateForm>({
    defaultValues: user
  })

  const onSubmit = async (data: CandidateForm) => {
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
    <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-2xl space-y-5"
      >

        {/* Full Name */}
        <InputField
          label="Full Name"
          disabled={!editMode}
          register={register("fname", {
            required: "Full Name is required"
          })}
          error={errors.fname?.message}
        />

        {/* Email */}
        <InputField
          label="Email"
          disabled
          register={register("email", {
            required: "Email required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Invalid email"
            }
          })}
          error={errors.email?.message}
        />

        {/* Description */}
        <div>
          <label htmlFor="description" className="block mb-1 text-sm font-medium text-gray-700">Description</label>
          <textarea
            disabled={!editMode}
            {...register("description")}
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow disabled:opacity-60"
            rows={4}
          />
        </div>

        {/* Experience */}
        <InputField
          label="Experience (Years)"
          type="number"
          disabled={!editMode}
          register={register("experience_years", {
            valueAsNumber: true,
            min: { value: 0, message: "Cannot be negative" }
          })}
          error={errors.experience_years?.message}
        />

        {/* Expected Salary */}
        <div className="grid grid-cols-2 gap-4">
          <InputField
            label="Expected Salary Min"
            type="number"
            disabled={!editMode}
            register={register("expected_salary.min", {
              valueAsNumber: true
            })}
            error={errors.expected_salary?.min?.message}
          />

          <InputField
            label="Expected Salary Max"
            type="number"
            disabled={!editMode}
            register={register("expected_salary.max", {
              valueAsNumber: true
            })}
            error={errors.expected_salary?.max?.message}
          />
        </div>

        {/* Resume Upload */}
        {editMode && (
          <div>
            <label htmlFor="resume" className="block mb-1 text-sm font-medium text-gray-700">Resume</label>
            <input
              type="file"
              className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100"
            />
          </div>
        )}

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