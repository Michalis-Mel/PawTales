import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { collection, getDocs, doc, setDoc, getDoc } from "firebase/firestore";
import { firestore } from "../firebase";
import heart from "../assets/icons/heart.svg";
import { AuthContext } from "../Context/AuthContext";
import LogInModal from "../components/LogInModal";

const StoryDetails = () => {
  const navigate = useNavigate();
  const url = useParams();
  const { user } = useContext(AuthContext);

  const [story, setStory] = useState({});
  const [allStories, setAllStories] = useState([]);
  const [favorite, setFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [modalActive, setModalActive] = useState(false);

  useEffect(() => {
    const fetchStories = async () => {
      const storiesCollection = collection(firestore, "stories");
      const storiesSnapshot = await getDocs(storiesCollection);
      const storiesData = storiesSnapshot.docs.map((doc) => doc.data());
      setAllStories(storiesData);

      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    };

    fetchStories();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      const currentStory = allStories.find(
        (myStory) => myStory.id === parseInt(url.id)
      );
      if (currentStory) setStory(currentStory);

      // Check if the story is a favorite for the user
      if (user) {
        // Replace 'favorites' with the name of your Firestore collection
        const favoritesRef = doc(firestore, "favorites", user.uid);
        getDoc(favoritesRef)
          .then((docSnap) => {
            if (docSnap.exists()) {
              const data = docSnap.data();
              setFavorite(data[url.id] === true);
            } else {
              setFavorite(false);
            }
          })
          .catch((error) => {
            console.error("Error checking favorite:", error);
          });
      }
    }
  }, [allStories, url, isLoading, user]);

  const toggleFavorite = async () => {
    if (user) {
      setFavorite(!favorite);
      // Replace 'favorites' with the name of your Firestore collection
      const favoritesRef = doc(firestore, "favorites", user.uid);

      // Update the favorites collection based on the favorite state
      if (favorite) {
        // Remove the story from the user's favorites
        await setDoc(favoritesRef, { [url.id]: false }, { merge: true });
      } else {
        // Add the story to the user's favorites
        await setDoc(favoritesRef, { [url.id]: true }, { merge: true });
      }
    } else {
      setModalActive(true);
    }
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
      <LogInModal modalActive={modalActive} setModalActive={setModalActive} />
    </div>
  );
};

export default StoryDetails;
