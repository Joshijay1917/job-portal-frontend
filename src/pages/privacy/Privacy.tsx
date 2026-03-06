import { Shield, Eye, Lock, UserCheck, Bell, Trash2, Mail } from "lucide-react"

const sections = [
    {
        icon: Eye,
        title: "Information We Collect",
        points: [
            "Personal details such as name, email address, and phone number when you create an account.",
            "Professional information including resume, skills, experience, and education.",
            "Usage data such as pages visited, search queries, and interaction patterns.",
            "Device and browser information for security and optimization purposes."
        ]
    },
    {
        icon: Lock,
        title: "How We Use Your Data",
        points: [
            "To match you with relevant job opportunities based on your profile and preferences.",
            "To enable recruiters to discover and connect with qualified candidates.",
            "To improve our platform, features, and overall user experience.",
            "To send important notifications about your applications and account."
        ]
    },
    {
        icon: UserCheck,
        title: "Data Sharing",
        points: [
            "Your profile is shared with recruiters only when you apply to their job postings.",
            "We do not sell your personal data to third parties for marketing purposes.",
            "We may share anonymized, aggregated data for analytics and research.",
            "Law enforcement requests are handled in compliance with applicable laws."
        ]
    },
    {
        icon: Shield,
        title: "Data Security",
        points: [
            "All data is encrypted in transit using SSL/TLS protocols.",
            "Passwords are hashed and never stored in plain text.",
            "Regular security audits are conducted to protect against vulnerabilities.",
            "Access to personal data is restricted to authorized personnel only."
        ]
    },
    {
        icon: Bell,
        title: "Cookies & Tracking",
        points: [
            "We use essential cookies to keep you signed in and maintain your session.",
            "Analytics cookies help us understand how users interact with the platform.",
            "You can manage your cookie preferences through your browser settings.",
            "We do not use cookies for third-party advertising purposes."
        ]
    },
    {
        icon: Trash2,
        title: "Your Rights",
        points: [
            "You can access, update, or delete your personal data at any time from your profile settings.",
            "You may request a copy of all data we hold about you.",
            "You have the right to withdraw consent and deactivate your account.",
            "Deleted accounts are permanently removed from our systems within 30 days."
        ]
    },
]

export function Privacy() {
    return (
        <div>
            {/* Hero Section */}
            <section className="bg-gray-100 py-20 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Privacy <span className="text-blue-600">Policy</span>
                    </h1>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Your privacy matters to us. This policy explains how we collect, use, and protect your personal information.
                    </p>
                    <p className="text-gray-400 text-sm mt-4">
                        Last updated: February 28, 2026
                    </p>
                </div>
            </section>

            {/* Policy Sections */}
            <section className="py-16 bg-white px-6">
                <div className="max-w-4xl mx-auto flex flex-col gap-10">
                    {sections.map((section, index) => (
                        <div
                            key={section.title}
                            className="bg-gray-50 border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition"
                        >
                            <div className="flex items-center gap-4 mb-5">
                                <div className="bg-blue-100 p-3 rounded-full">
                                    <section.icon className="w-6 h-6 text-blue-600" />
                                </div>
                                <h2 className="text-xl font-bold">
                                    {index + 1}. {section.title}
                                </h2>
                            </div>
                            <ul className="flex flex-col gap-3 ml-4">
                                {section.points.map((point, i) => (
                                    <li key={i} className="flex items-start gap-3 text-gray-600">
                                        <span className="text-blue-600 mt-1.5 text-xs">●</span>
                                        {point}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-16 bg-gray-100 px-6">
                <div className="max-w-2xl mx-auto text-center">
                    <div className="flex justify-center mb-4">
                        <div className="bg-blue-100 p-4 rounded-full">
                            <Mail className="w-8 h-8 text-blue-600" />
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold mb-3">Questions About Privacy?</h2>
                    <p className="text-gray-600">
                        If you have any questions or concerns about our privacy practices, reach out to us at{" "}
                        <a href="mailto:privacy@jobportal.com" className="text-blue-600 font-medium hover:underline">
                            privacy@jobportal.com
                        </a>
                    </p>
                </div>
            </section>
        </div>
    )
}