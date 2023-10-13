import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { firestore } from "../firebase";
import {
  addDoc,
  collection,
  getDocs,
  getDoc,
  query,
  where,
  deleteDoc,
  doc,
} from "@firebase/firestore";

import animalStories from "../stories";
import heart from "../assets/icons/heart.svg";

const StoryDetails = () => {
  const navigate = useNavigate();
  const url = useParams();

  const [story, setStory] = useState(animalStories[0]);
  const [allStories] = useState(animalStories);
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    const currentStory = allStories.filter(
      (myStory) => myStory.id === parseInt(url.id)
    );
    if (currentStory[0]) setStory(currentStory[0]);
  }, [allStories, url]);

  //Format the story
  const paragraphs = story.content.split("\n");

  const toggleFavorite = async (e) => {
    e.preventDefault();
    setFavorite(!favorite);
  };

  return (
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
          {favorite ? "Αφαίρεση από τα Αγαπημένα" : "Προσθήκη στα Αγαπημένα"}
        </span>
        <img src={heart} alt="Favorite" />
      </button>

      <motion.div
        className="storyDetailsCon"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <motion.img
          className="storyDetailsImage"
          src={story.image}
          alt={story.title}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </motion.div>
      {paragraphs.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
      <motion.div
        className="storyDetailsCon"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <motion.img
          className="storyDetailsImage"
          src={story.secondImage}
          alt={story.title}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </motion.div>
      <button className="back" onClick={() => navigate(-1)}>
        Back
      </button>
    </motion.div>
  );
};

export default StoryDetails;
