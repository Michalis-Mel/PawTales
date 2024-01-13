import { useContext, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";

//Database
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { firestore } from "../helpers/firebase";
import { AuthContext } from "../Context/AuthContext";

//Components
import LogInModal from "../components/LogInModal";

const RatingStars = ({ setModalActive }) => {
  const { user } = useContext(AuthContext);
  const url = useParams();

  const fetchStoryData = useCallback(async () => {
    const storyRef = doc(firestore, "stories", url.id);
    const storyDoc = await getDoc(storyRef);

    if (storyDoc.exists()) {
      const storyData = storyDoc.data();
      const ratings = storyData.ratings || [];
      const userIndex = ratings.indexOf(user.uid);

      return { storyRef, ratings, userIndex };
    } else {
      console.log("No such document!");
      return null;
    }
  }, [url.id, user.uid]);

  useEffect(() => {
    const setInitialRating = async () => {
      const storyData = await fetchStoryData();

      if (storyData) {
        const { userIndex } = storyData;

        if (userIndex !== -1) {
          const userRating = storyData.ratings[userIndex + 1];
          document.getElementById(`rs${userRating}`).click();
        } else {
          document.getElementById("rs0").click();
        }
      }
    };

    setInitialRating();
  }, [user, url.id, fetchStoryData]);

  const handleRating = async (rate, event) => {
    if (user) {
      const storyData = await fetchStoryData();

      if (storyData) {
        const { storyRef, ratings, userIndex } = storyData;

        if (userIndex !== -1) {
          ratings[userIndex + 1] = rate;
        } else {
          ratings.push(user.uid, rate);
        }

        await updateDoc(storyRef, { ratings });
      }
    } else {
      event.preventDefault();
      setModalActive(true);
    }
  };

  return (
    <div className="rating-stars">
      <h6>Βαθμολογήστε την ιστορία</h6>
      <input type="radio" name="rating" id="rs0" />
      <label htmlFor="rs0"></label>
      <input type="radio" name="rating" id="rs1" />
      <label htmlFor="rs1" onClick={() => handleRating(1)}></label>
      <input type="radio" name="rating" id="rs2" />
      <label htmlFor="rs2" onClick={() => handleRating(2)}></label>
      <input type="radio" name="rating" id="rs3" />
      <label htmlFor="rs3" onClick={() => handleRating(3)}></label>
      <input type="radio" name="rating" id="rs4" />
      <label htmlFor="rs4" onClick={() => handleRating(4)}></label>
      <input type="radio" name="rating" id="rs5" />
      <label htmlFor="rs5" onClick={() => handleRating(5)}></label>
      <LogInModal />
    </div>
  );
};

export default RatingStars;
