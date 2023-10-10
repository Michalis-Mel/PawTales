import { useState } from "react";
import { slice } from "lodash";

//Stories
import animalStories from "../stories";

//Components
import Story from "../components/Story";

//Images
import grid from "../assets/icons/grid.png";
import details from "../assets/icons/details.png";

const Stories = () => {
  //Grid Functionality
  const [isGrid, setIsGrid] = useState(false);

  //Load More Functionality
  const initialStories = isGrid ? 12 : 5;
  const [isCompleted, setIsCompleted] = useState(false);
  const [index, setIndex] = useState(initialStories);
  const stories = slice(animalStories, 0, index);

  const loadMore = () => {
    isGrid ? setIndex(index + 12) : setIndex(index + 5);

    if (index >= animalStories.length) {
      setIsCompleted(true);
    } else {
      setIsCompleted(false);
    }
  };

  return (
    <div className="stories">
      <h1>Οι Ιστορίες μας</h1>
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
      <div className={`storiesList ${isGrid ? "gridList" : "detailsList"}`}>
        {stories.map((story) => (
          <Story key={story.id} story={story} />
        ))}
      </div>
      <button className="loadMore" disabled={isCompleted} onClick={loadMore}>
        Περισσότερες Ιστορίες
      </button>
    </div>
  );
};

export default Stories;
