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

  return loading ? <Loader /> : (
    <div className="grid md:grid-cols-3 gap-10 px-4 md:px-10 bg-white py-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="col-span-2 space-y-5"
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
          <label htmlFor="description" className="block mb-1 font-medium">Description</label>
          <textarea
            disabled={!editMode}
            {...register("description")}
            className="w-full px-4 py-2 bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
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
            <label htmlFor="resume" className="block mb-1 font-medium">Resume</label>
            <input
              type="file"
              className={`w-full px-4 py-2 ${!editMode ? 'bg-gray-100' : 'bg-white'} border border-gray-300`}
            />
          </div>
        )}

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