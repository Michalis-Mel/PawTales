import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import x from '../assets/icons/x.png';
const LogInModal = ({ modalActive, setModalActive }) => {
  useEffect(() => {
    disableBodyScroll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalActive]);

  const disableBodyScroll = () => {
    if (modalActive) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  const handleNavLinkClick = () => {
    document.body.style.overflow = 'auto';
  };
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
          <NavLink to='/login' onClick={handleNavLinkClick}>
            Σύνδεση
          </NavLink>
          <NavLink to='/signup' onClick={handleNavLinkClick}>
            Εγγραφή
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default LogInModal;
