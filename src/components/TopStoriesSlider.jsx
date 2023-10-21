import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

//DB
import { collection, getDocs } from "@firebase/firestore";
import { firestore } from "../helpers/firebase";

//Images
import left from "../assets/icons/arrowLeft.png";
import right from "../assets/icons/arrowRight.png";

const TopStoriesSlider = () => {
  const [topStories, setTopStories] = useState([]);
  const [storyIndex, setStoryIndex] = useState(0);

  // Fetch stories from Firestore
  useEffect(() => {
    const fetchTopStories = async () => {
      const topStoriesCollection = collection(firestore, "top stories");
      const topStoriesSnapshot = await getDocs(topStoriesCollection);
      const topStoriesData = topStoriesSnapshot.docs.map((doc) => doc.data());
      setTopStories(topStoriesData);
    };

    fetchTopStories();
  }, []);

  const nextSlide = () => {
    setStoryIndex((index) => {
      if (index === topStories.length - 1) return 0;
      return index + 1;
    });
  };
  const prevSlide = () => {
    setStoryIndex((index) => {
      if (index === 0) return topStories.length - 1;
      return index - 1;
    });
  };
  return (
    <>
      {topStories.length > 0 ? (
        <motion.div
          initial={{ y: 100 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
          className="topStories"
        >
          <h1>Κορυφαίες Ιστορίες της Εβδομάδας</h1>
          <div className="homeSlider">
            <button
              onClick={prevSlide}
              className="arrow arrowLeft"
              aria-label="View Previous Image"
            >
              <img src={left} alt="arrow left" />
            </button>
            <div className="homeSliderCon">
              {topStories.map((story) => (
                <div
                  key={story.id}
                  className="topStory"
                  style={{ translate: ` ${-100 * storyIndex}%` }}
                >
                  <img
                    src={story.image}
                    alt={story.title}
                    className="sliderImage"
                  />
                  <NavLink to={`/stories/${story.id}`} className="topStoryInfo">
                    <h2>{story.title}</h2>
                    {story.idea && <h4>Ιδέα: {story.idea}</h4>}
                  </NavLink>
                </div>
              ))}
            </div>
            <button
              onClick={nextSlide}
              className="arrow arrowRight"
              aria-label="View Next Image"
            >
              <img src={right} alt="arrow right" />
            </button>
            <div className="sliderPagination">
              {topStories.map((story, index) => (
                <button
                  key={index}
                  onClick={() => setStoryIndex(index)}
                  className={`${index === storyIndex ? "active" : ""}`}
                  aria-label={`View Image ${index + 1}`}
                ></button>
              ))}
            </div>
          </div>
        </motion.div>
      ) : null}
    </>
  );
};

export default TopStoriesSlider;
