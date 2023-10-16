import Banner from "../components/Banner";
import HomeText from "../components/HomeText";
import TopStoriesSlider from "../components/TopStoriesSlider";
import AnimalsBackground from "../components/AnimalsBackground";
import { addStoriesToFirestore } from "../helpers/stories";

const Home = () => {
  // addStoriesToFirestore().then(() => console.log("done"));
  return (
    <>
      <AnimalsBackground />
      <div className="home">
        <Banner />
        <HomeText />
        <TopStoriesSlider />
      </div>
    </>
  );
};

export default Home;
