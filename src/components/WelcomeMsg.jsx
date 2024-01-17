import { motion } from 'framer-motion';
import { useContext, useEffect, useState } from 'react';
import { HomeMsgContext } from '../Context/HomeMsgContext';

const WelcomeMsg = ({ firstLoad }) => {
  const { message, setMessage } = useContext(HomeMsgContext);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setFadeOut(true);
    }, 5000);

    const timer2 = setTimeout(() => {
      setMessage('');
    }, 7000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [setMessage]);

  return (
    <motion.div
      className='welcomeMsg'
      initial={{ opacity: 0, y: 0, height: 'auto' }}
      animate={
        fadeOut
          ? { opacity: 0, y: '-50px', height: 0 }
          : { opacity: 1, y: 0, height: 'auto' }
      }
      exit={{ opacity: 0, y: '-50px', height: 0 }}
      transition={{
        opacity: { duration: 1, delay: firstLoad ? 0.8 : 0.5 },
        y: { duration: 1 },
        height: { duration: 1 },
      }}
    >
      <h1>{message}</h1>
    </motion.div>
  );
};

export default WelcomeMsg;
