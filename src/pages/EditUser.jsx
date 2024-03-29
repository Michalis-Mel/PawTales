import { AuthContext } from '../Context/AuthContext';
import { signOut } from 'firebase/auth';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DeleteUserPopup from '../components/DeleteUserPopup';
import EditUserPopup from '../components/EditUserPopup';
import { auth } from '../helpers/firebase';
import { motion } from 'framer-motion';

const EditUser = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [deleteAccountPopup, setDeleteAccountPopup] = useState(false);
  const [editNamePopup, setEditNamePopup] = useState(false);
  const [authUser, setAuthUser] = useState(null);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setAuthUser(null);
        setUser(null);
        navigate('/login');
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  };

  return (
    <motion.div
      className='edit_user_con'
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.3 }}
      viewport={{ once: true }}
    >
      {user ? (
        <div className='edit_user'>
          <h1>Ο Λογαριασμός σας</h1>
          <ul>
            <li onClick={() => setEditNamePopup(true)}>Επεξεργασία Ονόματος</li>
            <li className='logout' onClick={handleLogout}>
              Αποσύνδεση
            </li>
          </ul>
          <span className='delete' onClick={() => setDeleteAccountPopup(true)}>
            Διαγραφή Λογαριασμού
          </span>
          {deleteAccountPopup && (
            <DeleteUserPopup setDeleteAccountPopup={setDeleteAccountPopup} />
          )}
          {editNamePopup && (
            <EditUserPopup setEditNamePopup={setEditNamePopup} user={user} />
          )}
        </div>
      ) : (
        <h1 className='logIn'>Unauthorized</h1>
      )}
    </motion.div>
  );
};

export default EditUser;
