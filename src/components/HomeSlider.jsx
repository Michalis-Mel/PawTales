//Images
import left from "../assets/icons/arrowLeft.png";
import right from "../assets/icons/arrowRight.png";

//import topStories
import { topStories } from "../stories";

import { motion } from "framer-motion";
import { useState } from "react";

const HomeSlider = () => {
  const [storyIndex, setStoryIndex] = useState(0);

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
    <motion.div
      initial={{ scale: 0 }}
      whileInView={{ scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.5, ease: "linear" }}
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
              <div className="topStoryInfo">
                <h2>{story.title}</h2>
                {story.idea ? (
                  <h4>Ιδέα: {story.idea}</h4>
                ) : (
                  <h4>Ιδέα: PawTales</h4>
                )}
              </div>
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
  );
};

export default HomeSlider;
