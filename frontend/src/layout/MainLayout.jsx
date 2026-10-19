import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-bg text-ink">
      <Header />
      <main className="mx-auto w-full max-w-site flex-1 px-4 pt-6 sm:px-5">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout
