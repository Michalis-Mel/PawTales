import AnimalSoundsGame from '../components/AnimalSoundsGame';
import GuessingGame from '../components/GuessingGame';
import { motion } from 'framer-motion';

const Games = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.3 }}
      viewport={{ once: true }}
    >
      <h1>Παιχνίδι Γνώσεων</h1>
      <h6>
        Δείξε μας πόσο καλά γνωρίζεις τα ζώα που συναντάς στις ιστορίες μας!
      </h6>
      <GuessingGame />
      <AnimalSoundsGame />
    </motion.div>
  );
};

export default Games;
