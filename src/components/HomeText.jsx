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
        Στον κόσμο μας, η φύση είναι ένας υπέροχος πίνακας που συνθέτεται από
        διάφορα χρώματα, σχήματα και ήχους. Στο κέντρο αυτού του πίνακα
        βρίσκονται τα ζώα, που αποτελούν ζωτικό κομμάτι της ζωής στη γη.
      </p>
      <p>
        Οι ζωικοί κάτοικοι του πλανήτη μας διαδραματίζουν έναν ουσιαστικό ρόλο
        στον φυσικό κύκλο της ζωής. Από την αναπαραγωγή των φυτών μέσω της
        επικονίασης μέχρι τη διατήρηση του οικοσυστήματος, τα ζώα συμβάλλουν
        στην υγεία της γης.
      </p>
      <p>
        Στο PawTales, δημιουργούμε μια πλατφόρμα όπου οι ιστορίες συγκλίνουν με
        τη φύση και τα ζώα. Πιστεύουμε ότι αυτές οι ιστορίες μπορούν να
        εμπνεύσουν, να εκπαιδεύσουν και να ευαισθητοποιήσουν τον κόσμο, κυρίως
        τα παιδιά, σχετικά με τη σπουδαιότητα της συνύπαρξης με τα ζώα και τη
        φύση.
      </p>
      <p>
        Ελάτε μαζί μας στον κόσμο του PawTales και ανακαλύψτε τη μαγεία που
        υπάρχει γύρω μας. Ας δημιουργήσουμε μια κοινότητα που αγαπά, σέβεται και
        προστατεύει τον κόσμο μας και τα πλάσματά του.
      </p>
    </motion.div>
  );
};

export default HomeText;
