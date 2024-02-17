import alepou from '../assets/animals/game/alepou.png';
import alogo from '../assets/animals/game/alogo.png';
import batraxos from '../assets/animals/game/batraxos.png';
import delfini from '../assets/animals/game/delfini.png';
import elafi from '../assets/animals/game/elafi.png';
import elefantas from '../assets/animals/game/elefantas.png';
import flamingo from '../assets/animals/game/flamingo.png';
import gaidouri from '../assets/animals/game/gaidouri.png';
import gata from '../assets/animals/game/gata.png';
import kastoras from '../assets/animals/game/kastoras.png';
import kavouras from '../assets/animals/game/kavouras.png';
import koala from '../assets/animals/game/koala.png';
import koukouvagia from '../assets/animals/game/koukouvagia.png';
import kouneli from '../assets/animals/game/kouneli.png';
import liontari from '../assets/animals/game/liontari.png';
import maimou from '../assets/animals/game/maimou.png';
import melissa from '../assets/animals/game/melissa.png';
import papagalos from '../assets/animals/game/papagalos.png';
import pasxalitsa from '../assets/animals/game/pasxalitsa.png';
import petalouda from '../assets/animals/game/petalouda.png';
import pigkouinos from '../assets/animals/game/pigkouinos.png';
import polikiArkouda from '../assets/animals/game/poliki-arkouda.png';
import rinokeros from '../assets/animals/game/rinokeros.png';
import skulos from '../assets/animals/game/skulos.png';
import soupia from '../assets/animals/game/soupia.png';
import xelwna from '../assets/animals/game/xelwna.png';
import zebra from '../assets/animals/game/zebra.png';

const animalNamesInGreek = {
  alepou: 'Αλεπού',
  alogo: 'Άλογο',
  batraxos: 'Βάτραχος',
  delfini: 'Δελφίνι',
  elafi: 'Ελάφι',
  elefantas: 'Ελέφαντας',
  flamingo: 'Φλαμίνγκο',
  gaidouri: 'Γάιδαρος',
  gata: 'Γάτα',
  kastoras: 'Κάστορας',
  kavouras: 'Καβούρας',
  koala: 'Κόαλα',
  koukouvagia: 'Κουκουβάγια',
  kouneli: 'Κουνέλι',
  liontari: 'Λιοντάρι',
  maimou: 'Μαϊμού',
  melissa: 'Μέλισσα',
  papagalos: 'Παπαγάλος',
  pasxalitsa: 'Πασχαλίτσα',
  petalouda: 'Πεταλούδα',
  pigkouinos: 'Πιγκουίνος',
  polikiArkouda: 'Πολική Αρκούδα',
  rinokeros: 'Ρινόκερος',
  skulos: 'Σκύλος',
  soupia: 'Σουπιά',
  xelwna: 'Χελώνα',
  zebra: 'Ζέβρα',
};

const animalImages = {
  alepou: alepou,
  alogo: alogo,
  batraxos: batraxos,
  delfini: delfini,
  elafi: elafi,
  elefantas: elefantas,
  flamingo: flamingo,
  gaidouri: gaidouri,
  gata: gata,
  kastoras: kastoras,
  kavouras: kavouras,
  koala: koala,
  koukouvagia: koukouvagia,
  kouneli: kouneli,
  liontari: liontari,
  maimou: maimou,
  melissa: melissa,
  papagalos: papagalos,
  pasxalitsa: pasxalitsa,
  petalouda: petalouda,
  pigkouinos: pigkouinos,
  polikiArkouda: polikiArkouda,
  rinokeros: rinokeros,
  skulos: skulos,
  soupia: soupia,
  xelwna: xelwna,
  zebra: zebra,
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
    image: animalImages[animalName],
    options,
    name: animalNamesInGreek[animalName],
  };
});
