import { Star } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import { REVIEWS } from '../../data/reviews'

function Reviews() {
  return (
    <section aria-label="আমাদের শিক্ষার্থীরা কী বলছেন">
      <SectionHeading
        as="h2"
        align="center"
        title="আমাদের শিক্ষার্থীরা কী বলছেন"
        titleClassName="text-[clamp(24px,3vw,32px)]"
        className="mb-8"
      />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {REVIEWS.map((review) => (
          <figure
            key={review.id}
            className="flex flex-col gap-3 rounded-card border border-line bg-surface p-5"
          >
            <span
              role="img"
              aria-label="৫ এর মধ্যে ৫ রেটিং"
              className="flex items-center gap-0.5"
            >
              {Array.from({ length: 5 }, (_, i) => (
                <Star key={i} size={16} className="fill-accent text-accent" aria-hidden="true" />
              ))}
            </span>
            <q className="flex-1 text-sm leading-relaxed text-ink">{review.text}</q>
            <figcaption className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-bold text-brand-ink"
              >
                {review.name.charAt(0)}
              </span>
              <span>
                <span className="block text-sm font-semibold text-ink">{review.name}</span>
                <span className="block text-xs text-muted">{review.course}</span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}

export default Reviews
