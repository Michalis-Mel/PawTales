import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

import { animalsGame } from '../helpers/guessingGame';
import Loading from './Loading';

const GuessingGame = () => {
  const [currentAnimal, setCurrentAnimal] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (currentIndex < animalsGame.length) {
      setIsLoading(true);
      const img = new Image();
      img.src = animalsGame[currentIndex].image;
      // img.onload = () => {
      //   setCurrentAnimal(animalsGame[currentIndex]);
      //   setSelectedOption(null);
      //   setIsCorrect(null);
      //   setIsLoading(false);
      // };
    }
  }, [currentIndex]);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    if (option === currentAnimal.name) {
      setIsCorrect(true);
      setCurrentIndex(currentIndex + 1);
    } else {
      setIsCorrect(false);
    }
  };

  const startGame = () => {
    setIsGameStarted(true);
  };

  const restartGame = () => {
    setCurrentIndex(0);
  };

  return (
    <motion.div
      className='guessingGame'
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.3 }}
      viewport={{ once: true }}
    >
      <h1>Παιχνίδι Γνώσεων</h1>
      <div className='game'>
        {!isGameStarted ? (
          <>
            <h6>
              Δείξε μας πόσο καλά γνωρίζεις τα ζώα που συναντάς στις ιστορίες
              μας!
            </h6>
            <button onClick={startGame} className='start'>
              Ξεκίνα το Παιχνίδι
            </button>
          </>
        ) : currentIndex < animalsGame.length ? (
          isLoading ? (
            <div className='gameLoading'>
              <Loading />
            </div>
          ) : (
            currentAnimal && (
              <>
                <img src={currentAnimal.image} alt={currentAnimal.name} />
                <h6>Βρες το ζώο της εικόνας</h6>
                <div className='game_btns'>
                  {currentAnimal.options.map((option, index) => (
                    <div className='btn_con' key={index}>
                      <button
                        onClick={() => handleOptionClick(option)}
                        className={` ${
                          selectedOption === option && !isCorrect ? 'wrong' : ''
                        } `}
                      >
                        {option}
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )
          )
        ) : (
          <>
            <h6>
              Συγχαρητήρια! <br /> Ολοκλήρωσες το παιχνίδι με επιτυχία!
            </h6>
            <button onClick={restartGame} className='restart'>
              Ξαναπαίξε
            </button>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default GuessingGame;
