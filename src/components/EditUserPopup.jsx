import { updateProfile } from 'firebase/auth';
import { useState } from 'react';
import { auth } from '../helpers/firebase';
import { useContext } from 'react';
import { HomeMsgContext } from '../Context/HomeMsgContext';

const EditUserPopup = ({ setEditNamePopup, user }) => {
  const [newName, setNewName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const { setMessage } = useContext(HomeMsgContext);

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const handleEditUser = async () => {
    if (newName.toString().length < 4) {
      setErrorMsg('Το όνομα πρέπει να περιέχει τουλάχιστον 5 χαρακτήρες');
      return;
    }
    try {
      await updateProfile(auth.currentUser, { displayName: newName });
      setEditNamePopup(false);
      setMessage(
        `Γεια σου, ${user.displayName
          .split(' ')
          .map(capitalizeFirstLetter)
          .join(' ')}`
      );
    } catch (error) {
      console.error('Error editing user name:', error);
    }
  };
  return (
    <div className='popupCon'>
      <div className='popupBg' onClick={() => setEditNamePopup(false)}></div>
      <div className='popup'>
        <h3>Επεξεργασία Ονόματος</h3>
        <h5>Υπάρχον Όνομα : {user.displayName}</h5>
        <label>
          Νέο Όνομα :
          <input
            type='text'
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
        </label>
        {errorMsg && <h3 className='error'>{errorMsg}</h3>}
        <div className='popBtns'>
          <button className='cancel' onClick={() => setEditNamePopup(false)}>
            Ακύρωση
          </button>
          <button className='save' onClick={handleEditUser}>
            Αποθήκευση
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditUserPopup;
