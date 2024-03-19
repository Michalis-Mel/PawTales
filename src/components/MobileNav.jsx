import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

//Images
import book from '../assets/icons/book.png';
import idea from '../assets/icons/idea.png';
import heart from '../assets/header/heart.png';
import user from '../assets/header/user.png';
import game from '../assets/icons/game.png';
import music from '../assets/icons/headphones.png';
import logo from '../assets/header/pawLogo.png';

const MobileNav = ({ setMobileNavOpen, mobileNavOpen, authUser }) => {
  const path = useLocation();

  const ulVariant = {
    opened: {
      transition: {
        delayChildren: 1,
        staggerChildren: 0.18,
      },
    },
    closed: {
      transition: {
        staggerChildren: 0.06,
        staggerDirection: -1,
      },
    },
  };

  const linkImgVariants = {
    hidden: { scale: 0 },
    show: { scale: 1, transition: { duration: 0.8 } },
  };

  return (
    <motion.div
      className='mobileNav'
      initial={{ y: '-100vh' }}
      animate={{ y: '0' }}
      exit={{ y: '-100vh' }}
      transition={{ duration: 0.5 }}
    >
      <motion.div className='mobHeader'>
        <NavLink
          to='/'
          onClick={() => {
            setMobileNavOpen(false);
            document.body.style.overflow = 'auto';
          }}
          className='mobLogo'
        >
          <motion.img
            src={logo}
            alt='Logo'
            initial={{ opacity: 0, y: 20 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              type: 'spring',
              duration: 2,
              ease: 'linear',
              delay: 0.5,
            }}
            whileTap={{
              scale: 0.8,
              transition: { duration: 0.2, ease: 'linear' },
            }}
          />
        </NavLink>
        <motion.button
          className={`mobBurger ${mobileNavOpen ? 'open' : ''}`}
          onClick={() => {
            mobileNavOpen ? setMobileNavOpen(false) : setMobileNavOpen(true);
            document.body.style.overflow = 'auto';
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            type: 'spring',
            duration: 2,
            ease: 'linear',
            delay: 0.5,
          }}
        >
          <span className='line1'></span>
          <span className='line2'></span>
          <span className='line3'></span>
        </motion.button>
      </motion.div>
      <motion.nav variants={ulVariant}>
        <NavLink
          to='/stories'
          className='moblink'
          onClick={() => {
            setMobileNavOpen(false);
            document.body.style.overflow = 'auto';
          }}
        >
          <motion.img
            src={book}
            alt='Ιστορίες'
            initial={{ opacity: 0, y: 20 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              type: 'spring',
              duration: 2,
              ease: 'linear',
              delay: 0.5,
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
              delay: 0.5,
            }}
            whileTap={{
              scale: 0.8,
              transition: { duration: 0.2, ease: 'linear' },
            }}
          >
            Ιστορίες
          </motion.span>
        </NavLink>
        <NavLink
          to='/games'
          className='moblink'
          onClick={() => {
            setMobileNavOpen(false);
            document.body.style.overflow = 'auto';
          }}
        >
          <motion.img
            src={game}
            alt='Τα παιχνίδια μας'
            initial={{ opacity: 0, y: 20 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              type: 'spring',
              duration: 2,
              ease: 'linear',
              delay: 0.5,
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
              delay: 0.5,
            }}
            whileTap={{
              scale: 0.8,
              transition: { duration: 0.2, ease: 'linear' },
            }}
          >
            Παιχνίδια
          </motion.span>
        </NavLink>
        <NavLink
          to='/songs'
          className='moblink'
          onClick={() => {
            setMobileNavOpen(false);
            document.body.style.overflow = 'auto';
          }}
        >
          <motion.img
            src={music}
            alt='Τα τραγούδια μας'
            initial={{ opacity: 0, y: 20 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              type: 'spring',
              duration: 2,
              ease: 'linear',
              delay: 0.5,
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
              delay: 0.5,
            }}
            whileTap={{
              scale: 0.8,
              transition: { duration: 0.2, ease: 'linear' },
            }}
          >
            Τραγούδια
          </motion.span>
        </NavLink>
        <NavLink
          to='/ideas'
          className='moblink'
          onClick={() => {
            setMobileNavOpen(false);
            document.body.style.overflow = 'auto';
          }}
        >
          <motion.img
            src={idea}
            alt='Οι ιδέες σας'
            initial={{ opacity: 0, y: 20 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              type: 'spring',
              duration: 2,
              ease: 'linear',
              delay: 0.5,
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
              delay: 0.5,
            }}
            whileTap={{
              scale: 0.8,
              transition: { duration: 0.2, ease: 'linear' },
            }}
          >
            Οι Ιδέες σας
          </motion.span>
        </NavLink>
        <NavLink
          to='/favorites'
          className='moblink'
          onClick={() => {
            setMobileNavOpen(false);
            document.body.style.overflow = 'auto';
          }}
        >
          <motion.img
            src={heart}
            alt='Αγαπημένα'
            initial={{ opacity: 0, y: 20 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              type: 'spring',
              duration: 2,
              ease: 'linear',
              delay: 0.5,
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
              delay: 0.5,
            }}
            whileTap={{
              scale: 0.8,
              transition: { duration: 0.2, ease: 'linear' },
            }}
          >
            Αγαπημένα
          </motion.span>
        </NavLink>
        <NavLink
          to={authUser ? '/edit-account' : '/login'}
          className='moblink'
          onClick={() => {
            setMobileNavOpen(false);
            document.body.style.overflow = 'auto';
          }}
        >
          {authUser ? (
            <motion.img
              src={authUser.photoURL || user}
              className='googleImg'
              alt='Λογαριασμός'
              initial={{ opacity: 0, y: 20 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                type: 'spring',
                duration: 2,
                ease: 'linear',
                delay: 0.5,
              }}
              whileTap={{
                scale: 0.8,
                transition: { duration: 0.2, ease: 'linear' },
              }}
            />
          ) : (
            <motion.img
              src={user}
              alt='Λογαριασμός'
              initial={{ opacity: 0, y: 20 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                type: 'spring',
                duration: 2,
                ease: 'linear',
                delay: 0.5,
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
            whileTap={{
              scale: 0.8,
              transition: { duration: 0.2, ease: 'linear' },
            }}
            transition={{
              type: 'spring',
              duration: 2,
              ease: 'linear',
              delay: 0.5,
            }}
          >
            {authUser ? 'Λογαριασμός' : 'Σύνδεση'}
          </motion.span>
        </NavLink>
      </motion.nav>
    </motion.div>
  );
};

export default MobileNav;
