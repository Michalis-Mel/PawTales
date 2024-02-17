import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

import { animalsGame } from '../helpers/guessingGame';

const GuessingGame = () => {
  const [currentAnimal, setCurrentAnimal] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  useEffect(() => {
    setCurrentAnimal(animalsGame[currentIndex]);
  }, [currentIndex]);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsCorrect(option === currentAnimal.name);
    if (option === currentAnimal.name) {
      setCurrentIndex((currentIndex + 1) % animalsGame.length);
      setSelectedOption(null);
      setIsCorrect(null);
    }
  };

  return (
    <>
      {currentAnimal && (
        <motion.div
          className='guessingGame'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <h1>Παιχνίδι Γνώσεων</h1>
          <div className='game'>
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
          </div>
        </motion.div>
      )}
    </>
  );
};

export default GuessingGame;
