import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

import {
  petsGame,
  wildAnimalsGame,
  underWaterAnimalsGame,
  birdsGame,
  farmAnimalsGame,
  reptilesAmphibianGame,
  insectsGame,
  africanGame,
  australianGame,
  arcticGame,
} from '../helpers/guessingGame';

import win from '../assets/animals/sounds/win.wav';
import lose from '../assets/animals/sounds/error.wav';
import Loading from './Loading';

const GuessingGame = () => {
  const [currentAnimal, setCurrentAnimal] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);

  const games = {
    petsGame,
    wildAnimalsGame,
    underWaterAnimalsGame,
    birdsGame,
    farmAnimalsGame,
    reptilesAmphibianGame,
    insectsGame,
    africanGame,
    australianGame,
    arcticGame,
  };
  const gameNames = {
    petsGame: 'Κατοικίδια',
    wildAnimalsGame: 'Άγρια Ζώα',
    underWaterAnimalsGame: 'Θαλλάσια Ζώα',
    birdsGame: 'Πουλιά',
    farmAnimalsGame: 'Ζώα Φάρμας',
    reptilesAmphibianGame: 'Ερπετά και Αμφίβια',
    insectsGame: 'Έντομα',
    africanGame: 'Αφρικανικά Ζώα',
    australianGame: 'Αυστραλιανά Ζώα',
    arcticGame: 'Αρκτικά Ζώα',
  };

  const selectGame = (game) => {
    setSelectedGame(game);
    setIsGameStarted(true);
  };

  const winSound = new Audio(win);
  const loseSound = new Audio(lose);

  useEffect(() => {
    if (selectedGame && currentIndex < selectedGame.length) {
      setIsLoading(true);
      const img = new Image();
      img.src = selectedGame[currentIndex].image;

      const imgLoad = new Promise((resolve) => {
        img.onload = () => {
          resolve();
        };
      });

      const timeout = new Promise((resolve) => {
        setTimeout(resolve, 800);
      });

      Promise.all([imgLoad, timeout]).then(() => {
        setCurrentAnimal(selectedGame[currentIndex]);
        setSelectedOption(null);
        setIsCorrect(null);
        setIsLoading(false);
      });
    }
  }, [currentIndex, selectedGame]);

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

  const newGame = () => {
    setCurrentAnimal(null);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsCorrect(null);
    setIsGameStarted(false);
    setIsLoading(false);
    setSelectedGame(null);
  };

  return (
    <motion.div
      className='guessingGame'
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.3 }}
      viewport={{ once: true }}
    >
      {!isGameStarted ? (
        <div className='game small'>
          <h6>Διάλεξε Κατηγορία</h6>
          {Object.keys(games).map((gameKey) => (
            <button
              className='gameOption'
              onClick={() => selectGame(games[gameKey])}
              key={gameKey}
            >
              {gameNames[gameKey]}
            </button>
          ))}
        </div>
      ) : currentIndex < (selectedGame ? selectedGame.length : 0) ? (
        <div className='game'>
          {isLoading ? (
            <div className='gameLoading'>
              <Loading />
            </div>
          ) : (
            currentAnimal && (
              <>
                <img src={currentAnimal.image} alt={currentAnimal.name} />
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
            Συγχαρητήρια! <br /> Βρήκες όλα τα ζώα με επιτυχία!
          </h6>
          <button onClick={newGame} className='restart'>
            Νέο Παιχνίδι
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default GuessingGame;
