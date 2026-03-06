import { UserPlus, FileUp, PartyPopper } from "lucide-react"

const steps = [
    { num: 1, label: "Create Profile", icon: <UserPlus size={22} /> },
    { num: 2, label: "Upload Resume", icon: <FileUp size={22} /> },
    { num: 3, label: "Get Hired", icon: <PartyPopper size={22} /> },
]

export function HowItWorks() {
    return (
        <section className="py-20 bg-cover bg-left bg-[url('/howitwork.png')] text-white">
            <div className="max-w-6xl mx-auto px-10">
                {/* Title */}
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    How it works?
                </h2>
                <p className="text-white/70 mb-12 text-lg">Three simple steps to land your dream job</p>

                <div className='flex flex-col md:flex-row gap-4'>
                    {steps.map(step => (
                        <div key={step.num} className='flex-1 bg-white/10 backdrop-blur-sm border border-white/20 flex rounded-2xl items-center gap-4 p-2 hover:bg-white/20 transition-colors duration-200'>
                            <div className='bg-white/20 p-4 rounded-xl flex items-center justify-center min-w-[56px]'>
                                <span className="text-xl font-bold">{step.num}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                {step.icon}
                                <p className='text-lg font-bold'>{step.label}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}