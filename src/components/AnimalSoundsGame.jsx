import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { animalsGame } from '../helpers/animalSoundsGame';

import win from '../assets/animals/sounds/win.wav';
import lose from '../assets/animals/sounds/error.wav';
import Loading from './Loading';

import audio from '../assets/icons/audio.png';

const AnimalSoundsGame = () => {
  const [currentAnimal, setCurrentAnimal] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const winSound = new Audio(win);
  const loseSound = new Audio(lose);

  useEffect(() => {
    if (currentIndex < animalsGame.length) {
      setIsLoading(true);
      const audio = new Audio();
      audio.src = animalsGame[currentIndex].sound;

      const audioLoad = new Promise((resolve) => {
        audio.onloadeddata = () => {
          resolve();
        };
      });

      const timeout = new Promise((resolve) => {
        setTimeout(resolve, 800);
      });

      Promise.all([audioLoad, timeout]).then(() => {
        setCurrentAnimal(animalsGame[currentIndex]);
        setSelectedOption(null);
        setIsCorrect(null);
        setIsLoading(false);
      });
    }
  }, [currentIndex]);

  const playSound = () => {
    if (currentAnimal) {
      const animalSound = new Audio(currentAnimal.sound);
      animalSound.play();
    }
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    if (option === currentAnimal.name) {
      setIsCorrect(true);
      setCurrentIndex(currentIndex + 1);
      winSound.play();
    } else {
      loseSound.play();
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
      className='animalSounds'
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.3 }}
      viewport={{ once: true }}
    >
      {!isGameStarted ? (
        <div className='game small'>
          <h6>Μάντεψε τα ζώα που ακούγονται</h6>
          <button onClick={startGame} className='start'>
            Ξεκίνα το Παιχνίδι
          </button>
        </div>
      ) : currentIndex < animalsGame.length ? (
        <div className='game'>
          {isLoading ? (
            <div className='gameLoading'>
              <Loading />
            </div>
          ) : (
            currentAnimal && (
              <>
                <img onClick={playSound} src={audio} alt='Animal Sound' />
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
          )}
        </div>
      ) : (
        <div className='game small'>
          <h6>
            Συγχαρητήρια! <br /> Ολοκλήρωσες το παιχνίδι με επιτυχία!
          </h6>
          <button onClick={restartGame} className='restart'>
            Ξαναπαίξε
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default AnimalSoundsGame;
