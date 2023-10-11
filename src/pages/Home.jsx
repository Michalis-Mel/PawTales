import Banner from "../components/Banner";
import HomeText from "../components/HomeText";
import HomeSlider from "../components/HomeSlider";
import AnimalsBackground from "../components/AnimalsBackground";

const Home = () => {
  return (
    <>
      <AnimalsBackground />
      <div className="home">
        <Banner />
        <HomeText />
        <HomeSlider />
      </div>
    </>
  );
};

export default Home;
