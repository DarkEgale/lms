import { Check } from 'lucide-react'

const BENEFITS = [
  'ফ্রি লাইভ সাপোর্ট ক্লাস',
  'ইন্ডাস্ট্রি-মানের কারিকুলাম',
  'সার্টিফিকেট ও জব সাপোর্ট',
]

// Left brand panel of the auth card; hidden below md (guide: below 860px).
function BrandPanel() {
  return (
    <div className="hidden flex-col justify-center gap-6 bg-brand p-10 text-brand-ink md:flex">
      <h2 className="text-[28px] font-bold leading-snug">
        দক্ষতায় আপনার নতুন যাত্রা শুরু করুন
      </h2>
      <ul className="space-y-4">
        {BENEFITS.map((benefit) => (
          <li key={benefit} className="flex items-center gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/15">
              <Check size={16} aria-hidden="true" />
            </span>
            <span className="text-sm text-brand-ink/90">{benefit}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default BrandPanel
