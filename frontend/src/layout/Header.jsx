import { useNavigate } from 'react-router-dom'
import { ShoppingCart } from 'lucide-react'
import Logo from '../components/common/Logo'
import CategoryMenu from '../components/common/CategoryMenu'
import SearchBox from '../components/common/SearchBox'
import Button from '../components/ui/Button'
import { useCart } from '../context/CartContext'
import { toBanglaDigits } from '../utils/format'

const FOCUS =
  'focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg'

function Header() {
  const { count } = useCart()
  const navigate = useNavigate()

  return (
    <header
      className="sticky top-0 z-40 border-b border-line bg-surface"
      style={{ paddingTop: 'env(safe-area-inset-top)' }}
    >
      <div className="mx-auto flex max-w-site flex-wrap items-center gap-x-5 gap-y-3 px-4 py-3 sm:px-5">
        <Logo className="order-1" />

        {/* Mobile: wraps to its own full-width row; md: center column. */}
        <div className="order-3 flex w-full items-center gap-3 md:order-2 md:w-auto md:flex-1 md:justify-center">
          <CategoryMenu />
          <SearchBox className="max-w-[460px]" />
        </div>

        <div className="order-2 ml-auto flex items-center gap-3 md:order-3 md:ml-0">
          <button
            type="button"
            onClick={() => navigate('/checkout')}
            aria-label={`কার্ট দেখুন (${toBanglaDigits(count)}টি আইটেম)`}
            className={`relative flex h-11 w-11 items-center justify-center rounded-btn text-ink hover:bg-hover ${FOCUS}`}
          >
            <ShoppingCart size={22} aria-hidden="true" />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-[20px] items-center justify-center rounded-pill bg-accent px-1 text-[11px] font-bold text-footer">
                {toBanglaDigits(count)}
              </span>
            )}
          </button>
          <Button to="/login">লগইন</Button>
        </div>
      </div>
    </header>
  )
}

export default Header
