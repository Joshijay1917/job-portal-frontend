import { useState } from "react"
import { Mail, Phone, MapPin, Send, MessageSquare } from "lucide-react"

const contactInfo = [
    {
        icon: Mail,
        title: "Email Us",
        detail: "support@jobportal.com",
        description: "We'll respond within 24 hours"
    },
    {
        icon: Phone,
        title: "Call Us",
        detail: "+91 98765 43210",
        description: "Mon - Fri, 9AM to 6PM IST"
    },
    {
        icon: MapPin,
        title: "Visit Us",
        detail: "Mumbai, India",
        description: "Our headquarters"
    },
]

export function Contact() {
    const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" })
    const [submitted, setSubmitted] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setSubmitted(true)
        setForm({ name: "", email: "", subject: "", message: "" })
    }

    return (
        <div>
            {/* Hero Section */}
            <section className="bg-gray-100 py-20 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Get In <span className="text-blue-600">Touch</span>
                    </h1>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Have a question, feedback, or need help? We'd love to hear from you.
                    </p>
                </div>
            </section>

            {/* Contact Info Cards */}
            <section className="py-16 bg-white">
                <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
                    {contactInfo.map((item) => (
                        <div
                            key={item.title}
                            className="bg-gray-50 border border-gray-200 rounded-2xl p-8 text-center hover:shadow-lg transition"
                        >
                            <div className="flex justify-center mb-4">
                                <div className="bg-blue-100 p-4 rounded-full">
                                    <item.icon className="w-8 h-8 text-blue-600" />
                                </div>
                            </div>
                            <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                            <p className="text-blue-600 font-medium mb-1">{item.detail}</p>
                            <p className="text-gray-500 text-sm">{item.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Contact Form */}
            <section className="py-20 bg-gray-100 px-6">
                <div className="max-w-2xl mx-auto">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Send Us a Message
                        </h2>
                        <p className="text-gray-600">Fill out the form below and we'll get back to you shortly.</p>
                    </div>

                    {submitted ? (
                        <div className="bg-white border border-gray-200 rounded-2xl p-10 text-center">
                            <div className="flex justify-center mb-4">
                                <div className="bg-green-100 p-4 rounded-full">
                                    <MessageSquare className="w-10 h-10 text-green-600" />
                                </div>
                            </div>
                            <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                            <p className="text-gray-600 mb-6">Thank you for reaching out. We'll get back to you within 24 hours.</p>
                            <button
                                onClick={() => setSubmitted(false)}
                                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition cursor-pointer"
                            >
                                Send Another Message
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-2xl p-8 flex flex-col gap-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-medium text-gray-700">Your Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        required
                                        placeholder="John Doe"
                                        className="border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-600 transition"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-medium text-gray-700">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        required
                                        placeholder="john@example.com"
                                        className="border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-600 transition"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-gray-700">Subject</label>
                                <input
                                    type="text"
                                    name="subject"
                                    value={form.subject}
                                    onChange={handleChange}
                                    required
                                    placeholder="How can we help?"
                                    className="border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-600 transition"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-gray-700">Message</label>
                                <textarea
                                    name="message"
                                    value={form.message}
                                    onChange={handleChange}
                                    required
                                    rows={5}
                                    placeholder="Write your message here..."
                                    className="border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-600 transition resize-none"
                                />
                            </div>

                            <button
                                type="submit"
                                className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition cursor-pointer"
                            >
                                <Send className="w-5 h-5" />
                                Send Message
                            </button>
                        </form>
                    )}
                </div>
            </section>
        </div>
    )
}