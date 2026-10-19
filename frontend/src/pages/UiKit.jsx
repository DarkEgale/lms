// Temporary Phase 1 showcase route. Removed in Phase 13.
import Logo from '../components/common/Logo'
import Slider from '../components/common/Slider'
import Button from '../components/ui/Button'
import Field from '../components/ui/Field'
import Select from '../components/ui/Select'
import Badge from '../components/ui/Badge'
import Rating from '../components/ui/Rating'
import PriceTag from '../components/ui/PriceTag'
import QtyStepper from '../components/ui/QtyStepper'
import SectionHeading from '../components/ui/SectionHeading'
import { useState } from 'react'

function UiKit() {
  const [text, setText] = useState('')
  const [password, setPassword] = useState('')
  const [select, setSelect] = useState('')
  const [qty, setQty] = useState(1)

  return (
    <div className="space-y-10 py-8">
      <SectionHeading title="UI কিট (Temporary)" subtitle="Phase 1 shared components" />

      <section>
        <SectionHeading as="h3" title="Button" className="mb-3" />
        <div className="flex flex-wrap gap-3">
          <Button>Primary</Button>
          <Button variant="accent">Accent</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="link">Link</Button>
          <Button size="lg">Large 48px</Button>
          <Button disabled>Disabled</Button>
        </div>
      </section>

      <section className="grid max-w-xl gap-4">
        <SectionHeading as="h3" title="Field / Select" />
        <Field
          label="ইমেইল"
          placeholder="you@example.com"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Field
          type="password"
          label="পাসওয়ার্ড"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error="পাসওয়ার্ড কমপক্ষে ৮ অক্ষর হতে হবে"
        />
        <Select
          label="জেলা"
          placeholder="জেলা নির্বাচন করুন"
          value={select}
          onChange={(e) => setSelect(e.target.value)}
          options={['ঢাকা', 'চট্টগ্রাম', 'রাজশাহী']}
        />
      </section>

      <section>
        <SectionHeading as="h3" title="Badge / Rating / PriceTag / QtyStepper" className="mb-3" />
        <div className="flex flex-wrap items-center gap-4">
          <Badge variant="product">পণ্য</Badge>
          <Badge variant="course">কোর্স</Badge>
          <Badge variant="best">সেরা বিক্রিত</Badge>
          <Rating value={4.8} count={1200} />
          <PriceTag price={65000} oldPrice={72000} />
          <PriceTag price={4900} oldPrice={6500} size="lg" />
          <QtyStepper value={qty} onChange={setQty} />
        </div>
      </section>

      <section>
        <SectionHeading as="h3" title="Slider" className="mb-3" />
        <Slider ariaLabel="ডেমো স্লাইডার">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div
              key={n}
              className="flex h-40 w-[260px] shrink-0 snap-start items-center justify-center rounded-card bg-brand/10 font-semibold text-brand"
            >
              স্লাইড {n}
            </div>
          ))}
        </Slider>
      </section>

      <section>
        <SectionHeading as="h3" title="Logo" />
        <Logo />
      </section>
    </div>
  )
}

export default UiKit
