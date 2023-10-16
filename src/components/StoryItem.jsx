import { NavLink, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { setDoc, doc } from "@firebase/firestore";
import { firestore } from "../helpers/firebase";
import { onSnapshot } from "firebase/firestore";

import x from "../assets/icons/x.png";

const StoryItem = ({ story, removeFromFavoritesId }) => {
  const { id, title, idea, image, smallDescription, dateCreated } = story;
  const location = useLocation();
  const { user } = useContext(AuthContext);

  const removeFromFavorites = async () => {
    if (user) {
      const favoritesRef = doc(firestore, "favorites", user.uid);
      await setDoc(favoritesRef, { [id]: false }, { merge: true });

      removeFromFavoritesId(id);
    }
  };

  const isFavoritesPage = location.pathname === "/PawTales/favorites";
  const [isFavorite, setIsFavorite] = useState(true);

  useEffect(() => {
    if (user) {
      const favDocRef = doc(firestore, "favorites", user.uid);
      const unsubscribe = onSnapshot(favDocRef, (doc) => {
        const data = doc.data();
        if (data && data[id] !== undefined) {
          setIsFavorite(data[id]);
        }
      });

      return unsubscribe;
    }
  }, [user, id]);

  return (
    <>
      {isFavoritesPage && user ? (
        isFavorite ? (
          <div className="story">
            <NavLink to={`/PawTales/stories/${id}`} className="storyCon">
              <img src={image} alt={title} />
              <div className="storyInfo">
                <h3>{title}</h3>
                <h5>{dateCreated}</h5>
                {idea && <h5>Ιδέα: {idea}</h5>}
                <p>{smallDescription}</p>
              </div>
            </NavLink>
            <button className="removeFav" onClick={removeFromFavorites}>
              <img src={x} alt="Διαγραφή" />
            </button>
          </div>
        ) : null
      ) : (
        <div className="story">
          <NavLink to={`/PawTales/stories/${id}`} className="storyCon">
            <img src={image} alt={title} />
            <div className="storyInfo">
              <h3>{title}</h3>
              <h5>{dateCreated}</h5>
              {idea && <h5>Ιδέα: {idea}</h5>}
              <p>{smallDescription}</p>
            </div>
          </NavLink>
        </div>
      )}
    </>
  );
};

export default StoryItem;
