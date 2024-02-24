import React, { useContext, useEffect, useState } from 'react';
import { slice } from 'lodash';
import { NavLink } from 'react-router-dom';
import StoryItem from '../components/StoryItem';
import { StoriesContext } from '../Context/StoriesContext';
import { AuthContext } from '../Context/AuthContext';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../helpers/firebase';
import { motion } from 'framer-motion';
import Loading from '../components/Loading';

const Favorites = () => {
  const { user } = useContext(AuthContext);
  const { allStories, isLoading, setIsLoading } = useContext(StoriesContext);

  const [favStoriesShow, setStories] = useState([]);
  const [favoriteStories, setFavoriteStories] = useState([]);

  //Load More Functionality
  const initialStoriesShown = 5;
  const [index, setIndex] = useState(initialStoriesShown);
  const shortedStories = slice(favStoriesShow, 0, index);

  useEffect(() => {
    const fetchFavoriteStories = async () => {
      if (user) {
        const favDocRef = doc(db, 'favorites', user.uid);
        const docSnap = await getDoc(favDocRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          const favoriteStoryData = Object.keys(data).map((storyId) => ({
            id: storyId,
            isFavorite: data[storyId],
          }));

          setFavoriteStories(favoriteStoryData);
        }
      }

      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    };

    fetchFavoriteStories();
  }, [user, setIsLoading]);

  useEffect(() => {
    // Find favorite stories by comparing with the user's favorite data
    const favoriteIdsArray = favoriteStories
      .filter((item) => item.isFavorite)
      .map((item) => item.id);

    const favoriteStoriesData = allStories.filter((story) =>
      favoriteIdsArray.includes(story.id.toString())
    );

    setStories(favoriteStoriesData);
  }, [favoriteStories, allStories]);

  const removeFromFavoritesId = (storyId) => {
    setStories((prevStories) =>
      prevStories.filter((story) => story.id !== storyId)
    );
  };

  return (
    <div className='favorites'>
      <h1>Οι Αγαπημένες σας Ιστορίες</h1>

      {isLoading ? (
        <Loading />
      ) : user ? (
        <motion.div
          className='favoritesCon'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          {favStoriesShow.length > 0 ? (
            shortedStories.map((story) => (
              <StoryItem
                key={story.id}
                story={story}
                removeFromFavoritesId={removeFromFavoritesId}
              />
            ))
          ) : (
            <h2 className='emptyFav'>
              Δεν υπάρχουν ιστορίες στα αγαπημένα σας.
            </h2>
          )}
          {favStoriesShow.length > index && (
            <button className='loadMore' onClick={() => setIndex(index + 5)}>
              Περισσότερες Ιστορίες
            </button>
          )}
        </motion.div>
      ) : (
        <motion.div
          className='favoritesCon'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className='favLogin'>
            <h2>
              Για να μπορέσετε να δείτε τις αγαπημένες σας ιστορίες πρέπει να
              συνδεθείτε!
            </h2>
            <NavLink to='/login'>Σύνδεση</NavLink>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Favorites;
