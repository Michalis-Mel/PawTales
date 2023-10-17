import { motion } from "framer-motion";
//Import animal images
import {
  koala,
  cat,
  cow,
  fox,
  lion,
  panda,
  turtle,
  dog,
  horse,
  dove,
} from "../helpers/animalImages";

const AnimalsBackground = () => {
  const variants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { opacity: 0.6, scale: 1, transition: { duration: 1, delay: 5 } },
  };
  return (
    <div className="animalsBg">
      <motion.img
        variants={variants}
        initial="hidden"
        animate="visible"
        src={koala}
        alt="koala"
      />
      <motion.img
        variants={variants}
        initial="hidden"
        animate="visible"
        src={cat}
        alt="cat"
      />
      <motion.img
        variants={variants}
        initial="hidden"
        animate="visible"
        src={cow}
        alt="cow"
      />
      <motion.img
        variants={variants}
        initial="hidden"
        animate="visible"
        src={fox}
        alt="fox"
      />
      <motion.img
        variants={variants}
        initial="hidden"
        animate="visible"
        src={lion}
        alt="lion"
      />
      <motion.img
        variants={variants}
        initial="hidden"
        animate="visible"
        src={panda}
        alt="panda"
      />
      <motion.img
        variants={variants}
        initial="hidden"
        animate="visible"
        src={turtle}
        alt="turtle"
      />
      <motion.img
        variants={variants}
        initial="hidden"
        animate="visible"
        src={dog}
        alt="dog"
      />
      <motion.img
        variants={variants}
        initial="hidden"
        animate="visible"
        src={horse}
        alt="horse"
      />
      <motion.img
        variants={variants}
        initial="hidden"
        animate="visible"
        src={dove}
        alt="dove"
      />
    </div>
  );
};

export default AnimalsBackground;
