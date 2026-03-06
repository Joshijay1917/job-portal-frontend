import { FileText, UserCheck, Briefcase, AlertTriangle, Scale, Ban, RefreshCw, Mail } from "lucide-react"

const sections = [
    {
        icon: FileText,
        title: "Acceptance of Terms",
        points: [
            "By accessing or using JobPortal, you agree to be bound by these Terms of Service.",
            "If you do not agree to these terms, you may not use our platform.",
            "We reserve the right to update these terms at any time. Continued use after changes constitutes acceptance.",
            "Users must be at least 18 years old to create an account."
        ]
    },
    {
        icon: UserCheck,
        title: "User Accounts",
        points: [
            "You are responsible for maintaining the confidentiality of your account credentials.",
            "All information provided during registration must be accurate and up to date.",
            "You may not create multiple accounts or share your account with others.",
            "We reserve the right to suspend or terminate accounts that violate our policies."
        ]
    },
    {
        icon: Briefcase,
        title: "Job Postings & Applications",
        points: [
            "Recruiters must ensure all job postings are legitimate and accurately represent the opportunity.",
            "Candidates must provide truthful information in their profiles and applications.",
            "JobPortal does not guarantee employment or hiring outcomes for any user.",
            "We reserve the right to remove job postings that violate our guidelines or applicable laws."
        ]
    },
    {
        icon: Ban,
        title: "Prohibited Conduct",
        points: [
            "Posting fraudulent, misleading, or discriminatory job listings is strictly prohibited.",
            "Scraping, data mining, or automated access to the platform without permission is not allowed.",
            "Harassment, spam, or abusive behavior towards other users will result in account termination.",
            "Impersonating another person or organization is a violation of these terms."
        ]
    },
    {
        icon: Scale,
        title: "Intellectual Property",
        points: [
            "All content on JobPortal, including logos, design, and code, is our intellectual property.",
            "Users retain ownership of the content they submit, such as resumes and profiles.",
            "By posting content, you grant us a non-exclusive license to display it on the platform.",
            "You may not reproduce or distribute platform content without written permission."
        ]
    },
    {
        icon: AlertTriangle,
        title: "Limitation of Liability",
        points: [
            "JobPortal is provided \"as is\" without warranties of any kind, express or implied.",
            "We are not liable for any damages arising from your use of the platform.",
            "We do not verify the accuracy of recruiter or candidate information beyond basic checks.",
            "Users are responsible for conducting their own due diligence on job opportunities."
        ]
    },
    {
        icon: RefreshCw,
        title: "Termination & Changes",
        points: [
            "You may deactivate your account at any time through your profile settings.",
            "We may terminate or restrict access for users who violate these terms.",
            "Upon termination, your data will be handled according to our Privacy Policy.",
            "We may modify platform features, pricing, or availability at our discretion."
        ]
    },
]

export function Terms() {
    return (
        <div>
            {/* Hero Section */}
            <section className="bg-gray-100 py-20 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Terms of <span className="text-blue-600">Service</span>
                    </h1>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Please read these terms carefully before using JobPortal. By using our platform, you agree to the following terms and conditions.
                    </p>
                    <p className="text-gray-400 text-sm mt-4">
                        Last updated: February 28, 2026
                    </p>
                </div>
            </section>

            {/* Terms Sections */}
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
                    <h2 className="text-2xl font-bold mb-3">Questions About These Terms?</h2>
                    <p className="text-gray-600">
                        If you have any questions regarding our Terms of Service, contact us at{" "}
                        <a href="mailto:legal@jobportal.com" className="text-blue-600 font-medium hover:underline">
                            legal@jobportal.com
                        </a>
                    </p>
                </div>
            </section>
        </div>
    )
}