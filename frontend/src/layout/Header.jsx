// Phase 1 stub. Replaced by the real navbar in Phase 2.
import Logo from '../components/common/Logo'

function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-surface">
      <div className="mx-auto flex h-16 max-w-site items-center justify-between gap-5 px-4 sm:px-5">
        <Logo />
        <span className="text-sm text-muted">Navbar (Phase 2)</span>
      </div>
    </header>
  )
}

export default Header
