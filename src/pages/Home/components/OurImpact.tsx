export function OurImpact() {
    return (
        <section className="p-20 flex justify-around">
            <div className="max-w-6xl px-10">
                <h2 className="text-5xl font-bold mb-12">
                    Our Impact
                </h2>

                <div className='flex flex-col gap-4 text-3xl text-center'>
                    <p>10,000+ Jobs</p>
                    <p>5,000+ Companies</p>
                    <p>25,000+ Candidates</p>
                </div>
            </div>
            <div className="hidden md:inline bg-center bg-cover p-50 bg-[url('impact.png')]"></div>
        </section>
    )
}