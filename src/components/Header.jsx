import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../helpers/firebase';
import { useState, useEffect } from 'react';

//Images
import logo from '../assets/header/pawLogo.png';
import book from '../assets/icons/book.png';
import idea from '../assets/icons/idea.png';
import heart from '../assets/header/heart.png';
import user from '../assets/header/user.png';

const Header = () => {
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
            <div>Οι</div>
            <div className='permanent'>Ιστορίες</div>
            <div>μας</div>
          </motion.span>
        </NavLink>
      </div>

      <NavLink to='/' className='logo'>
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
      </NavLink>
      <div className='headerRight'>
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
    </header>
  );
};

export default Header;
