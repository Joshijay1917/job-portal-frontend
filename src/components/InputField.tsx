import type { UseFormRegisterReturn } from 'react-hook-form'

interface InputFieldProps {
  label: string
  disabled?: boolean
  value?: string
  register: UseFormRegisterReturn
  type?: string
  error?: string
}

export function InputField({ label, disabled = false, value, register, type = "text", error }: InputFieldProps) {
  return (
    <div className="flex flex-col md:flex-row w-full justify-between">
      <div className="w-full flex justify-between">

        <label htmlFor={register.name} className="font-medium">{label}</label>
        <input
          id={register.name}
          type={type}
          disabled={disabled}
          value={value}
          {...register}
          className={`w-1/2 px-4 py-2 ${disabled ? 'bg-gray-100' : 'bg-white'} border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none`}
        />
      </div>
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  )
}