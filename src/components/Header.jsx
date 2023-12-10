import { motion } from "framer-motion";
import { NavLink, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../helpers/firebase";
import { useState, useEffect } from "react";
import { useContext, useRef } from "react";
import { AuthContext } from "../Context/AuthContext";

//Images
import logo from "../assets/header/pawLogo.png";
import book from "../assets/icons/book.png";
import idea from "../assets/icons/idea.png";
import heart from "../assets/header/heart.png";
import user from "../assets/header/user.png";

const Header = () => {
  const { setUser } = useContext(AuthContext);

  const navigate = useNavigate();
  const [authUser, setAuthUser] = useState(null);
  const [userBoxActive, setUserBoxActive] = useState(false);
  const userMenuRef = useRef(null);

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserBoxActive(false);
      }
    };

    // Add event listener when component mounts
    document.addEventListener("click", handleClickOutside);

    // Remove event listener when component unmounts
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setAuthUser(null);
        setUser(null);
        navigate("/login");
        setUserBoxActive(false);
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  };

  const links = document.querySelectorAll(".link");

  // Add a click event listener to each link
  links.forEach((link) => {
    link.addEventListener("click", () => {
      // Remove the 'active' class from all links
      links.forEach((otherLink) => {
        otherLink.classList.remove("active");
      });
      // Add the 'active' class to the clicked link
      link.classList.add("active");
    });
  });

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
            <div>Οι</div>
            <div className="permanent">Ιδέες</div>
            <div>σας</div>
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
            <div>Οι</div>
            <div className="permanent">Ιστορίες</div>
            <div>μας</div>
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
          <div className="user_menu_container" ref={userMenuRef}>
            <NavLink
              to="#"
              onClick={() => setUserBoxActive(!userBoxActive)}
              className="link account"
            >
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
            {userBoxActive && (
              <motion.div
                className="user_menu"
                initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: "spring",
                  duration: 1,
                  ease: "linear",
                }}
              >
                <div className="triangle"></div>
                <ul>
                  <li>
                    <NavLink
                      to="/edit-account"
                      onClick={() => setUserBoxActive(false)}
                    >
                      Ο Λογαριασμός σας
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/" onClick={handleLogout}>
                      Αποσύνδεση
                    </NavLink>
                  </li>
                </ul>
              </motion.div>
            )}
          </div>
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
