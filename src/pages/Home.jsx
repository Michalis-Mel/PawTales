import WelcomeMsg from "../components/WelcomeMsg";
import Banner from "../components/Banner";
import HomeText from "../components/HomeText";
import TopStoriesSlider from "../components/TopStoriesSlider";
import AnimalsBackground from "../components/AnimalsBackground";
import SongPawtales from "../components/SongPawtales";

const Home = () => {
  return (
    <>
      <AnimalsBackground />
      <div className="home">
        <WelcomeMsg />
        <Banner />
        <HomeText />
        <TopStoriesSlider />
        <SongPawtales />
      </div>
    </>
  );
};

export default Home;
