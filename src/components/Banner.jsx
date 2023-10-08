import animals from "../assets/environment.jpg";
import { motion } from "framer-motion";

const Banner = () => {
  return (
    <motion.div
      className="banner_con"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 2.5 }}
    >
      <motion.img
        className="banner"
        src={animals}
        alt="Paw Planet"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />
    </motion.div>
  );
};

export default Banner;
