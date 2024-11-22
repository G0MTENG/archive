import { useState } from 'react'
import { MainPage, LoginPage } from './pages'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

export const App = () => {
  const [userId, setUserId] = useState<number | null>(null)

  return (
    <Router>
      <Routes>
        <Route path='/' element={<LoginPage setUserId={setUserId} />} />
        <Route path='/main' element={<MainPage userId={userId} />} />
      </Routes>
    </Router>
  )
}
