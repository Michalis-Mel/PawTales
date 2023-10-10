import { useState } from "react";
import { slice } from "lodash";

//Stories
import animalStories from "../stories";

//Components
import Story from "../components/Story";
import SearchBar from "../components/SearchBar";

//Images
import grid from "../assets/icons/grid.png";
import details from "../assets/icons/details.png";

const Stories = () => {
  //Search Functionality
  const [searchedStories, setSearchedStories] = useState(animalStories);
  //Grid Functionality
  const [isGrid, setIsGrid] = useState(false);

  //Load More Functionality
  const initialStoriesShown = isGrid ? 12 : 5;
  const [isCompleted, setIsCompleted] = useState(false);
  const [index, setIndex] = useState(initialStoriesShown);
  const stories = slice(searchedStories, 0, index);

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
          animalStories={animalStories}
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

      <div className={`storiesList ${isGrid ? "gridList" : "detailsList"}`}>
        {searchedStories.length > 0 ? (
          stories.map((story) => <Story key={story.id} story={story} />)
        ) : (
          <>
            <h2 className="notFound">Δεν Βρέθηκαν Ιστορίες</h2>
            <a href="/" className="back">
              Αρχική Σελίδα
            </a>
          </>
        )}
      </div>
      {searchedStories.length > 0 && (
        <button className="loadMore" disabled={isCompleted} onClick={loadMore}>
          Περισσότερες Ιστορίες
        </button>
      )}
    </div>
  );
};

export default Stories;
