import { useParams, useNavigate } from 'react-router-dom'
import { Star, Check } from 'lucide-react'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import PriceTag from '../components/ui/PriceTag'
import { getItemBySlug } from '../data'
import { toBanglaDigits } from '../utils/format'

function Placeholder({ text }) {
  return <div className="py-16 text-center text-muted">{text}</div>
}

const OUTCOMES = [
  'প্রকল্প ভিত্তিক হাতে-কলমে শিখুন',
  'পোর্টফোলিও যোগ্য দক্ষতা অর্জন করুন',
  'জব ইন্টারভিউয়ের জন্য প্রস্তুতি পান',
  'কোর্স শেষে সার্টিফিকেট পান',
  'লাইফটাইম কোর্স কনটেন্ট অ্যাক্সেস',
  'বিশেষজ্ঞ শিক্ষকের তত্ত্বাবধানে শিখুন',
]

const CURRICULUM = [
  {
    title: 'মডিউল ১: ভিত্তি',
    items: ['কোর্সের ভূমিকা ও লক্ষ্য', 'পরিবেশ সেটআপ ও প্রয়োজনীয় টুলস', 'মূল নীতি ও পরিভাষা'],
  },
  {
    title: 'মডিউল ২: অনুশীলন',
    items: ['ডিজাইন ও বিন্যাস', 'ব্যবহারিক অ্যাসাইনমেন্ট', 'স্বয়ংক্রিয় সমস্যা সমাধান'],
  },
  {
    title: 'মডিউল ৩: উন্নত কৌশল',
    items: ['উন্নত ফিচার ও কৌশল', 'পারফরম্যান্স অপটিমাইজেশন', 'কোড কার্যকারিতা ও বেস্ট প্র্যাকটিস'],
  },
  {
    title: 'মডিউল ৪: চূড়ান্ত প্রকল্প',
    items: ['বাস্তব প্রযোজ্য প্রকল্প তৈরি', 'কোড রিভিউ ও সারসংক্ষেপ', 'প্রকল্প উপস্থাপনা ও ফিডব্যাক'],
  },
]

export default function Course() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const item = getItemBySlug(slug)

  if (!item) return <Placeholder text="এই কোর্সটি পাওয়া যায়নি" />

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-card border border-line" style={{ backgroundColor: item.color }}>
        <div className="p-6 sm:p-8">
          <Badge variant="course">কোর্স</Badge>
          <h1 className="mt-2 text-2xl sm:text-3xl font-bold text-ink">{item.nameBn}</h1>
          <p className="mt-3 text-sm sm:text-base text-muted leading-relaxed">{item.description}</p>
          <div className="mt-4 flex items-center gap-2 text-sm">
            <Star size={17} className="fill-accent text-accent" aria-hidden="true" />
            <span className="font-semibold">{item.rating}</span>
            <span className="text-muted">({toBanglaDigits(item.reviews)} রিভিউ)</span>
          </div>
        </div>
      </section>

      <div className="grid gap-8 lg:grid-cols-12">
        <main className="lg:col-span-8 space-y-8">
          <section>
            <h2 className="mb-4 text-xl font-bold text-ink">কোর্সে যা শিখবেন</h2>
            <ul className="grid grid-cols-2 gap-4 sm:gap-6">
              {OUTCOMES.map((outcome) => (
                <li key={outcome} className="flex items-start gap-2.5 text-sm text-muted">
                  <Check className="shrink-0 mt-0.5 text-accent" size={16} aria-hidden="true" />
                  <span>{outcome}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-bold text-ink">কোর্স কারিকুলাম</h2>
            {CURRICULUM.map((module, index) => (
              <details
                key={module.title}
                className="group border border-line rounded-card bg-surface"
                open={index === 0}
              >
                <summary
                  className="flex items-center justify-between gap-2 p-3 cursor-pointer list-none font-semibold text-ink hover:bg-hover"
                >
                  {module.title}
                </summary>
                <ul className="p-3 space-y-1 text-sm text-muted">
                  {module.items.map((lesson) => (
                    <li key={lesson} className="flex items-start gap-2">
                      <span className="shrink-0 mt-1 text-[10px] text-accent">-</span>
                      <span>{lesson}</span>
                    </li>
                  ))}
                </ul>
              </details>
            ))}
          </section>

          <section className="rounded-card border border-line bg-surface p-5">
            <div className="flex items-start gap-3">
              <div className="shrink-0 h-12 w-12 rounded-full bg-brand/10 flex items-center justify-center text-brand font-semibold">
                ড্যা
              </div>
              <div>
                <div className="font-semibold text-ink">দক্ষতা একাডেমি</div>
                <div className="text-xs text-muted">ইন্ডাস্ট্রি বিশেষজ্ঞ শিক্ষক</div>
              </div>
            </div>
            <p className="mt-3 text-sm text-muted leading-relaxed">
              à§§à§¦+ à¦¬à§‡à¦¶à¦¿ à¦¬à¦¾à¦¸à§à¦¤à¦¬ à¦…à¦­à¦¿à¦œà§à¦žà¦¤à¦¾ à¦¸à¦®à§à¦ªà¦¨à§à¦¨ à¦¶à¦¿à¦•à§à¦·à¦•à¥¤ à¦¬à¦¾à¦¸à§à¦¤à¦¬à¦®à§à¦–à§€ à¦¦à¦•à§à¦·à¦¤à¦¾ à¦¶à§‡à¦–à¦¾à¦¨à§‹à¦° à¦¦à§€à¦°à§à¦˜ à¦…à¦­à¦¿à¦œà§à¦žà¦¤à¦¾ à¦†à¦›à§‡à¥¤</p>

          </section>
        </main>

        <aside className="lg:col-span-4 sticky top-6 md:static">
          <div className="rounded-card border border-line bg-surface p-5 sm:p-6 space-y-5">
            <Badge variant="course">কোর্স</Badge>
            <h2 className="text-lg font-bold text-ink">{item.nameBn}</h2>
            <PriceTag price={item.price} oldPrice={item.oldPrice} size="md" />
            <Button variant="accent" size="lg" onClick={() => navigate(`/courses/${slug}/enroll`)} className="w-full">
              এনরোল করুন
            </Button>
            <h3 className="text-sm font-semibold text-ink">কোর্স সুবিধা</h3>
            <ul className="space-y-2.5 text-sm text-muted">
              {[
                '৪৮ ঘণ্টার রেকর্ডেড ভিডিও',
                'সাপ্তাহিক লাইভ সাপোর্ট ক্লাস',
                'সার্টিফিকেট',
                'লাইফটাইম অ্যাক্সেস',
                '৭ দিনের মানি-ব্যাক গ্যারান্টি',
              ].map((perk) => (
                <li key={perk} className="flex items-start gap-2">
                  <Check className="shrink-0 mt-0.5 text-accent" size={16} aria-hidden="true" />
                  <span>{perk}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  )
}
