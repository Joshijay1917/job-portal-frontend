import { useState } from "react"
import { Lock, Bell, Trash2, Eye, EyeOff } from "lucide-react"
import { useAuth } from "../../../context/auth.context"

export function Settings() {
    const { logOutUser } = useAuth()

    // Change Password
    const [passwords, setPasswords] = useState({ current: "", newPass: "", confirm: "" })
    const [showPasswords, setShowPasswords] = useState({ current: false, newPass: false, confirm: false })
    const [passwordError, setPasswordError] = useState<string | null>(null)

    // Notifications
    const [notifications, setNotifications] = useState({
        newApplications: true,
        shortlisted: true,
        jobExpiry: false,
    })

    // Delete Account
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
    const [deleteText, setDeleteText] = useState("")

    const handlePasswordChange = (e: React.FormEvent) => {
        e.preventDefault()
        setPasswordError(null)

        if (passwords.newPass.length < 6) {
            setPasswordError("Password must be at least 6 characters")
            return
        }

        if (passwords.newPass !== passwords.confirm) {
            setPasswordError("Passwords do not match")
            return
        }

        setPasswords({ current: "", newPass: "", confirm: "" })
    }

    const handleNotificationToggle = (key: keyof typeof notifications) => {
        setNotifications(prev => ({ ...prev, [key]: !prev[key] }))
    }

    const handleDeleteAccount = () => {
        if (deleteText !== "DELETE") return
        logOutUser()
    }

    return (
        <div className="md:p-10 space-y-8 bg-gray-100">

            {/* Change Password */}
            <div className="bg-white rounded-2xl p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                    <div className="bg-blue-100 p-2 rounded-full">
                        <Lock className="w-5 h-5 text-blue-600" />
                    </div>
                    <h2 className="text-xl font-bold">Change Password</h2>
                </div>

                <form onSubmit={handlePasswordChange} className="space-y-4 max-w-md">
                    {(["current", "newPass", "confirm"] as const).map((field) => (
                        <div key={field}>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                {field === "current" ? "Current Password" : field === "newPass" ? "New Password" : "Confirm New Password"}
                            </label>
                            <div className="relative">
                                <input
                                    type={showPasswords[field] ? "text" : "password"}
                                    value={passwords[field]}
                                    onChange={(e) => setPasswords(prev => ({ ...prev, [field]: e.target.value }))}
                                    required
                                    className="w-full px-4 py-2 pr-10 bg-white border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }))}
                                    className="absolute right-3 top-2.5 text-gray-400 cursor-pointer"
                                >
                                    {showPasswords[field] ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>
                    ))}

                    {passwordError && <p className="text-sm text-red-500">{passwordError}</p>}

                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer"
                    >
                        Update Password
                    </button>
                </form>
            </div>

            {/* Email Notifications */}
            <div className="bg-white rounded-2xl p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                    <div className="bg-blue-100 p-2 rounded-full">
                        <Bell className="w-5 h-5 text-blue-600" />
                    </div>
                    <h2 className="text-xl font-bold">Email Notifications</h2>
                </div>

                <div className="space-y-4 max-w-md">
                    {([
                        { key: "newApplications" as const, label: "New Applications", desc: "Get notified when a candidate applies to your job post" },
                        { key: "shortlisted" as const, label: "Shortlist Updates", desc: "Get notified when shortlisted candidates respond" },
                        { key: "jobExpiry" as const, label: "Job Post Expiry", desc: "Reminder when your job post is about to expire" },
                    ]).map(({ key, label, desc }) => (
                        <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                            <div>
                                <p className="font-medium text-sm">{label}</p>
                                <p className="text-xs text-gray-500">{desc}</p>
                            </div>
                            <button
                                onClick={() => handleNotificationToggle(key)}
                                className={`w-12 h-7 rounded-full transition-colors cursor-pointer relative ${notifications[key] ? "bg-blue-600" : "bg-gray-300"
                                    }`}
                            >
                                <div
                                    className={`w-5 h-5 bg-white rounded-full absolute top-1 transition-transform ${notifications[key] ? "translate-x-6" : "translate-x-1"
                                        }`}
                                />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Delete Account */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-red-200">
                <div className="flex items-center gap-3 mb-4">
                    <div className="bg-red-100 p-2 rounded-full">
                        <Trash2 className="w-5 h-5 text-red-600" />
                    </div>
                    <h2 className="text-xl font-bold text-red-600">Danger Zone</h2>
                </div>

                <p className="text-gray-600 text-sm mb-4">
                    Permanently delete your account and all associated data including job posts, candidate applications, and company profile. This action cannot be undone.
                </p>

                {!showDeleteConfirm ? (
                    <button
                        onClick={() => setShowDeleteConfirm(true)}
                        className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition cursor-pointer"
                    >
                        Delete Account
                    </button>
                ) : (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4 max-w-md space-y-3">
                        <p className="text-sm font-medium text-red-600">
                            Type <span className="font-bold">DELETE</span> to confirm
                        </p>
                        <input
                            type="text"
                            value={deleteText}
                            onChange={(e) => setDeleteText(e.target.value)}
                            placeholder="Type DELETE"
                            className="w-full px-4 py-2 border border-red-300 rounded-lg outline-none focus:ring-2 focus:ring-red-500"
                        />
                        <div className="flex gap-3">
                            <button
                                onClick={handleDeleteAccount}
                                disabled={deleteText !== "DELETE"}
                                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
                            >
                                Confirm Delete
                            </button>
                            <button
                                onClick={() => { setShowDeleteConfirm(false); setDeleteText(""); }}
                                className="border border-gray-300 px-6 py-2 rounded-lg hover:bg-gray-50 transition cursor-pointer"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}