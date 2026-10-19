import { Routes, Route } from 'react-router-dom'
import MainLayout from './layout/MainLayout'
import UiKit from './pages/UiKit'
import Home from './pages/Home'
import Search from './pages/Search'

const Placeholder = ({ text }) => <div className="py-16 text-center text-muted">{text}</div>

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/login" element={<Placeholder text="লগইন — Phase 9 এ তৈরি হবে" />} />
        <Route path="/register" element={<Placeholder text="রেজিস্ট্রেশন — Phase 9 এ তৈরি হবে" />} />
        <Route path="/ui-kit" element={<UiKit />} />
      </Route>
    </Routes>
  )
}

export default App
