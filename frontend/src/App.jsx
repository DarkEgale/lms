import { Routes, Route } from 'react-router-dom'
import MainLayout from './layout/MainLayout'
import UiKit from './pages/UiKit'
import Home from './pages/Home'
import Search from './pages/Search'
import Login from './pages/Login'
import Product from './pages/Product'
import Course from './pages/Course'
import Enroll from './pages/Enroll'

const Placeholder = ({ text }) => <div className="py-16 text-center text-muted">{text}</div>

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Login />} />
        <Route path="/products/:slug" element={<Product />} />
        <Route path="/courses/:slug" element={<Course />} />
        <Route path="/courses/:slug/enroll" element={<Enroll />} />
        <Route path="/checkout" element={<Placeholder text="চেকআউট — পরের ধাপে তৈরি হবে" />} />
        <Route path="/ui-kit" element={<UiKit />} />
      </Route>
    </Routes>
  )
}

export default App
