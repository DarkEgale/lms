const STATS = [
  { value: '৫,০০০+', label: 'সফল শিক্ষার্থী' },
  { value: '৪.৮', label: 'গড় রেটিং' },
  { value: '৫০+', label: 'প্রজেক্টভিত্তিক কোর্স' },
]

function StatsStrip() {
  return (
    <section
      aria-label="দক্ষতার পরিসংখ্যান"
      className="grid grid-cols-1 gap-6 rounded-panel bg-brand px-6 py-8 text-center sm:grid-cols-3"
    >
      {STATS.map((stat) => (
        <div key={stat.label}>
          <p className="text-3xl font-bold text-brand-ink sm:text-4xl">{stat.value}</p>
          <p className="mt-1 text-sm text-brand-ink/80 sm:text-base">{stat.label}</p>
        </div>
      ))}
    </section>
  )
}

export default StatsStrip
