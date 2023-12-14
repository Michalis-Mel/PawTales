import { useEffect, useState, useContext } from "react";
import {
  collection,
  getDocs,
  setDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { firestore } from "../helpers/firebase";
import { StoriesContext } from "../Context/StoriesContext";

const AddTopStories = () => {
  const { allStories, isLoading, setIsLoading } = useContext(StoriesContext);

  const [topStories, setTopStories] = useState([]);

  useEffect(() => {
    const fetchTopStories = async () => {
      try {
        const topStoriesCollection = collection(firestore, "topStories");
        const topStoriesSnapshot = await getDocs(topStoriesCollection);
        const topStoriesData = topStoriesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTopStories(topStoriesData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching top stories:", error);
        setIsLoading(false);
      }
    };

    fetchTopStories();
  }, [setIsLoading, topStories]);

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
        setTopStories((prevTopStories) =>
          prevTopStories.filter((story) => story.id !== storyId)
        );
      } else {
        // If it's not in topStories, add it
        const selectedStory = allStories.find((story) => story.id === storyId);

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
      {!isLoading && allStories.length === 0 && <p>Δεν βρέθηκαν ιστορίες.</p>}
      {!isLoading &&
        allStories.length > 0 &&
        allStories.map((story) => (
          <div key={story.id}>
            <h4>{story.title}</h4>
            <button onClick={() => handleAddRemoveStory(story.id)}>
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
