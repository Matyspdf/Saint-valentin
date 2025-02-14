import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { motion } from 'framer-motion'
import Home from './components/Home'
import Question from './components/Question'
import Finale from './components/Finale'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-pink-100 to-pink-200 p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/question/:id" element={<Question />} />
          <Route path="/finale" element={<Finale />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
