import AnnouncementBar from './AnnouncementBar'
import Navbar from './Navbar'
import VerificationBanner from './VerificationBanner'
import HeroSection from './HeroSection'
import CategoryFilters from './CategoryFilters'
import OfferGrid from './OfferGrid'
import AIToast from './AIToast'

export default function UniDaysPanel() {
  return (
    <div className="h-full flex flex-col bg-[#0f1923] overflow-y-auto dark-scroll relative">
      <AnnouncementBar />
      <Navbar />
      <VerificationBanner />
      <HeroSection />
      <div className="border-t border-white/5">
        <CategoryFilters />
      </div>
      <OfferGrid />
      <AIToast />
    </div>
  )
}
