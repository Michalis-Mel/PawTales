import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { deleteUser } from 'firebase/auth';
import { auth } from '../helpers/firebase';
import { HomeMsgContext } from '../Context/HomeMsgContext';

const DeleteUserPopup = ({ setDeleteAccountPopup }) => {
  const navigate = useNavigate();
  const { setMessage } = useContext(HomeMsgContext);

  const handleDeleteUser = async () => {
    try {
      await deleteUser(auth.currentUser);
      setDeleteAccountPopup(false);
      setMessage('Ο λογαριασμός σας διαγράφηκε επιτυχώς.');
      navigate('/');
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className='popupCon'>
      <div
        className='popupBg'
        onClick={() => setDeleteAccountPopup(false)}
      ></div>
      <div className='popup'>
        <h3>Είστε σίγουροι ότι θέλετε να διαγράψετε τον λαγαριασμό σας;</h3>
        <div className='popBtns'>
          <button
            className='cancel'
            onClick={() => setDeleteAccountPopup(false)}
          >
            Ακύρωση
          </button>
          <button className='delete' onClick={handleDeleteUser}>
            Διαγραφή
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteUserPopup;
