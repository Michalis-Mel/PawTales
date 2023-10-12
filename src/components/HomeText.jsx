import { motion } from "framer-motion";

const HomeText = () => {
  return (
    <motion.div
      className="homeText"
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      <h1>Καλωσορίσατε στο PawTales</h1>
      <p>
        Στον μαγικό κόσμο μας, η φύση είναι σαν ένας μεγάλος πίνακας γεμάτος
        υπέροχα χρώματα, περίεργα σχήματα και όμορφους ήχους. Στον κόσμο αυτόν,
        οι ήρωες μας είναι τα ζωάκια, που είναι σημαντικά κομμάτια της ζωής στη
        γη.
      </p>
      <p>
        Τα ζωάκια παίζουν έναν πολύ σημαντικό ρόλο στη φύση και τη ζωή μας. Μας
        βοηθούν να φυτρώσουν τα λουλούδια με το φανταστικό τραγούδι τους, και
        μας βοηθούν να φροντίσουμε τον υπέροχο πλανήτη μας.
      </p>
      <p>
        Στο PawTales, φτιάχνουμε μικρές ιστορίες που μας μεταφέρουν σε μαγικές
        περιπέτειες με τα ζωάκια και τη φύση. Πιστεύουμε ότι αυτές οι ιστορίες
        μπορούν να μας μάθουν πολλά και να μας διδάξουν πόσο σημαντικό είναι να
        φροντίζουμε τα ζώα και τη φύση.
      </p>
      <p>
        Έλα κι εσύ στον κόσμο του PawTales και ανακάλυψε τη μαγεία που κρύβεται
        γύρω μας. Ας φτιάξουμε μαζί μια κοινότητα που αγαπά, σέβεται και
        προστατεύει τον κόσμο και τα αγαπημένα μας ζωάκια.
      </p>
    </motion.div>
  );
};

export default HomeText;
