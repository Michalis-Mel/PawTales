import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

//Database
import {
  doc,
  getDoc,
  updateDoc,
  deleteField,
  increment,
  setDoc,
} from 'firebase/firestore';

import { firestore } from '../helpers/firebase';
import { AuthContext } from '../Context/AuthContext';
import { StoriesContext } from '../Context/StoriesContext';

//Components
import LogInModal from '../components/LogInModal';
import ShareStory from '../components/ShareStory';
import RatingStars from '../components/RatingStars';

//Images
import star from '../assets/icons/star.png';
import heart from '../assets/icons/heart.svg';
import musicOn from '../assets/icons/music-on.svg';
import musicOff from '../assets/icons/music-off.svg';
import slow from '../assets/icons/minus.png';
import fast from '../assets/icons/plus.png';
import Loading from '../components/Loading';

const StoryDetails = () => {
  const navigate = useNavigate();
  const url = useParams();
  const location = useLocation();
  const { user } = useContext(AuthContext);
  const { allStories, isLoading } = useContext(StoriesContext);

  const [story, setStory] = useState({});
  const [errorMessage, setErrorMessage] = useState();
  const [favorite, setFavorite] = useState(false);
  const [modalActive, setModalActive] = useState(false);
  const [audioPlayer, setAudioPlayer] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioInfo, setAudioInfo] = useState({
    currentTime: 0,
    duration: 0,
  });
  let averageRating = null;

  // Filter the array to get only the ratings
  if (story.ratings) {
    const ratingsOnly = story.ratings.filter((_, index) => index % 2 !== 0);

    // Calculate average rating

    if (ratingsOnly.length > 0) {
      const sum = ratingsOnly.reduce((a, b) => a + b, 0);
      averageRating = Math.ceil(sum / ratingsOnly.length);
    }
  }
  useEffect(() => {
    if (story) {
      const incrementVisits = async () => {
        try {
          // Increment the visits field in the Firestore document
          const storyRef = doc(firestore, 'stories', story.id);
          await updateDoc(storyRef, {
            visits: increment(0.01),
          });
        } catch (error) {
          // console.error("Error:", error);
        }
      };

      incrementVisits();
    }
  }, [story]);

  useEffect(() => {
    if (!isLoading) {
      const currentStory = allStories.find((myStory) => myStory.id === url.id);

      if (currentStory) {
        setStory(currentStory);

        if (currentStory.audio) {
          const audio = new Audio(currentStory.audio);
          audio.addEventListener('loadedmetadata', () => {
            setAudioInfo({
              ...audioInfo,
              duration: audio.duration,
            });
          });
          audio.addEventListener('timeupdate', timeUpdateHandler);

          setAudioPlayer(audio);
        }
      } else {
        setErrorMessage(
          'Προέκυψε σφάλμα κατά τη λήψη της ιστορίας. Ελέγξτε τη σύνδεσή σας στο διαδίκτυο και προσπαθήστε ξανά.'
        );
      }

      // Check if the story is a favorite for the user
      if (user) {
        // Replace 'favorites' with the name of your Firestore collection
        const favoritesRef = doc(firestore, 'favorites', user.uid);
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
            console.error('Error checking favorite:', error);
          });
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allStories, url, isLoading, user]);

  const toggleFavorite = async () => {
    if (user) {
      setFavorite(!favorite);

      const favoritesRef = doc(firestore, 'favorites', user.uid);

      const docSnap = await getDoc(favoritesRef);

      if (!docSnap.exists()) {
        await setDoc(favoritesRef, {});
      }

      // Update the favorites collection based on the favorite state
      if (favorite) {
        // Remove the story from the user's favorites
        await updateDoc(favoritesRef, { [url.id]: deleteField() });
      } else {
        // Add the story to the user's favorites
        await updateDoc(favoritesRef, { [url.id]: true });
      }
    } else {
      setModalActive(true);
    }
  };

  const paragraphs = story.content ? story.content.split('<br />') : [];
  const parArray = Object.values(paragraphs);

  const handlePause = () => {
    if (audioPlayer) {
      audioPlayer.pause();
      audioPlayer.removeEventListener('timeupdate', timeUpdateHandler);
      setIsPlaying(false);
    }
  };
  const handlePlay = () => {
    if (audioPlayer) {
      audioPlayer.play();
      audioPlayer.addEventListener('timeupdate', timeUpdateHandler);
      setIsPlaying(true);
    }
  };

  const getTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const getAdjustedTime = (time, rate) => {
    const adjustedTime = time / rate;
    const minutes = Math.floor(adjustedTime / 60);
    const seconds = Math.floor(adjustedTime % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
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

  const handleSpeedDown = () => {
    if (audioPlayer) {
      if (audioPlayer.playbackRate === 1.2) {
        audioPlayer.playbackRate = 1;
      } else if (audioPlayer.playbackRate === 1) {
        audioPlayer.playbackRate = 0.9;
      }
    }
  };

  const handleSpeedUp = () => {
    if (audioPlayer) {
      if (audioPlayer.playbackRate === 0.9) {
        audioPlayer.playbackRate = 1;
      } else if (audioPlayer.playbackRate === 1) {
        audioPlayer.playbackRate = 1.2;
      }
    }
  };

  useEffect(() => {
    // Cleanup function
    return () => {
      if (audioPlayer) {
        audioPlayer.pause();
        audioPlayer.removeEventListener('timeupdate', timeUpdateHandler);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, audioPlayer]);
  return (
    <div className='storyDetailsLoad'>
      {isLoading ? (
        <Loading />
      ) : story ? (
        <motion.div
          className='storyDetails'
          initial={{ y: 100, opacity: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: 'linear' }}
        >
          <h1>{story.title}</h1>
          <h3 className='date'>Ημερομηνία : {story.dateCreated}</h3>
          {story.idea && <h4 className='idea'>Ιδέα : {story.idea}</h4>}
          {averageRating && (
            <h3 className='rating'>
              Βαθμολογία :
              <div className='stars'>
                {Array.from({ length: averageRating }, (_, index) => (
                  <img key={index} src={star} alt='star' />
                ))}
              </div>
            </h3>
          )}
          <div className='storyBtns'>
            {story.audio && (
              <div className='player'>
                {isPlaying ? (
                  <button onClick={handlePause} className='audio playing'>
                    <img src={musicOff} alt='Pause' />
                    <span>Παύση</span>
                  </button>
                ) : (
                  <button onClick={handlePlay} className='audio paused'>
                    <img src={musicOn} alt='Play' />
                    <span>Ακούστε την ιστορία</span>
                  </button>
                )}
                <div className={`time-control ${isPlaying ? 'show' : 'hide'}`}>
                  <div className='time-control-top'>
                    <p>
                      {getAdjustedTime(
                        audioInfo.currentTime,
                        audioPlayer.playbackRate
                      )}
                    </p>
                    <div className='track'>
                      <input
                        type='range'
                        min={0}
                        max={audioInfo.duration}
                        step={0.001}
                        value={audioInfo.currentTime}
                        onChange={(e) => handleSeek(parseFloat(e.target.value))}
                        onMouseUp={handleSeekComplete}
                      />
                    </div>
                    <p>
                      {audioInfo.duration
                        ? getAdjustedTime(
                            audioInfo.duration,
                            audioPlayer.playbackRate
                          )
                        : '0:00'}
                    </p>
                  </div>
                  <div className='time-control-bot'>
                    <button onClick={handleSpeedDown} className='speed'>
                      <img src={slow} alt='Slow' />
                    </button>
                    <p>Ταχύτητα αναπαραγωγής</p>
                    <button onClick={handleSpeedUp} className='speed'>
                      <img src={fast} alt='Fast' />
                    </button>
                  </div>
                </div>
              </div>
            )}
            <button onClick={toggleFavorite} className='favorite'>
              <img src={heart} alt='Favorite' />
              <span>{favorite ? 'Αφαίρεση' : 'Προσθήκη '}</span>
            </button>
          </div>
          {story.image && (
            <div className={`storyDetailsCon ${isPlaying ? 'down' : 'up'} `}>
              <motion.img
                className='storyDetailsImage'
                src={story.image}
                alt={story.title}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 1.5 } }}
                whileHover={{ scale: 1.1, transition: { duration: 0.5 } }}
              />
            </div>
          )}
          {parArray
            .slice(0, Math.floor(parArray.length / 2))
            .map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          {story.secondImage && (
            <div className='storyDetailsCon'>
              <motion.img
                className='storyDetailsImage'
                src={story.secondImage}
                alt={story.title}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 1.5 } }}
                whileHover={{ scale: 1.1, transition: { duration: 0.5 } }}
              />
            </div>
          )}
          {parArray
            .slice(Math.floor(parArray.length / 2))
            .map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          {story.thirdImage && (
            <div className='storyDetailsCon'>
              <motion.img
                className='storyDetailsImage'
                src={story.thirdImage}
                alt={story.title}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 1.5 } }}
                whileHover={{ scale: 1.1, transition: { duration: 0.5 } }}
              />
            </div>
          )}
          <RatingStars setModalActive={setModalActive} />
          <ShareStory story={story} />
          <button className='back' onClick={() => navigate(-1)}>
            Πίσω
          </button>
        </motion.div>
      ) : (
        <h2 className='notFound'>{errorMessage}</h2>
      )}
      <LogInModal modalActive={modalActive} setModalActive={setModalActive} />
    </div>
  );
};

export default StoryDetails;
