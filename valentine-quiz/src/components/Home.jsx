import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const Home = () => {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh] text-center">
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="mb-8"
      >
        <span className="text-6xl">🐸</span>
      </motion.div>
      
      <h1 className="text-4xl font-bold text-primary mb-6">
        Quiz Spécial Saint-Valentin
      </h1>
      
      <p className="text-lg text-gray-700 mb-8 max-w-md">
        Prête pour un petit jeu amusant ? Je t'ai préparé 5 questions ! 💕
      </p>

      <button
        className="btn"
        onClick={() => navigate('/question/1')}
      >
        Commencer l'aventure ! 🎮
      </button>
    </div>
  )
}

export default Home
