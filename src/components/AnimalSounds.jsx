import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import audio from "../assets/icons/audio.png";
import bark from "../assets/animals/beagleR.gif";

//Sounds
import dog from "../assets/animals/sounds/bark.mp3";
import cat from "../assets/animals/sounds/mewow.wav";
import bird from "../assets/animals/sounds/bird.mp3";
import hawk from "../assets/animals/sounds/hawk.mp3";
import cow from "../assets/animals/sounds/cow.mp3";
import horse from "../assets/animals/sounds/horse.mp3";
import wolf from "../assets/animals/sounds/wolf.mp3";

const AnimalSounds = () => {
  const [currentAudio, setCurrentAudio] = useState(null);

  const handleButtonClick = () => {
    const audioFiles = [dog, cat, bird, hawk, cow, horse, wolf];
    const randomIndex = Math.floor(Math.random() * audioFiles.length);

    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }

    const newAudio = new Audio(audioFiles[randomIndex]);
    newAudio.play();
    setCurrentAudio(newAudio);
  };

  return (
    <motion.div
      className="animalSounds"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.3 }}
      viewport={{ once: true }}
    >
      <h1>Πάτησε εδώ!</h1>
      <div className="animalBarks">
        <img src={bark} alt="Beagle" className="right" />
        <button onClick={handleButtonClick}>
          <img src={audio} alt="Play" />
        </button>
        <img src={bark} alt="Beagle" className="left" />
      </div>
    </motion.div>
  );
};

export default AnimalSounds;
