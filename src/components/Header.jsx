import { motion } from "framer-motion";
//Images
import logo from "../assets/header/pawLogo.png";
import book from "../assets/icons/book.png";
import idea from "../assets/icons/idea.png";

const Header = () => {
  return (
    <header>
      <motion.a
        href="/ideas"
        className="link"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.8 }}
        transition={{ duration: 0.2, ease: "linear" }}
      >
        <motion.img
          src={idea}
          alt="Οι ιδέες σας"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8 }}
        />{" "}
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            type: "spring",
            duration: 2,
            ease: "linear",
            delay: 1,
          }}
        >
          Οι Ιδέες σας
        </motion.span>
      </motion.a>
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
          transition={{ duration: 0.8 }}
        />
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            type: "spring",
            duration: 2,
            ease: "linear",
            delay: 1,
          }}
        >
          PawTales
        </motion.span>
      </motion.a>
      <motion.a
        href="/stories"
        className="link"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.8 }}
        transition={{ duration: 0.2, ease: "linear" }}
      >
        <motion.img
          src={book}
          alt="Ιστορίες"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8 }}
        />
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            type: "spring",
            duration: 2,
            ease: "linear",
            delay: 1,
          }}
        >
          Οι Ιστορίες μας
        </motion.span>
      </motion.a>
    </header>
  );
};

export default Header;
