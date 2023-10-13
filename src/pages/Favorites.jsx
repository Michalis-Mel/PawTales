import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { NavLink } from "react-router-dom";

const Favorites = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="favorites">
      <h1>Οι Αγαπημένες σας Ιστορίες</h1>
      {user ? (
        <div className="favoritesCon">Stories</div>
      ) : (
        <div className="favorites_con">
          <h3>
            Για να μπορέσετε να δείτε τις αγαπημένες σας ιστορίες πρέπει να
            συνδεθείτε!
          </h3>
          <NavLink to="/PawTales/login">Σύνδεση</NavLink>
        </div>
      )}
    </div>
  );
};

export default Favorites;
