import { motion } from 'framer-motion';
import { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';

const WelcomeMsg = ({ firstLoad }) => {
  const { user } = useContext(AuthContext);

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <>
      {user && (
        <motion.div
          className='welcomeMsg'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: firstLoad ? 0.8 : 0.5 }}
        >
          <h1>
            Γεια σου,{' '}
            {user.displayName.split(' ').map(capitalizeFirstLetter).join(' ')}
          </h1>
        </motion.div>
      )}
    </>
  );
};

export default WelcomeMsg;
