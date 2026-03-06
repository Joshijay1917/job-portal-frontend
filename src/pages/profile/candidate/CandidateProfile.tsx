import { useForm } from "react-hook-form"
import { InputField } from "../../../components/InputField"
import { useUser } from "../../../context/user.context"
import { useEffect, type Dispatch, type SetStateAction } from "react"
import { Loader } from "../../../components/Loader"
import type { CandidateForm } from "../../../types/context/user.context"
import { File, FolderOpen, X } from "lucide-react"

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
    <div className="bg-white flex flex-col gap-5 lg:flex-row justify-between rounded-xl border border-gray-200 p-6 md:p-10">
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

      <div className="py-10 flex flex-col lg:flex-row gap-5 justify-between lg:w-1/2 lg:mx-10">
        <div className="w-full">
          <h2 className="text-lg font-medium text-gray-700 mb-3">Upload Resume</h2>
          <label className="bg-blue-50 border-2 flex flex-col items-center justify-center py-10 px-4 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-blue-400 hover:bg-blue-50/80 transition-colors">
            <FolderOpen className="w-10 h-10 text-blue-500 mb-2" />
            <p className="text-sm text-gray-600">Drop files here or</p>
            <span className="text-blue-600 font-medium text-sm mt-1">Browse</span>
            <p className="text-xs text-gray-400 mt-2">PDF, DOC, DOCX</p>
            <input type="file" accept=".pdf,.doc,.docx" className="hidden" />
          </label>
        </div>
        <div className="w-full">
          <h3 className="text-lg font-medium text-gray-400 mb-3">Recently uploaded</h3>
          <div className="flex items-center gap-2">
            <div className="flex justify-between w-full">
              <div className="flex gap-2">
                <File className="w-9 h-9 rounded-full bg-blue-50 p-2 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-gray-700">MyFile.pdf</p>
                  <p className="text-xs text-gray-400">2 mb</p>
                </div>
              </div>
              <X className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}