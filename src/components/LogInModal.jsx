import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import x from '../assets/icons/x.png';
const LogInModal = ({ modalActive, setModalActive }) => {
  return (
    <div
      className={`overlay ${modalActive ? 'active' : ''}`}
      onClick={() => setModalActive(false)}
    >
      <div className='logInModal'>
        <button className='close' onClick={() => setModalActive(false)}>
          <img src={x} alt='Close' />
        </button>
        <h3>
          Για να μπορέσετε να συνεχίσετε, παρακαλούμε συνδεθείτε ή κάντε
          εγγραφή.
        </h3>
        <div className='logInBtns'>
          <NavLink to='/login'>Σύνδεση</NavLink>
          <NavLink to='/signup'>Εγγραφή</NavLink>
        </div>
      </div>
    </div>
  );
};

export default LogInModal;
