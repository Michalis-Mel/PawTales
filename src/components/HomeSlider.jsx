import env1 from "../assets/homepage/slider/environment.jpg";
import tmax from "../assets/homepage/slider/10.jpg";
import env3 from "../assets/homepage/slider/environment.jpg";
import env4 from "../assets/homepage/slider/environment.jpg";
import env5 from "../assets/homepage/slider/environment.jpg";
import left from "../assets/icons/arrowLeft.png";
import right from "../assets/icons/arrowRight.png";

import { motion } from "framer-motion";
import { useState } from "react";

const imagesArray = [env1, tmax, env3, env4, env5];

const HomeSlider = () => {
  const [imageIndex, setImageIndex] = useState(0);

  const nextSlide = () => {
    setImageIndex((index) => {
      if (index === imagesArray.length - 1) return 0;
      return index + 1;
    });
  };
  const prevSlide = () => {
    setImageIndex((index) => {
      if (index === 0) return imagesArray.length - 1;
      return index - 1;
    });
  };
  return (
    <motion.div
      className="homeSlider"
      initial={{ scale: 0 }}
      whileInView={{ scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
    >
      <button
        onClick={prevSlide}
        className="arrow arrowLeft"
        aria-label="View Previous Image"
      >
        <img src={left} alt="arrow left" />
      </button>
      <div className="homeSliderCon">
        {imagesArray.map((image) => (
          <img
            key={image}
            src={image}
            alt="image"
            className="sliderImage"
            style={{ translate: ` ${-100 * imageIndex}%` }}
          />
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
        {imagesArray.map((image, index) => (
          <button
            key={index}
            onClick={() => setImageIndex(index)}
            className={`${index === imageIndex ? "active" : ""}`}
            aria-label={`View Image ${index + 1}`}
          ></button>
        ))}
      </div>
    </motion.div>
  );
};

export default HomeSlider;
