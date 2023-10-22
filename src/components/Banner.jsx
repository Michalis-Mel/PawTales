import animals from "../assets/homepage/slider/environment.jpg";
import animalsMob from "../assets/homepage/slider/environmentMob.jpg";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const Banner = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    handleResize();
    // Add a listener to window resize events
    window.addEventListener("resize", handleResize);

    // Clean up the listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleResize = () => {
    window.innerWidth < 550 ? setIsMobile(true) : setIsMobile(false);
  };
  return (
    <motion.div
      className="banner_con"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      <motion.img
        className="banner"
        src={isMobile ? animalsMob : animals}
        alt="Paw Stories"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />
    </motion.div>
  );
};

export default Banner;
