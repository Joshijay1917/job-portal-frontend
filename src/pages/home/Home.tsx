import { HeroSection } from './components/HeroSection'
import { BrowseCategories } from './components/BrowseCategories'
import { LatestJobs } from './components/LatestJobs'
import { WhySection } from './components/WhySection'
import { HowItWorks } from './components/HowItWorks'
import { OurImpact } from './components/OurImpact'

export function Home() {

    return (
        <>
            <HeroSection />
            <BrowseCategories />
            <LatestJobs />
            <WhySection />
            <HowItWorks />
            <OurImpact />
        </>
    )
}