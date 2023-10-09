import { motion } from "framer-motion";
//Images
import logo from "../assets/header/pawLogo.png";

const Header = () => {
  return (
    <header>
      <motion.a
        href="/"
        className="logo"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.8 }}
        transition={{ duration: 0.2, ease: "linear" }}
      >
        <motion.img
          src={logo}
          alt="Logo"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
        />
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            type: "spring",
            duration: 2,
            ease: "linear",
            delay: 3,
          }}
        >
          PawTales
        </motion.span>
      </motion.a>
    </header>
  );
};

export default Header;
