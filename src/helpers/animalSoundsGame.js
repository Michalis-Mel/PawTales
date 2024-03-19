import dog from '../assets/animals/sounds/bark.mp3';
import cat from '../assets/animals/sounds/mewow.wav';
import bird from '../assets/animals/sounds/bird.mp3';
import hawk from '../assets/animals/sounds/hawk.mp3';
import cow from '../assets/animals/sounds/cow.mp3';
import horse from '../assets/animals/sounds/horse.mp3';
import wolf from '../assets/animals/sounds/wolf.mp3';
import donkey from '../assets/animals/sounds/donkey.mp3';
import dolphin from '../assets/animals/sounds/dolphin.mp3';
import goat from '../assets/animals/sounds/goat.mp3';

const animalNamesInGreek = {
  dog: 'Σκύλος',
  cat: 'Γάτα',
  bird: 'Πουλί',
  hawk: 'Γεράκι',
  cow: 'Αγελάδα',
  horse: 'Άλογο',
  wolf: 'Λύκος',
  donkey: 'Γάιδαρος',
  dolphin: 'Δελφίνι',
  goat: 'Κατσίκα',
};

const animalSounds = {
  dog: dog,
  cat: cat,
  bird: bird,
  hawk: hawk,
  cow: cow,
  horse: horse,
  wolf: wolf,
  donkey: donkey,
  dolphin: dolphin,
  goat: goat,
};

const animalNames = Object.keys(animalNamesInGreek);

export const animalsGame = animalNames.map((animalName) => {
  const options = [animalNamesInGreek[animalName]];
  while (options.length < 4) {
    const randomAnimal =
      animalNames[Math.floor(Math.random() * animalNames.length)];
    if (!options.includes(animalNamesInGreek[randomAnimal])) {
      options.push(animalNamesInGreek[randomAnimal]);
    }
  }
  options.sort(() => Math.random() - 0.5);
  return {
    sound: animalSounds[animalName],
    options,
    name: animalNamesInGreek[animalName],
  };
});
