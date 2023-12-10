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
      try {
        const storiesCollection = collection(firestore, "stories");
        const storiesSnapshot = await getDocs(storiesCollection);
        const storiesData = storiesSnapshot.docs.map((doc) => doc.data());

        const topStoriesCollection = collection(firestore, "topStories");
        const topStoriesSnapshot = await getDocs(topStoriesCollection);
        const ids = topStoriesSnapshot.docs.map((doc) => doc.id);

        // Filter storiesData based on matching IDs and set the topStories state
        const topStoriesData = storiesData.filter((story) =>
          ids.includes(story.id)
        );
        setTopStories(topStoriesData);
      } catch (error) {
        console.error("Error fetching top stories:", error);
      }
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
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1 }}
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
