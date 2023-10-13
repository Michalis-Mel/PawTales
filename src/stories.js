import { collection, addDoc } from "firebase/firestore";
import { firestore } from "./firebase";

const animalStories = [];

export const topStories = [];

// async function addStoriesToFirestore() {
//   const storiesCollection = collection(firestore, "top stories"); // 'stories' is the name of your Firestore collection

//   try {
//     for (const story of topStories) {
//       await addDoc(storiesCollection, story);
//       console.log(`Added story: ${story.title}`);
//     }
//   } catch (error) {
//     console.error("Error adding stories: ", error);
//   }
// }

// // Usage
// addStoriesToFirestore().then(() => {
//   console.log("All stories added to Firestore.");
// });

export default animalStories;
