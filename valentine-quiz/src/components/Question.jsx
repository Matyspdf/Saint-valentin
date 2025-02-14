import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import useQuizStore from '../store/quizStore';

const questions = [
  {
    id: 1,
    question: "Quelle a été notre première sortie ensemble ?",
    options: [
      "Au cinéma",
      "Au restaurant",
      "Une balade au parc",
      "En boite de nuit"
    ],
    correctAnswer: 1,
    emoji: "🌳"
  },
  {
    id: 2,
    question: "Quel est mon plat préféré ?",
    options: [
      "La tartiflette",
      "Le poulet curry de mamie",
      "Les pizzas",
      "Steak haché pomme de terre rissolées"
    ],
    correctAnswer: 3,
    emoji: "🍝"
  },
  {
    id: 3,
    question: "Quelle est notre série qu'on a fumée ensemble ?",
    options: [
      "Nautilus",
      "Breaking Bad",
      "Game of Thrones",
      "Stranger Things"
    ],
    correctAnswer: 0,
    emoji: "📺"
  },
  {
    id: 4,
    question: "Où aimerais-je t'emmener en voyage ?",
    options: [
      "Paris",
      "New York",
      "Tokyo",
      "Londres"
    ],
    correctAnswer: 2,
    emoji: "✈️"
  },
  {
    id: 5,
    question: "Quel est notre moment que tu préféres ?",
    options: [
      "Le petit-déjeuner au lit",
      "Les soirées films",
      "Les activités manuelles",
      "Les papouilles dans le dos (fesses)"
    ],
    correctAnswer: 3,
    emoji: "🌙"
  }
];

const Question = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const addError = useQuizStore((state) => state.addError);
  
  const currentQuestion = questions[parseInt(id) - 1];

  useEffect(() => {
    setSelectedAnswer(null);
    setShowResult(false);
    setIsCorrect(false);
  }, [id]);

  const handleAnswer = (index) => {
    setSelectedAnswer(index);
    setShowResult(true);
    const correct = index === currentQuestion.correctAnswer;
    setIsCorrect(correct);
    
    if (!correct) {
      addError();
    }
    
    setTimeout(() => {
      if (parseInt(id) === questions.length) {
        navigate('/finale');
      } else {
        navigate(`/question/${parseInt(id) + 1}`);
      }
    }, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="question-container"
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="text-center mb-6"
      >
        <span className="text-5xl">{currentQuestion.emoji}</span>
      </motion.div>

      <h2 className="text-2xl font-bold text-primary mb-4 text-center">
        Question {id}/5
      </h2>

      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${(parseInt(id) / questions.length) * 100}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="h-full bg-primary rounded-full"
        />
      </div>

      <p className="text-lg mb-8 text-center">
        {currentQuestion.question}
      </p>

      <div className="space-y-4">
        {currentQuestion.options.map((option, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`
              w-full p-4 rounded-lg text-left transition-colors 
              ${showResult
                ? index === currentQuestion.correctAnswer
                  ? 'bg-green-500 text-white'
                  : selectedAnswer === index
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-100'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
            onClick={() => !showResult && handleAnswer(index)}
            disabled={showResult}
          >
            {option}
          </motion.button>
        ))}
      </div>

      {showResult && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 text-center"
        >
          <p className={isCorrect ? "text-green-500" : "text-red-500"}>
            {isCorrect ? "Bravo ! C'est la bonne réponse ! 🎉" : "Pas tout à fait... Mais ce n'est pas grave ! 💕"}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Question;
