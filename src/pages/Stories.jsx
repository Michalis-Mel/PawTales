import { useState } from "react";
import { slice } from "lodash";

//Stories
import animalStories from "../stories";

import Story from "../components/Story";

const Stories = () => {
  const [isCompleted, setIsCompleted] = useState(false);
  const [index, setIndex] = useState(5);
  const stories = slice(animalStories, 0, index);

  const loadMore = () => {
    setIndex(index + 5);
    if (index >= animalStories.length) {
      setIsCompleted(true);
    } else {
      setIsCompleted(false);
    }
  };

  return (
    <div className="stories">
      <h1>Οι Ιστορίες μας</h1>
      <div className="storiesList">
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
