import { Link } from 'react-router-dom'
import Slider from '../common/Slider'
import { SERVICES } from '../../data/services'
import { getImage } from '../../utils/image'

// 300x300 cards: colored image panel (176px) + name + count line.
function ServicesSlider() {
  return (
    <Slider ariaLabel="সার্ভিস স্লাইডার" autoplay={3000} loop>
      {SERVICES.map((service) => (
        <Link
          key={service.id}
          to={service.to}
          className="flex h-[300px] w-[300px] shrink-0 snap-start flex-col overflow-hidden rounded-card border border-line bg-surface transition hover:-translate-y-0.5 hover:shadow-[0_10px_26px_rgba(0,0,0,.12)]"
        >
          <div className="h-[176px] shrink-0 overflow-hidden" style={{ backgroundColor: service.color }}>
            <img
              src={getImage(service.seed, 600, 360)}
              width={600}
              height={360}
              loading="lazy"
              alt={`${service.name} ডেমো ছবি`}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-1 flex-col justify-center p-4">
            <h3 className="text-[19px] font-semibold text-ink">{service.name}</h3>
            <p className="mt-1 text-sm text-muted">{service.count}</p>
          </div>
        </Link>
      ))}
    </Slider>
  )
}

export default ServicesSlider
