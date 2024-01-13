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
    <div className="animalSounds">
      <h1>Πάτησε εδώ!</h1>
      <div className="animalBarks">
        <img src={bark} alt="Beagle" className="right" />
        <button onClick={handleButtonClick}>
          <img src={audio} alt="Play" />
        </button>
        <img src={bark} alt="Beagle" className="left" />
      </div>
    </div>
  );
};

export default AnimalSounds;
