import React, { createContext, useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../helpers/firebase';

export const StoriesContext = createContext([]);

export function StoriesProvider({ children }) {
  const [allStories, setAllStories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const allStoriesSnapshot = await getDocs(collection(db, 'stories'));
        const allStoriesData = allStoriesSnapshot.docs.map((doc) => doc.data());
        setAllStories(allStoriesData);
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    };

    fetchStories();
  }, []);

  return (
    <StoriesContext.Provider
      value={{ allStories, setAllStories, isLoading, setIsLoading }}
    >
      {children}
    </StoriesContext.Provider>
  );
}
