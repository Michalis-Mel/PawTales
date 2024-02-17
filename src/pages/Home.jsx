import { useEffect, useState } from 'react';
import WelcomeMsg from '../components/WelcomeMsg';
import Banner from '../components/Banner';
import HomeText from '../components/HomeText';
import TopStoriesSlider from '../components/TopStoriesSlider';
import AnimalsBackground from '../components/AnimalsBackground';
import SongPawtales from '../components/SongPawtales';
import AnimalSounds from '../components/AnimalSounds';
import GuessingGame from '../components/GuessingGame';

const Home = () => {
  const [firstLoad, setFirstLoad] = useState(true);
  useEffect(() => {
    if (firstLoad) {
      setFirstLoad(false);
    }
  }, [firstLoad]);
  return (
    <>
      <AnimalsBackground />
      <div className='home'>
        <WelcomeMsg firstLoad={firstLoad} />
        <Banner firstLoad={firstLoad} />
        <HomeText firstLoad={firstLoad} />
        <TopStoriesSlider />
        <SongPawtales />
        <AnimalSounds />
        <GuessingGame />
      </div>
    </>
  );
};

export default Home;
