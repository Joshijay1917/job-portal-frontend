import { useState } from "react"
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import { Eye, EyeOff } from "lucide-react"
import { Role, type RegisterFormValues } from "../../types/auth.d"
import { useAuth } from "../../context/auth.context"

function Login() {
    const { registerUser, loading, error } = useAuth()
    const [showPassword, setShowPassword] = useState(false)

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm<RegisterFormValues>({ defaultValues: { "role": Role.Candidate }})

    const onSubmit = async (data: RegisterFormValues) => {
        await registerUser(data)
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-linear-to-br from-gray-100 to-gray-200 px-4">
            <div className="bg-white shadow-2xl rounded-2xl overflow-hidden max-w-4xl w-full flex">

                {/* Left Side Image */}
                <div className="hidden md:flex w-1/2 bg-blue-50 items-center justify-center p-10">
                    <img
                        src="https://www.mastersoftwaresolutions.com/wp-content/uploads/2019/06/bnr-1-1.png"
                        alt="Login Illustration"
                        className="max-h-80 object-contain"
                    />
                </div>

                {/* Right Side Form */}
                <div className="w-full md:w-1/2 p-10">
                    <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
                        Welcome to <p className="text-blue-600">JobPortal</p> 👋
                    </h1>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                        {/* Username */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                {watch('role') === 'recruiter' ? 'Owner name' : 'Full Name'}
                            </label>
                            <input
                                {...register(watch('role') === 'recruiter' ? "owner" : "fname", {
                                    required: "Name is required",
                                    minLength: {
                                        value: 3,
                                        message: "Minimum 3 characters required"
                                    }
                                })}
                                className={`w-full h-11 px-4 border rounded-lg focus:outline-none focus:ring-2 transition
                  ${errors.fname
                                        ? "border-red-500 focus:ring-red-200"
                                        : "border-gray-300 focus:ring-blue-200"
                                    }`}
                                placeholder="Enter your name"
                            />
                            {errors.fname && (
                                <p className="text-sm text-red-500 mt-1">
                                    {errors.fname.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email
                            </label>
                            <input
                                {...register("email", {required: "Email is required"})}
                                className={`w-full h-11 px-4 border rounded-lg focus:outline-none focus:ring-2 transition
                  ${errors.email
                                        ? "border-red-500 focus:ring-red-200"
                                        : "border-gray-300 focus:ring-blue-200"
                                    }`}
                                placeholder="Enter your email"
                            />
                            {errors.email && (
                                <p className="text-sm text-red-500 mt-1">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>

                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: {
                                            value: 6,
                                            message: "Minimum 6 characters required"
                                        }
                                    })}
                                    className={`w-full h-11 px-4 pr-12 border rounded-lg focus:outline-none focus:ring-2 transition
                    ${errors.password
                                            ? "border-red-500 focus:ring-red-200"
                                            : "border-gray-300 focus:ring-blue-200"
                                        }`}
                                    placeholder="Enter your password"
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(prev => !prev)}
                                    className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>

                            {errors.password && (
                                <p className="text-sm text-red-500 mt-1">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                I am...
                            </label>
                            <div className="flex gap-4">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        value="candidate"
                                        className="w-4 h-4 text-(--color-primary)"
                                        {...register('role', { required: true })}
                                    />
                                    <span>Candidate</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        value="recruiter"
                                        className="w-4 h-4 text-(--color-primary)"
                                        {...register('role', { required: true })}
                                    />
                                    <span>Recruiter</span>
                                </label>
                            </div>
                        </div>

                        {watch("role") === "recruiter" && <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Company Name
                            </label>
                            <input
                                {...register("cname", {required: "Company name is required"})}
                                className={`w-full h-11 px-4 border rounded-lg focus:outline-none focus:ring-2 transition
                  ${errors.email
                                        ? "border-red-500 focus:ring-red-200"
                                        : "border-gray-300 focus:ring-blue-200"
                                    }`}
                                placeholder="Enter your company name"
                            />
                            {errors.cname && (
                                <p className="text-sm text-red-500 mt-1">
                                    {errors.cname.message}
                                </p>
                            )}
                        </div>}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full h-11 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition flex justify-center items-center disabled:opacity-70"
                        >
                            {loading ? (
                                <span className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            ) : (
                                "Sign Up"
                            )}
                        </button>

                        {error && <div className="text-red-500 text-center">{error}</div>}
                    </form>

                    {/* Signup Link */}
                    <p className="text-center text-gray-500 mt-6">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="text-blue-600 font-medium hover:underline"
                        >
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login