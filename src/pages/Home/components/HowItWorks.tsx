
export function HowItWorks() {
    return (
        <section className="py-20 bg-cover bg-left bg-[url('/howitwork.png')] text-white">
            <div className="max-w-6xl px-10">
                {/* Title */}
                <h2 className="text-3xl md:text-4xl font-bold mb-12">
                    How it works?
                </h2>

                <div className='flex flex-col gap-4'>
                    <div className='max-w-xl text-xl font-bold bg-white/20 flex rounded-2xl items-center gap-4'>
                        <div className='bg-white/50 p-5 rounded-xl'>
                            1
                        </div>
                        <p>
                            Create Profile
                        </p>
                    </div>
                    <div className='max-w-xl text-xl font-bold bg-white/20 flex rounded-2xl items-center gap-4'>
                        <div className='bg-white/50 p-5 rounded-xl'>
                            2
                        </div>
                        <p>
                            Upload Resume
                        </p>
                    </div>
                    <div className='max-w-xl text-xl font-bold bg-white/20 flex rounded-2xl items-center gap-4'>
                        <div className='bg-white/50 p-5 rounded-xl'>
                            3
                        </div>
                        <p>
                            Get Hired
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}