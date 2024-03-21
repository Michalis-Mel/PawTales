import { motion, AnimatePresence } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../helpers/firebase';
import { useState, useEffect } from 'react';
import MobileNav from './MobileNav';

//Images
import logo from '../assets/header/pawLogo.png';
import book from '../assets/icons/book.png';
import idea from '../assets/icons/idea.png';
import heart from '../assets/header/heart.png';
import user from '../assets/header/user.png';
import game from '../assets/icons/game.png';
import music from '../assets/icons/headphones.png';

const Header = () => {
  const [authUser, setAuthUser] = useState(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

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

  const links = document.querySelectorAll('.link');

  // Add a click event listener to each link
  links.forEach((link) => {
    link.addEventListener('click', () => {
      // Remove the 'active' class from all links
      links.forEach((otherLink) => {
        otherLink.classList.remove('active');
      });
      // Add the 'active' class to the clicked link
      link.classList.add('active');
    });
  });

  return (
    <header>
      <div className='headerLeft'>
        <NavLink to='/stories' className='link'>
          <motion.img
            src={book}
            alt='Ιστορίες'
            initial='hidden'
            animate='show'
            variants={linkImgVariants}
            whileHover={{
              scale: 1.1,
              transition: { duration: 0.2, ease: 'linear' },
            }}
            whileTap={{
              scale: 0.8,
              transition: { duration: 0.2, ease: 'linear' },
            }}
          />
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              type: 'spring',
              duration: 2,
              ease: 'linear',
              delay: 1,
            }}
          >
            Ιστορίες
          </motion.span>
        </NavLink>
        <NavLink to='/games' className='link'>
          <motion.img
            src={game}
            alt='Τα παιχνίδια μας'
            initial='hidden'
            animate='show'
            variants={linkImgVariants}
            whileHover={{
              scale: 1.1,
              transition: { duration: 0.2, ease: 'linear' },
            }}
            whileTap={{
              scale: 0.8,
              transition: { duration: 0.2, ease: 'linear' },
            }}
          />
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              type: 'spring',
              duration: 2,
              ease: 'linear',
              delay: 1,
            }}
          >
            Παιχνίδια
          </motion.span>
        </NavLink>
        <NavLink to='/songs' className='link'>
          <motion.img
            src={music}
            alt='Τα τραγούδια μας'
            initial='hidden'
            animate='show'
            variants={linkImgVariants}
            whileHover={{
              scale: 1.1,
              transition: { duration: 0.2, ease: 'linear' },
            }}
            whileTap={{
              scale: 0.8,
              transition: { duration: 0.2, ease: 'linear' },
            }}
          />
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              type: 'spring',
              duration: 2,
              ease: 'linear',
              delay: 1,
            }}
          >
            Τραγούδια
          </motion.span>
        </NavLink>
      </div>

      <motion.div className='logo'>
        <NavLink to='/' className='logoLink'>
          <motion.img
            src={logo}
            alt='Logo'
            initial='hidden'
            animate='show'
            variants={linkImgVariants}
            whileHover={{
              scale: 1.1,
              transition: { duration: 0.2, ease: 'linear' },
            }}
            whileTap={{
              scale: 0.8,
              transition: { duration: 0.2, ease: 'linear' },
            }}
          />
        </NavLink>
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            type: 'spring',
            duration: 2,
            ease: 'linear',
            delay: 1,
          }}
        >
          PawTales
        </motion.span>
      </motion.div>
      <div className='headerRight'>
        <NavLink to='/ideas' className='link'>
          <motion.img
            src={idea}
            alt='Οι ιδέες σας'
            initial='hidden'
            animate='show'
            variants={linkImgVariants}
            whileHover={{
              scale: 1.1,
              transition: { duration: 0.2, ease: 'linear' },
            }}
            whileTap={{
              scale: 0.8,
              transition: { duration: 0.2, ease: 'linear' },
            }}
          />
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              type: 'spring',
              duration: 2,
              ease: 'linear',
              delay: 1,
            }}
          >
            <div>Οι</div>
            <div className='permanent'>Ιδέες</div>
            <div>σας</div>
          </motion.span>
        </NavLink>
        <NavLink to='/favorites' className='link'>
          <motion.img
            src={heart}
            alt='Αγαπημένα'
            initial='hidden'
            animate='show'
            variants={linkImgVariants}
            whileHover={{
              scale: 1.1,
              transition: { duration: 0.2, ease: 'linear' },
            }}
            whileTap={{
              scale: 0.8,
              transition: { duration: 0.2, ease: 'linear' },
            }}
          />
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              type: 'spring',
              duration: 2,
              ease: 'linear',
              delay: 1,
            }}
          >
            Αγαπημένα
          </motion.span>
        </NavLink>
        <NavLink to={authUser ? '/edit-account' : '/login'} className='link'>
          {authUser ? (
            <motion.img
              src={authUser.photoURL || user}
              className='googleImg'
              alt='Λογαριασμός'
              initial='hidden'
              animate='show'
              variants={linkImgVariants}
              whileTap={{
                scale: 0.8,
                transition: { duration: 0.2, ease: 'linear' },
              }}
            />
          ) : (
            <motion.img
              src={user}
              alt='Λογαριασμός'
              initial='hidden'
              animate='show'
              variants={linkImgVariants}
              whileHover={{
                scale: 1.1,
                transition: { duration: 0.2, ease: 'linear' },
              }}
              whileTap={{
                scale: 0.8,
                transition: { duration: 0.2, ease: 'linear' },
              }}
            />
          )}
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              type: 'spring',
              duration: 2,
              ease: 'linear',
              delay: 1,
            }}
          >
            {authUser ? 'Λογαριασμός' : 'Σύνδεση'}
          </motion.span>
        </NavLink>
      </div>
      <motion.button
        className={`burger ${mobileNavOpen ? 'open' : ''}`}
        onClick={() => {
          mobileNavOpen ? setMobileNavOpen(false) : setMobileNavOpen(true);
          document.body.style.overflow = 'hidden';
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          type: 'spring',
          duration: 1.5,
          ease: 'linear',
          delay: 1,
        }}
      >
        <span className='line1'></span>
        <span className='line2'></span>
        <span className='line3'></span>
      </motion.button>
      <AnimatePresence>
        {mobileNavOpen && (
          <MobileNav
            setMobileNavOpen={setMobileNavOpen}
            mobileNavOpen={mobileNavOpen}
            authUser={authUser}
          />
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
