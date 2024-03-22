import instagram from '../assets/icons/instagram.png';
import { motion } from 'framer-motion';
const Footer = () => {
  let currentYear = new Date().getFullYear();

  return (
    <footer>
      <motion.div
        className='footer_con'
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        viewport={{ once: true }}
      >
        <a
          href='https://www.instagram.com/paw___tales/'
          target='_blank'
          rel='noopener noreferrer'
          className='social'
        >
          Βρείτε μας στο Ιnstagram
          <img src={instagram} alt='Instagram' />
        </a>
        <span>&copy; Copyright {currentYear}, M² WebWorks</span>
      </motion.div>
    </footer>
  );
};

export default Footer;
