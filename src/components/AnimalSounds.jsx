import { motion } from "framer-motion";
import dog from "../assets/animals/sounds/bark.mp3";
import cat from "../assets/animals/sounds/mewow.wav";
import bird from "../assets/animals/sounds/bird.mp3";
import audio from "../assets/icons/audio.png";
import bark from "../assets/animals/beagleR.gif";

const AnimalSounds = () => {
  const handleButtonClick = () => {
    const audioFiles = [dog, cat, bird];
    const randomIndex = Math.floor(Math.random() * audioFiles.length);
    const audio = new Audio(audioFiles[randomIndex]);
    audio.play();
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
