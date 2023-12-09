import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { collection, getDocs, doc, setDoc, getDoc } from "firebase/firestore";
import { firestore } from "../helpers/firebase";
import heart from "../assets/icons/heart.svg";
import musicOn from "../assets/icons/music-on.svg";
import musicOff from "../assets/icons/music-off.svg";
import play from "../assets/icons/play.svg";
import pause from "../assets/icons/pause.svg";
import { AuthContext } from "../Context/AuthContext";
import LogInModal from "../components/LogInModal";
import ShareStory from "../components/ShareStory";

const StoryDetails = () => {
  const navigate = useNavigate();
  const url = useParams();
  const { user } = useContext(AuthContext);

  const [story, setStory] = useState({});
  const [allStories, setAllStories] = useState([]);
  const [favorite, setFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [modalActive, setModalActive] = useState(false);
  const [audioPlayer, setAudioPlayer] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioInfo, setAudioInfo] = useState({
    currentTime: 0,
    duration: 0,
  });

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

      if (currentStory) {
        setStory(currentStory);

        if (story.audio) {
          const audio = new Audio(story.audio);
          audio.addEventListener("loadedmetadata", () => {
            setAudioInfo({
              ...audioInfo,
              duration: audio.duration,
            });
          });
          audio.addEventListener("timeupdate", timeUpdateHandler); // Add this line

          setAudioPlayer(audio);
        }
      }

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allStories, url, isLoading, user, story.audio]);

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

  const handlePause = () => {
    if (audioPlayer) {
      audioPlayer.pause();
      audioPlayer.removeEventListener("timeupdate", timeUpdateHandler);
      setIsPlaying(false);
    }
  };
  const handlePlay = () => {
    if (audioPlayer) {
      audioPlayer.play();
      audioPlayer.addEventListener("timeupdate", timeUpdateHandler);
      setIsPlaying(true);
    }
  };

  const getTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration || 0;
    if (current === duration) {
      setAudioInfo({ ...audioInfo, currentTime: 0, duration });
      setIsPlaying(false);
    } else {
      setAudioInfo({ ...audioInfo, currentTime: current, duration });
    }
  };

  const handleSeek = (value) => {
    setAudioInfo({ ...audioInfo, currentTime: value });
    if (audioPlayer) {
      audioPlayer.currentTime = value;
    }
  };

  const handleSeekComplete = () => {
    if (audioPlayer && isPlaying) {
      audioPlayer.play();
    }
  };

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
          <div className="storyBtns">
            {story.audio && (
              <div className="player">
                {isPlaying ? (
                  <button onClick={handlePause} className="audio playing">
                    <img src={musicOff} alt="Pause" />
                    <span>Παύση</span>
                  </button>
                ) : (
                  <button onClick={handlePlay} className="audio paused">
                    <img src={musicOn} alt="Play" />
                    <span>Ακούστε την ιστορία</span>
                  </button>
                )}
                <div className={`time-control ${isPlaying ? "show" : "hide"}`}>
                  <p>{getTime(audioInfo.currentTime)}</p>
                  <div className="track">
                    <input
                      type="range"
                      min={0}
                      max={audioInfo.duration}
                      step={0.001}
                      value={audioInfo.currentTime}
                      onChange={(e) => handleSeek(parseFloat(e.target.value))}
                      onMouseUp={handleSeekComplete}
                    />
                  </div>
                  <p>
                    {audioInfo.duration ? getTime(audioInfo.duration) : "0:00"}
                  </p>
                </div>
              </div>
            )}
            <button onClick={toggleFavorite} className="favorite">
              <img src={heart} alt="Favorite" />
              <span>{favorite ? "Αφαίρεση" : "Προσθήκη "}</span>
            </button>
          </div>
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
          <ShareStory story={story} />
          <button className="back" onClick={() => navigate(-1)}>
            Πίσω
          </button>
        </motion.div>
      )}
      <LogInModal modalActive={modalActive} setModalActive={setModalActive} />
    </div>
  );
};

export default StoryDetails;
