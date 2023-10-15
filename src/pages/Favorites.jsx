import React, { useContext, useEffect, useState } from "react";
import { slice } from "lodash";
import { NavLink } from "react-router-dom";
import StoryItem from "../components/StoryItem";
import { AuthContext } from "../Context/AuthContext";
import { getDoc, doc, collection, getDocs } from "firebase/firestore";
import { firestore } from "../firebase";

const Favorites = () => {
  const { user } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(true);
  const [stories, setStories] = useState([]);
  const [favoriteStories, setFavoriteStories] = useState([]);

  //Load More Functionality
  const initialStoriesShown = 5;
  const [index, setIndex] = useState(initialStoriesShown);
  const shortedStories = slice(stories, 0, index);

  useEffect(() => {
    const fetchFavoriteStories = async () => {
      if (user) {
        const favDocRef = doc(firestore, "favorites", user.uid);
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
  }, [user]);

  useEffect(() => {
    const fetchStories = async () => {
      const storiesCollection = collection(firestore, "stories");
      const storiesSnapshot = await getDocs(storiesCollection);
      const storiesData = storiesSnapshot.docs.map((doc) => doc.data());

      // Find favorite stories by comparing with the user's favorite data
      const favoriteIdsArray = favoriteStories
        .filter((item) => item.isFavorite)
        .map((item) => item.id);

      const favoriteStoriesData = storiesData.filter((story) =>
        favoriteIdsArray.includes(story.id.toString())
      );

      setStories(favoriteStoriesData);
    };

    fetchStories();
  }, [favoriteStories]);

  const removeFromFavoritesId = (storyId) => {
    setStories((prevStories) =>
      prevStories.filter((story) => story.id !== storyId)
    );
  };

  return (
    <div className="favorites">
      <h1>Οι Αγαπημένες σας Ιστορίες</h1>

      {isLoading ? (
        <div className="loading-indicator">
          <div className="dot" id="dot1"></div>
          <div className="dot" id="dot2"></div>
          <div className="dot" id="dot3"></div>
          <div className="dot" id="dot4"></div>
          <div className="dot" id="dot5"></div>
          <div className="dot" id="dot6"></div>
        </div>
      ) : user ? (
        <div className="favoritesCon">
          {stories.length > 0 ? (
            shortedStories.map((story) => (
              <StoryItem
                key={story.id}
                story={story}
                removeFromFavoritesId={removeFromFavoritesId}
              />
            ))
          ) : (
            <h2 className="emptyFav">
              Δεν υπάρχουν ιστορίες στα αγαπημένα σας.
            </h2>
          )}
          {stories.length > index && (
            <button className="loadMore" onClick={() => setIndex(index + 5)}>
              Περισσότερες Ιστορίες
            </button>
          )}
        </div>
      ) : (
        <div className="favoritesCon">
          <div className="favLogin">
            <h2>
              Για να μπορέσετε να δείτε τις αγαπημένες σας ιστορίες πρέπει να
              συνδεθείτε!
            </h2>
            <NavLink to="/login">Σύνδεση</NavLink>
          </div>
        </div>
      )}
    </div>
  );
};

export default Favorites;
