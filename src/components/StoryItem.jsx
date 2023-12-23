import { NavLink, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { doc, updateDoc, deleteField } from "firebase/firestore";
import { firestore } from "../helpers/firebase";
import { onSnapshot } from "firebase/firestore";

import x from "../assets/icons/x.png";
import placeholderImage from "../assets/homepage/placeholder.png";

const StoryItem = ({ story, removeFromFavoritesId }) => {
  const { id, title, idea, image, smallDescription, dateCreated } = story;
  const location = useLocation();
  const { user } = useContext(AuthContext);

  const removeFromFavorites = async () => {
    if (user) {
      const favoritesRef = doc(firestore, "favorites", user.uid);
      await updateDoc(favoritesRef, { [id]: deleteField() });

      removeFromFavoritesId(id);
    }
  };

  const isFavoritesPage = location.pathname === "/favorites";
  const [isFavorite, setIsFavorite] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);

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

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <>
      {isFavoritesPage && user ? (
        isFavorite ? (
          <div className="story">
            <NavLink to={`/stories/${id}`} className="storyCon">
              {!imageLoaded && <img src={placeholderImage} alt="Placeholder" />}
              <img
                src={image}
                alt={title}
                style={{ display: imageLoaded ? "block" : "none" }}
                onLoad={handleImageLoad}
              />
              <div className="storyInfo">
                <h3>{title}</h3>
                <h5>{dateCreated}</h5>
                <h5>{idea && <>Ιδέα: {idea}</>}</h5>
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
          <NavLink to={`/stories/${id}`} className="storyCon">
            {!imageLoaded && <img src={placeholderImage} alt="Placeholder" />}
            <img
              src={image}
              alt={title}
              style={{ display: imageLoaded ? "block" : "none" }}
              onLoad={handleImageLoad}
            />
            <div className="storyInfo">
              <h3>{title}</h3>
              <h5>{dateCreated}</h5>
              <h5>{idea && <>Ιδέα: {idea}</>}</h5>
              <p>{smallDescription}</p>
            </div>
          </NavLink>
        </div>
      )}
    </>
  );
};

export default StoryItem;
