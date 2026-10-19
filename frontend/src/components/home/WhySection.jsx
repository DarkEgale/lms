import { Award, CheckCircle2, Clock, ShieldCheck, Users } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'

const BENEFITS = [
  { icon: CheckCircle2, title: 'হাতে-কলমে প্রজেক্ট', text: 'প্রতিটি কোর্সে বাস্তব প্রজেক্ট করে আত্মবিশ্বাসী হয়ে উঠুন।' },
  { icon: Users, title: 'অভিজ্ঞ মেন্টর', text: 'ইন্ডাস্ট্রিতে কর্মরত অভিজ্ঞ মেন্টরদের কাছ থেকে শেখার সুযোগ।' },
  { icon: ShieldCheck, title: 'সার্টিফিকেট ও জব সাপোর্ট', text: 'কোর্স শেষে সার্টিফিকেট এবং ক্যারিয়ার সাপোর্ট সুবিধা।' },
  { icon: Clock, title: 'লাইফটাইম অ্যাক্সেস', text: 'একবার ভর্তি হলে কোর্স কনটেন্ট দেখুন আজীবন।' },
]

function WhySection() {
  return (
    <section aria-label="কেন দক্ষতাই সবার চেয়ে এগিয়ে">
      <SectionHeading
        as="h2"
        align="center"
        title="কেন দক্ষতাই সবার চেয়ে এগিয়ে?"
        titleClassName="text-[clamp(24px,3vw,32px)]"
        subtitle="শেখা, প্র্যাকটিস আর ক্যারিয়ার সাপোর্ট — সবকিছু এক ছাদের নিচে।"
        className="mb-8"
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {BENEFITS.map(({ icon: Icon, title, text }) => (
          <div
            key={title}
            className="rounded-card border border-line bg-surface p-5 transition hover:-translate-y-0.5 hover:shadow-[0_10px_26px_rgba(0,0,0,.12)]"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-card bg-brand/10 text-brand">
              <Icon size={24} aria-hidden="true" />
            </span>
            <h3 className="mt-4 font-semibold text-ink">{title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">{text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default WhySection
