import React, { useEffect, useState } from "react";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { firestore } from "../helpers/firebase";
import lock from "../assets/icons/lock.png";
import unlock from "../assets/icons/unlock.png";

const DeleteStories = () => {
  const [stories, setStories] = useState([]);
  const [storyIds, setStoryIds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLocked, setIsLocked] = useState(true);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const storiesCollection = collection(firestore, "stories");
        const storiesSnapshot = await getDocs(storiesCollection);
        const storiesData = storiesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        const ids = storiesSnapshot.docs.map((doc) => doc.id);
        setStoryIds(ids);
        setStories(storiesData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching stories:", error);
        setIsLoading(false);
      }
    };

    fetchStories();
  }, []);

  const handleDelete = async (storyId) => {
    try {
      const storyRef = doc(firestore, "stories", storyId);
      await deleteDoc(storyRef);
      setStories((prevStories) =>
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
          {stories.map((story, i) => (
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
