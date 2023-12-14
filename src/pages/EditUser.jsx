import { AuthContext } from "../Context/AuthContext";
import { useContext, useState } from "react";
import DeleteUserPopup from "../components/DeleteUserPopup";
import EditUserPopup from "../components/EditUserPopup";

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
            <DeleteUserPopup setDeleteAccountPopup={setDeleteAccountPopup} />
          )}
          {editNamePopup && (
            <EditUserPopup setEditNamePopup={setEditNamePopup} user={user} />
          )}
        </div>
      ) : (
        <h1 className="logIn">Unauthorized</h1>
      )}
    </div>
  );
};

export default EditUser;
