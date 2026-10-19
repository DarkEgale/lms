import HeroSlider from '../components/home/HeroSlider'
import ServicesSlider from '../components/home/ServicesSlider'
import FeaturedGrid from '../components/home/FeaturedGrid'
import CategoryRow from '../components/home/CategoryRow'
import WhySection from '../components/home/WhySection'
import StatsStrip from '../components/home/StatsStrip'
import Reviews from '../components/home/Reviews'
import { CATEGORIES } from '../data'

function Home() {
  return (
    <div className="space-y-12 pb-4">
      <HeroSlider />

      {/* Marketing headline (Phase 4) */}
      <section className="text-center">
        <h2 className="mx-auto max-w-4xl text-[clamp(26px,3.4vw,38px)] font-bold leading-snug text-ink">
          জব-মার্কেটে নিজেকে চাহিদাসম্পন্ন করে তুলুন- এখনই!
        </h2>
        <p className="mx-auto mt-3 max-w-[62ch] text-[18px] leading-relaxed text-muted">
          প্রতিযোগিতামূলক এই জব-মার্কেটে নিজের ক্যারিয়ারকে নিয়ে যান অনন্য উচ্চতায়। আপনার জন্য
          প্রয়োজনীয় সব ক্যাটাগরিই রয়েছে এখানে, কোর্স থেকে শুরু করে ল্যাপটপ, কিবোর্ড, মাউস ও
          হেডফোনসহ কম্পিউটার এক্সেসরিজ। বেছে নিন আপনার সবচেয়ে পছন্দেরটি।
        </p>
      </section>

      <ServicesSlider />
      <FeaturedGrid />

      {/* Five category rows (Phase 5) */}
      {CATEGORIES.map((category) => (
        <CategoryRow key={category} category={category} />
      ))}

      {/* Why / stats / reviews (Phase 6) */}
      <WhySection />
      <StatsStrip />
      <Reviews />
    </div>
  )
}

export default Home


