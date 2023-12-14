import React, { useEffect, useState, useContext } from "react";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { firestore } from "../helpers/firebase";
import { StoriesContext } from "../Context/StoriesContext";
import lock from "../assets/icons/lock.png";
import unlock from "../assets/icons/unlock.png";

const DeleteStories = () => {
  const { allStories, setAllStories, isLoading, setIsLoading } =
    useContext(StoriesContext);
  const [storyIds, setStoryIds] = useState([]);
  const [isLocked, setIsLocked] = useState(true);

  useEffect(() => {
    const ids = allStories.map((doc) => doc.id);
    setStoryIds(ids);
    setIsLoading(false);
  }, [allStories, setIsLoading]);

  const handleDelete = async (storyId) => {
    try {
      const storyRef = doc(firestore, "stories", storyId);
      await deleteDoc(storyRef);
      setAllStories((prevStories) =>
        prevStories.filter((story) => story.id !== storyId)
      );
      setStoryIds((prevIds) => prevIds.filter((id) => id !== storyId));
    } catch (error) {
      console.error("Error deleting story:", error);
    }
  };

  const handleLockUnlock = () => {
    setIsLocked((prevIsLocked) => !prevIsLocked);
  };

  return (
    <div className="edit-stories-container">
      <h1>Διαγραφή Ιστοριών</h1>
      <button className="lock" onClick={handleLockUnlock}>
        <img
          src={isLocked ? lock : unlock}
          alt={isLocked ? "Unlock" : "Lock"}
        />
      </button>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <ul className="stories-list">
          {allStories.map((story, i) => (
            <li key={story.id} className="story-item">
              <span>{story.title}</span>
              <button
                onClick={() => handleDelete(storyIds[i])}
                disabled={isLocked}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DeleteStories;
