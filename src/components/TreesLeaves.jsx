import { motion } from "framer-motion";
//images
import tree1 from "../assets/homepage/tree.png";
import tree2 from "../assets/homepage/tree.png";
import leaf1 from "../assets/homepage/leaves1.png";
import leaf2 from "../assets/homepage/leaves2.png";

const TreesLeaves = () => {
  return (
    <>
      <img className="tree1" src={tree1} alt="tree" />
      <img className="tree2" src={tree2} alt="tree" />
      <motion.img
        className="leaf1"
        src={leaf1}
        alt="leaf"
        animate={{ rotateZ: 5 }}
        whileHover={{ rotateZ: 10 }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "mirror",
          type: "tween",
        }}
      />
      <motion.img
        className="leaf2"
        src={leaf2}
        alt="leaf"
        animate={{ rotateZ: 5 }}
        whileHover={{ rotateZ: -10 }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "mirror",
          type: "tween",
        }}
      />
    </>
  );
};

export default TreesLeaves;
