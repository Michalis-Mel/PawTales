import { AuthContext } from "../Context/AuthContext";
import { useContext, useState } from "react";
import { deleteUser, updateProfile } from "firebase/auth";
import { auth } from "../helpers/firebase";
import { useNavigate } from "react-router-dom";

const DeletePopUp = ({ setDeleteAccountPopup }) => {
  const navigate = useNavigate();
  const handleDeleteUser = async () => {
    try {
      await deleteUser(auth.currentUser);
      setDeleteAccountPopup(false);
      navigate("/");
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="popupCon">
      <div
        className="popupBg"
        onClick={() => setDeleteAccountPopup(false)}
      ></div>
      <div className="popup">
        <h3>Είστε σίγουροι ότι θέλετε να διαγράψετε τον λαγαριασμό σας;</h3>
        <div className="popBtns">
          <button
            className="cancel"
            onClick={() => setDeleteAccountPopup(false)}
          >
            Ακύρωση
          </button>
          <button className="delete" onClick={handleDeleteUser}>
            Διαγραφή
          </button>
        </div>
      </div>
    </div>
  );
};
const EditNamePopUp = ({ setEditNamePopup, user }) => {
  const [newName, setNewName] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleEditUser = async () => {
    if (newName.toString().length < 4) {
      setErrorMsg("Το όνομα πρέπει να περιέχει τουλάχιστον 5 χαρακτήρες");
      return;
    }
    try {
      await updateProfile(auth.currentUser, { displayName: newName });
      setEditNamePopup(false);
    } catch (error) {
      console.error("Error editing user name:", error);
    }
  };
  return (
    <div className="popupCon">
      <div className="popupBg" onClick={() => setEditNamePopup(false)}></div>
      <div className="popup">
        <h3>Επεξεργασία Ονόματος</h3>
        <h5>Υπάρχον Όνομα : {user.displayName}</h5>
        <label>
          Νέο Όνομα :
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
        </label>
        {errorMsg && <h3 className="error">{errorMsg}</h3>}
        <div className="popBtns">
          <button className="cancel" onClick={() => setEditNamePopup(false)}>
            Ακύρωση
          </button>
          <button className="save" onClick={handleEditUser}>
            Αποθήκευση
          </button>
        </div>
      </div>
    </div>
  );
};
const EditUser = () => {
  const { user } = useContext(AuthContext);
  const [deleteAccountPopup, setDeleteAccountPopup] = useState(false);
  const [editNamePopup, setEditNamePopup] = useState(false);

  return (
    <div className="edit_user_con">
      {user ? (
        <div className="edit_user">
          <h1>Ο Λογαριασμός σας</h1>
          <ul>
            <li onClick={() => setEditNamePopup(true)}>Επεξεργασία Ονόματος</li>
            <li onClick={() => setDeleteAccountPopup(true)}>
              Διαγραφή Λογαριασμού
            </li>
          </ul>
          {deleteAccountPopup && (
            <DeletePopUp setDeleteAccountPopup={setDeleteAccountPopup} />
          )}
          {editNamePopup && (
            <EditNamePopUp setEditNamePopup={setEditNamePopup} user={user} />
          )}
        </div>
      ) : (
        <h1 className="logIn">Unauthorized</h1>
      )}
    </div>
  );
};

export default EditUser;
