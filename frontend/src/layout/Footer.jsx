import Logo from '../components/common/Logo'

// Footer links point at existing routes; policy links stay as placeholders.
const COURSE_LINKS = [
  { label: 'ওয়েব ডেভেলপমেন্ট', to: '/search?cat=ওয়েব ডেভেলপমেন্ট' },
  { label: 'গ্রাফিক ডিজাইন', to: '/search?cat=গ্রাফিক ডিজাইন' },
  { label: 'ডিজিটাল মার্কেটিং', to: '/search?cat=ডিজিটাল মার্কেটিং' },
]

const PRODUCT_LINKS = [
  { label: 'ল্যাপটপ', to: '/search?cat=ল্যাপটপ' },
  { label: 'কম্পিউটার এক্সেসরিজ', to: '/search?cat=কম্পিউটার এক্সেসরিজ' },
]

const SUPPORT_LINKS = ['আমাদের সম্পর্কে', 'প্রশ্নোত্তর', 'রিফান্ড নীতি', 'গোপনীয়তা নীতি']

// lucide-react 1.x ships no brand icons, so socials stay text names (NOTES.md).
const SOCIALS = ['Facebook', 'YouTube', 'LinkedIn']

const HEADING = 'mb-3 text-sm font-semibold text-white'
const LINK = 'block py-1 text-sm text-white/70 transition hover:text-accent'

function Footer() {
  return (
    <footer className="mt-10 bg-footer text-white/70">
      <div className="mx-auto max-w-site px-4 py-10 sm:px-5">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5">
          <div className="text-white">
            <Logo />
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/70">
              কোর্স ও কম্পিউটার এক্সেসরিজ — দক্ষ হওয়ার ও এগিয়ে থাকার এক প্ল্যাটফর্ম।
            </p>
          </div>

          <nav aria-label="কোর্স লিংক">
            <h3 className={HEADING}>কোর্স</h3>
            {COURSE_LINKS.map((link) => (
              <Link key={link.label} to={link.to} className={LINK}>
                {link.label}
              </Link>
            ))}
          </nav>

          <nav aria-label="পণ্য লিংক">
            <h3 className={HEADING}>পণ্য</h3>
            {PRODUCT_LINKS.map((link) => (
              <Link key={link.label} to={link.to} className={LINK}>
                {link.label}
              </Link>
            ))}
          </nav>

          <nav aria-label="সাপোর্ট লিংক">
            <h3 className={HEADING}>সাপোর্ট</h3>
            {SUPPORT_LINKS.map((label) => (
              <a key={label} href="#" className={LINK}>
                {label}
              </a>
            ))}
          </nav>

          <div>
            <h3 className={HEADING}>যোগাযোগ</h3>
            <a href="mailto:support@dokkhota.com" className={LINK}>
              support@dokkhota.com
            </a>
            <a href="tel:+8801711234567" className={LINK}>
              ০১৭১১-২৩৪৫৬৭
            </a>
            <div className="mt-3 flex flex-wrap gap-4">
              {SOCIALS.map((name) => (
                <a key={name} href="#" className="text-sm text-white/70 transition hover:text-accent">
                  {name}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-6 text-center text-sm text-white/60">
          © ২০২৬ দক্ষতা। সর্বস্বত্ব সংরক্ষিত।
        </div>
      </div>
    </footer>
  )
}

export default Footer
