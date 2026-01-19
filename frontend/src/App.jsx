import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import HomePage from './pages/HomePage'
import PredictPage from './pages/PredictPage'
import InsightsPage from './pages/InsightsPage'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/predict" element={<PredictPage />} />
        <Route path="/insights" element={<InsightsPage />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
