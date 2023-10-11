import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
//Images
import logo from "../assets/header/pawLogo.png";
import book from "../assets/icons/book.png";
import idea from "../assets/icons/idea.png";
import heart from "../assets/header/heart.png";
import user from "../assets/header/user.png";

const Header = () => {
  const linkImgVariants = {
    hidden: { scale: 0 },
    show: { scale: 1, transition: { duration: 0.8 } },
  };
  return (
    <header>
      <NavLink to="/ideas" className="link">
        <motion.img
          src={idea}
          alt="Οι ιδέες σας"
          initial="hidden"
          animate="show"
          variants={linkImgVariants}
          whileHover={{
            scale: 1.1,
            transition: { duration: 0.2, ease: "linear" },
          }}
          whileTap={{
            scale: 0.8,
            transition: { duration: 0.2, ease: "linear" },
          }}
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
      </NavLink>
      <NavLink to="/stories" className="link">
        <motion.img
          src={book}
          alt="Ιστορίες"
          initial="hidden"
          animate="show"
          variants={linkImgVariants}
          whileHover={{
            scale: 1.1,
            transition: { duration: 0.2, ease: "linear" },
          }}
          whileTap={{
            scale: 0.8,
            transition: { duration: 0.2, ease: "linear" },
          }}
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
      </NavLink>
      <NavLink to="/" className="logo">
        <motion.img
          src={logo}
          alt="Logo"
          initial="hidden"
          animate="show"
          variants={linkImgVariants}
          whileHover={{
            scale: 1.1,
            transition: { duration: 0.2, ease: "linear" },
          }}
          whileTap={{
            scale: 0.8,
            transition: { duration: 0.2, ease: "linear" },
          }}
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
      </NavLink>
      <NavLink to="/favorites" className="link">
        <motion.img
          src={heart}
          alt="Αγαπημένα"
          initial="hidden"
          animate="show"
          variants={linkImgVariants}
          whileHover={{
            scale: 1.1,
            transition: { duration: 0.2, ease: "linear" },
          }}
          whileTap={{
            scale: 0.8,
            transition: { duration: 0.2, ease: "linear" },
          }}
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
          Αγαπημένα
        </motion.span>
      </NavLink>
      <NavLink to="/account" className="link">
        <motion.img
          src={user}
          alt="Λογαριασμός"
          initial="hidden"
          animate="show"
          variants={linkImgVariants}
          whileHover={{
            scale: 1.1,
            transition: { duration: 0.2, ease: "linear" },
          }}
          whileTap={{
            scale: 0.8,
            transition: { duration: 0.2, ease: "linear" },
          }}
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
          Λογαριασμός
        </motion.span>
      </NavLink>
    </header>
  );
};

export default Header;
