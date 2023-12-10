import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  setDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { firestore } from "../helpers/firebase";

const AddTopStories = () => {
  const [stories, setStories] = useState([]);
  const [storyIds, setStoryIds] = useState([]);
  const [topStories, setTopStories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const storiesCollection = collection(firestore, "stories");
        const topStoriesCollection = collection(firestore, "topStories");

        const storiesSnapshot = await getDocs(storiesCollection);
        const topStoriesSnapshot = await getDocs(topStoriesCollection);

        const storiesData = storiesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const topStoriesData = topStoriesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const ids = storiesSnapshot.docs.map((doc) => doc.id);
        const idsTop = topStoriesSnapshot.docs.map((doc) => doc.id);
        setStoryIds(ids);
        setStories(storiesData);
        setTopStories(topStoriesData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching stories:", error);
        setIsLoading(false);
      }
    };

    fetchStories();
  }, [stories, storyIds, topStories]);

  const handleAddRemoveStory = async (storyId) => {
    try {
      // Check if the story is already in topStories
      const isStoryInTopStories = topStories.some(
        (story) => story.id === storyId
      );

      if (isStoryInTopStories) {
        // If it's in topStories, remove it
        const storyDoc = doc(firestore, "topStories", storyId);
        await deleteDoc(storyDoc);
        setStories((prevStories) =>
          prevStories.filter((story) => story.id !== storyId)
        );
        setStoryIds((prevIds) => prevIds.filter((id) => id !== storyId));
      } else {
        // If it's not in topStories, add it
        const selectedStory = stories.find(
          (story, i) => storyIds[i] === storyId
        );

        if (selectedStory) {
          await setDoc(doc(firestore, "topStories", storyId), {});
        }
      }
    } catch (error) {
      console.error("Error adding/removing story:", error);
    }
  };

  return (
    <div className="add-top-stories-container">
      <h1>Προσθήκη Κορυφαίων Ιστοριών</h1>
      {isLoading && <p>Loading...</p>}
      {!isLoading && stories.length === 0 && <p>Δεν βρέθηκαν ιστορίες.</p>}
      {!isLoading &&
        stories.length > 0 &&
        stories.map((story, i) => (
          <div key={story.id}>
            <h4>{story.title}</h4>
            <button onClick={() => handleAddRemoveStory(storyIds[i])}>
              {topStories.some((topStory) => topStory.id === story.id)
                ? "Αφαίρεση"
                : "Προσθήκη"}
            </button>
          </div>
        ))}
    </div>
  );
};

export default AddTopStories;
