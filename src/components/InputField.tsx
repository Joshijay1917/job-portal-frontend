type InputProps = {
  label: string
  disabled?: boolean
  value?: string
  register: any
  type?: string
  error?: string
}

export default function InputField({ label, disabled = false, value, register, type = "text", error }: InputProps) {
  return (
    <div className="flex w-full justify-between">
      <label className="font-medium">{label}</label>
      <input
        type={type}
        disabled={disabled}
        value={value}
        {...register}
        className="w-1/2 px-4 py-2 bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
      />
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  )
}