import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import useQuizStore from '../store/quizStore';
import { useState } from 'react';

const Finale = () => {
  const navigate = useNavigate();
  const errors = useQuizStore((state) => state.errors);
  const resetErrors = useQuizStore((state) => state.resetErrors);
  const [showReward, setShowReward] = useState(false);

  const getMessage = () => {
    if (errors === 0) {
      return {
        title: "🌟 Félicitations mon amour ! 🌟",
        text: showReward 
          ? "Voici ton cadeau : un code de 15€ pour le Nintendo eShop ! Tu pourras t'acheter peut-être quelque chose ! Je t'aime ! 💝"
          : "Tu as répondu parfaitement à toutes les questions ! Tu as gagné une surprise spéciale ! Clique sur le bouton ci-dessous pour la découvrir ! 💝",
        emoji: showReward ? "🎮" : "🎯"
      };
    } else {
      return {
        title: "Oh non... 💔",
        text: "Tu as fait quelques erreurs dans le quiz... Du coup, tu as raté la surprise que j'avais préparée pour toi ! Mais ne t'inquiète pas, tu peux toujours réessayer ! 😊",
        emoji: "🎯"
      };
    }
  };

  const message = getMessage();

  const handleReplay = () => {
    resetErrors();
    setShowReward(false);
    navigate('/');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center min-h-screen p-4 text-center"
    >
      <motion.div
        animate={{ 
          rotate: [0, 10, -10, 10, 0],
          scale: [1, 1.1, 1, 1.1, 1]
        }}
        transition={{ duration: 2, repeat: Infinity }}
        className="mb-4 sm:mb-6"
      >
        <span className="text-5xl sm:text-7xl">{message.emoji}</span>
      </motion.div>

      <h1 className="text-2xl sm:text-4xl font-bold text-primary mb-4 sm:mb-6 px-2">
        {message.title}
      </h1>

      <div className="w-full max-w-sm sm:max-w-md mx-auto space-y-4 mb-6">
        <p className="text-base sm:text-lg text-gray-700 px-4">
          {message.text}
        </p>
        {errors === 0 && showReward && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mt-4 px-4"
          >
            <img 
              src="/nintendo-eshop-code.png" 
              alt="Code Nintendo eShop"
              className="rounded-lg shadow-lg mx-auto w-full max-w-xs object-contain"
              style={{ display: 'block' }}
            />
          </motion.div>
        )}
      </div>

      <motion.div
        className="space-y-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        {errors === 0 && !showReward && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-lg shadow-lg text-base sm:text-lg"
            onClick={() => setShowReward(true)}
          >
            Voir ma récompense 🎁
          </motion.button>
        )}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn block w-full sm:w-auto text-base sm:text-lg"
          onClick={handleReplay}
        >
          {errors > 0 ? "Réessayer 🔄" : "Recommencer 🎮"}
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default Finale;
