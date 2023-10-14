import { useState, useEffect } from "react";
import { slice } from "lodash";
import { collection, getDocs } from "@firebase/firestore";
import { firestore } from "../firebase";
import { motion } from "framer-motion";

//Components
import StoryItem from "../components/StoryItem";
import SearchBar from "../components/SearchBar";

//Images
import grid from "../assets/icons/grid.png";
import details from "../assets/icons/details.png";

const Stories = () => {
  const [stories, setStories] = useState([]);
  const [searchedStories, setSearchedStories] = useState([]);

  // Loading state to handle initial loading
  const [isLoading, setIsLoading] = useState(true);

  //Grid Functionality
  const [isGrid, setIsGrid] = useState(false);

  //Load More Functionality
  const initialStoriesShown = isGrid ? 12 : 5;
  const [isCompleted, setIsCompleted] = useState(false);
  const [index, setIndex] = useState(initialStoriesShown);
  const shortedStories = slice(searchedStories, 0, index);

  // Fetch stories from Firestore
  useEffect(() => {
    const fetchStories = async () => {
      const storiesCollection = collection(firestore, "stories");
      const storiesSnapshot = await getDocs(storiesCollection);
      const storiesData = storiesSnapshot.docs.map((doc) => doc.data());

      // Sort stories by creation date in descending order (most recent to oldest)
      const sortedStories = storiesData.sort((a, b) => {
        const dateA = new Date(
          a.dateCreated.split("-").reverse().join("-")
        ).getTime();
        const dateB = new Date(
          b.dateCreated.split("-").reverse().join("-")
        ).getTime();
        return dateB - dateA;
      });

      setStories(sortedStories);
      setSearchedStories(sortedStories);

      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    };

    fetchStories();
  }, []);

  const loadMore = () => {
    isGrid ? setIndex(index + 12) : setIndex(index + 5);

    if (index >= searchedStories.length) {
      setIsCompleted(true);
    } else {
      setIsCompleted(false);
    }
  };

  return (
    <div className="stories">
      <h1>Οι Ιστορίες μας</h1>
      <div className="searchBar">
        <SearchBar
          animalStories={stories}
          setSearchedStories={setSearchedStories}
        />
        <div className="layoutBtns">
          <button
            className={`details ${isGrid ? "active" : ""}`}
            onClick={() => setIsGrid(!isGrid)}
          >
            <img src={details} alt="Details" />
          </button>
          <button
            className={`grid ${isGrid ? "" : "active"}`}
            onClick={() => setIsGrid(!isGrid)}
          >
            <img src={grid} alt="Grid" />
          </button>
        </div>
      </div>

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
          className="storiesList"
          initial={{ y: 100, opacity: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "linear" }}
        >
          <div
            className={`storiesListCon ${isGrid ? "gridList" : "detailsList"}`}
          >
            {searchedStories.length > 0 ? (
              shortedStories.map((story) => (
                <StoryItem key={story.id} story={story} />
              ))
            ) : (
              <h2 className="notFound">Δεν Βρέθηκαν Ιστορίες</h2>
            )}
          </div>
          {searchedStories.length > index && (
            <button
              className="loadMore"
              disabled={isCompleted}
              onClick={loadMore}
            >
              Περισσότερες Ιστορίες
            </button>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default Stories;
