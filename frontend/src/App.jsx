import { Routes, Route } from 'react-router-dom'
import MainLayout from './layout/MainLayout'
import UiKit from './pages/UiKit'

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route
          path="/"
          element={
            <div className="py-16 text-center text-muted">
              হোম পেজ — Phase 3 এ তৈরি হবে
            </div>
          }
        />
        <Route path="/ui-kit" element={<UiKit />} />
      </Route>
    </Routes>
  )
}

export default App
