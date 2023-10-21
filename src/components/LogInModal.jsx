import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import x from "../assets/icons/x.png";
const LogInModal = ({ modalActive, setModalActive }) => {
  const disableBodyScroll = () => {
    if (modalActive) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  };

  useEffect(() => {
    disableBodyScroll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalActive]);
  return (
    <div
      className={`overlay ${modalActive ? "active" : ""}`}
      onClick={() => setModalActive(false)}
    >
      <div className="logInModal">
        <button className="close" onClick={() => setModalActive(false)}>
          <img src={x} alt="Close" />
        </button>
        <h3>
          Πρέπει να συνδεθείτε για να προσθέσετε αυτή την ιστορία στα αγαπημένα
          σας
        </h3>
        <NavLink to="/login">Σύνδεση</NavLink>
      </div>
    </div>
  );
};

export default LogInModal;
