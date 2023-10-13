import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../firebase";
import heart from "../assets/icons/heart.svg";

const StoryDetails = () => {
  const navigate = useNavigate();
  const url = useParams();

  const [story, setStory] = useState({});
  const [allStories, setAllStories] = useState([]);
  const [favorite, setFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStories = async () => {
      const storiesCollection = collection(firestore, "stories");
      const storiesSnapshot = await getDocs(storiesCollection);
      const storiesData = storiesSnapshot.docs.map((doc) => doc.data());
      setAllStories(storiesData);

      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    };

    fetchStories();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      const currentStory = allStories.find(
        (myStory) => myStory.id === parseInt(url.id)
      );
      if (currentStory) setStory(currentStory);
    }
  }, [allStories, url, isLoading]);

  const toggleFavorite = () => {
    setFavorite(!favorite);
  };

  const paragraphs = story.content ? story.content.split("\n") : [];

  return (
    <div className="storyDetailsLoad">
      {isLoading ? (
        <div className="loading-indicator">
          <div className="dot" id="dot1"></div>
          <div className="dot" id="dot2"></div>
          <div className="dot" id="dot3"></div>
          <div className="dot" id="dot4"></div>
          <div className="dot" id="dot5"></div>
          <div className="dot" id="dot6"></div>
        </div>
      ) : (
        <motion.div
          className="storyDetails"
          initial={{ y: 100, opacity: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "linear" }}
        >
          <h1>{story.title}</h1>
          {story.idea && <h4>Ιδέα: {story.idea}</h4>}
          <button onClick={toggleFavorite} className="favorite">
            <span>
              {favorite
                ? "Αφαίρεση από τα Αγαπημένα"
                : "Προσθήκη στα Αγαπημένα"}
            </span>
            <img src={heart} alt="Favorite" />
          </button>
          <div className="storyDetailsCon">
            <motion.img
              className="storyDetailsImage"
              src={story.image}
              alt={story.title}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </div>
          {paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
          {story.secondImage && (
            <div className="storyDetailsCon">
              <motion.img
                className="storyDetailsImage"
                src={story.secondImage}
                alt={story.title}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
            </div>
          )}
          <button className="back" onClick={() => navigate(-1)}>
            Back
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default StoryDetails;
