import { useEffect, useState } from 'react';
import WelcomeMsg from '../components/WelcomeMsg';
import Banner from '../components/Banner';
import HomeText from '../components/HomeText';
import TopStoriesSlider from '../components/TopStoriesSlider';
import AnimalsBackground from '../components/AnimalsBackground';

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
      </div>
    </>
  );
};

export default Home;
