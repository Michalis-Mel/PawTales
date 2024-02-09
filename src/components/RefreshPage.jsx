import AnimalsBackground from '../components/AnimalsBackground';
import TreesLeaves from '../components/TreesLeaves';
import { motion } from 'framer-motion';
import boy from '../assets/icons/boy-read.png';
import girl from '../assets/icons/girl-read.png';

const RefreshPage = () => {
  return (
    <>
      <AnimalsBackground />
      <TreesLeaves />
      <motion.div
        className='refreshPage'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 1, ease: 'easeIn' }}
      >
        <div className='row'>
          <div className='refreshImages'>
            <img src={boy} alt='Boy' />
            <img src={girl} alt='Girl' />
          </div>
          <h2>
            Χαίρονται πολλά παιδιά στη σελίδα μας αυτή την στιγμή! <br />
            Ξαναπροσπάθησε σε λίγο!
          </h2>
        </div>
      </motion.div>
    </>
  );
};

export default RefreshPage;
