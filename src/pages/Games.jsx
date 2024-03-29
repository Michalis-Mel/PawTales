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
        Βρες ποιό ζώο βλέπεις σε κάθε εικόνα και δείξε μας πόσο καλά γνωρίζεις
        τα ζώα που συναντάς στις ιστορίες μας
      </h6>
      <GuessingGame />
    </motion.div>
  );
};

export default Games;
