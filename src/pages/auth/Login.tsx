import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { Eye, EyeOff } from "lucide-react"
import type { LoginFormValues } from "../../types/auth"
import { ROUTES } from "../../Routes"
import { useAuth } from "../../hooks/useAuth"

export function Login() {
  const navigate = useNavigate()
  const { loginUser, loading, error, isAuthenticated } = useAuth()
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormValues>()

  const onSubmit = async (data: LoginFormValues) => {
    await loginUser(data)
  }

  useEffect(() => {
    if (isAuthenticated) {
      navigate(ROUTES.HOME)
    }
  }, [isAuthenticated, navigate])

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
            Welcome Back 👋
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                {...register("email", {
                  required: "Email is required",
                  minLength: {
                    value: 3,
                    message: "Minimum 3 characters required"
                  }
                })}
                className={`w-full h-11 px-4 border rounded-lg focus:outline-none focus:ring-2 transition
                  ${errors.email
                    ? "border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:ring-blue-200"
                  }`}
                placeholder="Enter your username"
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

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition flex justify-center items-center disabled:opacity-70"
            >
              {loading ? (
                <span className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                "Sign In"
              )}
            </button>
            {error && <div className="text-red-500 text-center">{error}</div>}
          </form>

          {/* Signup Link */}
          <p className="text-center text-gray-500 mt-6">
            Don't have an account?{" "}
            <Link
              to={ROUTES.REGISTER}
              className="text-blue-600 font-medium hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}