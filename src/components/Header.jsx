import { motion } from "framer-motion";
import { NavLink, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

//Images
import logo from "../assets/header/pawLogo.png";
import book from "../assets/icons/book.png";
import idea from "../assets/icons/idea.png";
import heart from "../assets/header/heart.png";
import user from "../assets/header/user.png";
import logout from "../assets/header/logout.png";

const Header = () => {
  const { setUser } = useContext(AuthContext);

  const navigate = useNavigate();
  const [authUser, setAuthUser] = useState(null);

  const linkImgVariants = {
    hidden: { scale: 0 },
    show: { scale: 1, transition: { duration: 0.8 } },
  };

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });
    return () => {
      listen();
    };
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setAuthUser(null);
        setUser(null);
        navigate("/login");
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  };

  return (
    <header>
      <div className="headerLeft">
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
      </div>

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
      <div className="headerRight">
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
        {authUser ? (
          <NavLink to="/" onClick={handleLogout} className="link">
            <motion.img
              src={logout}
              alt="Αποσύνδεση"
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
              Αποσύνδεση
            </motion.span>
          </NavLink>
        ) : (
          <NavLink to="/login" className="link">
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
              Σύνδεση
            </motion.span>
          </NavLink>
        )}
      </div>
    </header>
  );
};

export default Header;
